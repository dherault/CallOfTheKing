import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { GoogleAuthProvider, browserLocalPersistence, connectAuthEmulator, getAuth, setPersistence } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
// import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import { getPerformance } from 'firebase/performance'

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

export const auth = getAuth(app)

export const db = getFirestore(app)

export const analytics = getAnalytics(app)

export const storage = getStorage(app)

try {
  getPerformance(app)
}
catch {
  // performance seems to only work in production
}

export const persistancePromise = setPersistence(auth, browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider()

// TODO
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('todo'),
//   isTokenAutoRefreshEnabled: true,
// })

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}
