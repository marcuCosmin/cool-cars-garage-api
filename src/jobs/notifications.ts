import { firestore } from "../firebase/config"

const sendNotifications = async () => {
  await firestore.collection("cars").add({
    name: "Test"
  })
}

sendNotifications()
