import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAqW1yxCna0KrmP9EzMUv6AHnW2_yqZGWg',
  authDomain: 'homenaija.firebaseapp.com',
  projectId: 'homenaija',
  storageBucket: 'homenaija.firebasestorage.app',
  messagingSenderId: '253888402351',
  appId: '1:253888402351:web:ca56e79861d2e01e6d155a',
  measurementId: 'G-P4J560GML1',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
