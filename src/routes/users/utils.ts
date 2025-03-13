import { firebaseAuth, firestore } from "../../firebase/config"

import type { UserMetadata } from "./types"

const getUserMetadata = async (uid: string) => {
  const userRef = firestore.collection("users").doc(uid)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    return null
  }

  return userDoc.data() as UserMetadata
}

export const getRequestingAdminUid = async (
  authorizationHeader: string | undefined
) => {
  try {
    const idToken = authorizationHeader?.split("Bearer ")[1]

    if (!idToken) {
      return null
    }

    const { uid } = await firebaseAuth.verifyIdToken(idToken)

    const userMetadata = await getUserMetadata(uid)

    const isAdmin = userMetadata?.role === "admin"

    if (!isAdmin) {
      return null
    }

    return uid
  } catch {
    return null
  }
}
