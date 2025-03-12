import {
  credential,
  firestore as getFirestore,
  auth as getAuth
} from "firebase-admin"
import { initializeApp } from "firebase-admin/app"

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

if (!firebasePrivateKey) {
  throw new Error("FIREBASE_PRIVATE_KEY is not set")
}

const firebaseApp = initializeApp({
  credential: credential.cert(firebasePrivateKey)
})

export const firestore = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
