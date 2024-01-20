import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "memoji-laptop-sticker.firebaseapp.com",
  projectId: "memoji-laptop-sticker",
  storageBucket: "memoji-laptop-sticker.appspot.com",
}

export const app = initializeApp(firebaseConfig)
