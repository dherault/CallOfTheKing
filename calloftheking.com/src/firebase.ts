import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD-CdpGkf4rj8ertZqhWqKZrB4uasfiHjQ',
  authDomain: 'calloftheking-1.firebaseapp.com',
  projectId: 'calloftheking-1',
  storageBucket: 'calloftheking-1.appspot.com',
  messagingSenderId: '27991644727',
  appId: '1:27991644727:web:a477daaf2de7eb7dab7db2',
  measurementId: 'G-796HWL6Q2H',
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)

export const db = getFirestore(app)
