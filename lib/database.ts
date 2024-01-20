import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sticker-image.firebaseapp.com",
  projectId: "sticker-image",
  storageBucket: "sticker-image.appspot.com",
}

export const app = initializeApp(firebaseConfig)
