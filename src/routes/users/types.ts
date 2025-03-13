import type { UserRecord } from "firebase-admin/auth"

export type UserMetadata = {
  role: "admin" | "user"
}

export type User = Pick<
  UserRecord,
  "uid" | "email" | "displayName" | "phoneNumber"
> &
  UserMetadata &
  Pick<UserRecord["metadata"], "lastSignInTime" | "creationTime">
