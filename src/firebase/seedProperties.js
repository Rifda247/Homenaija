
import { collection, addDoc } from 'firebase/firestore'
import { db } from './config'
import { properties } from '../data/properties'

export async function seedProperties() {
  try {
    for (const property of properties) {
      const { id, ...propertyWithoutId } = property
      await addDoc(collection(db, 'properties'), propertyWithoutId)
    }
    console.log('Properties seeded successfully!')
  } catch (error) {
    console.error('Error seeding properties:', error)
  }
}