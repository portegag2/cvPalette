import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Obtiene el JSON del documento 'mocked' en la colección 'cvPalette'
export async function getMockedCVData() {
    const docRef = doc(db, 'cvPalette', 'mocked');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const jsonString = docSnap.data().jsonData;
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        throw new Error('El campo jsonData no es un JSON válido');
      }
    } else {
      throw new Error('No existe el documento mocked en cvPalette');
    }
  }