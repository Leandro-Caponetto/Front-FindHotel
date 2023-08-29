import { storage } from "./configFirebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"

export async function uploadFile(file) {
    const newName = v4()
    const storageRef = ref(storage, newName)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    const imageSave = { id: newName, url: url }
    return imageSave;
}