import { credential } from "firebase-admin"
import { getAuth } from "firebase-admin/auth"
import { initializeApp } from "firebase-admin/app"
import { config as dotenvConfig } from "dotenv"
import { getFirestore } from "firebase-admin/firestore"

const isProduction = process.env.NODE_ENV === "production"

if (!isProduction) {
  dotenvConfig()
}

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

if (!firebasePrivateKey) {
  throw new Error("FIREBASE_PRIVATE_KEY is not set")
}

const parsedFirebasePrivateKey = isProduction
  ? firebasePrivateKey
  : JSON.parse(firebasePrivateKey)

const firebaseApp = initializeApp({
  credential: credential.cert(parsedFirebasePrivateKey)
})

export const firestore = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
