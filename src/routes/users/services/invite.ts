import { type Request, type Response } from "express"

import nodemailer from "nodemailer"
import { firestore } from "../../../firebase/config"

import { getRequestingAdminUid } from "../utils"

import type { User } from "../types"

type ReqBody = Pick<User, "email" | "role">

export const handleInviteRequest = async (
  req: Request<undefined, undefined, ReqBody>,
  res: Response
) => {
  try {
    const authorizationHeader = req.headers.authorization

    const requestingAdminUid = await getRequestingAdminUid(authorizationHeader)

    if (!requestingAdminUid) {
      res.status(403).json({
        users: [],
        error: "Unauthorized"
      })

      return
    }

    const { email, role } = req.body

    const existingInvite = await firestore
      .collection("invitations")
      .where("email", "==", email)
      .get()

    if (!existingInvite.empty) {
      res.status(400).json({
        error: "An invitation for this email already exists"
      })

      return
    }

    const createdInvite = await firestore.collection("invitations").add({
      email,
      role
    })

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Invitation to join Cool Cars Garage",
      html: `
        <div>Hello,</div>
        <br/>
        <div>You have been invited to join <a href="${process.env.ALLOWED_ORIGIN}">Cool Cars Garage</a>.</div>
        <div>Click <a href="${process.env.ALLOWED_ORIGIN}/sign-up?invitationId=${createdInvite.id}">here</a> to accept the invitation.</div>
        <br/>
        <div>Thanks,</div>
        <b>Cool Cars Garage</b> team</div>
      `
    })

    res.status(200).json({ message: "Invitation sent successfully" })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: error.message
      })

      return
    }

    res.status(500).json({ error: `An unexpected error occurred: ${error}` })
  }
}
