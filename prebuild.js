const fs = require("fs")
const path = require("path")
const { exec } = require("child_process")
const { promisify } = require("util")

const execCommand = promisify(exec)

const isProduction = process.env.NODE_ENV === "production"
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

const distPath = path.join(__dirname, "dist")
const firebasePrivateKeyJsonPath = path.join(
  distPath,
  "firebase-private-key.json"
)

const prebuild = async () => {
  try {
    if (!isProduction) {
      return
    }

    await execCommand("rm -rf dist")
    await execCommand("mkdir dist")
    fs.writeFileSync(firebasePrivateKeyJsonPath, firebasePrivateKey)
  } catch (error) {
    console.log(`Prebuild error: ${error}`)
  }
}

prebuild()
