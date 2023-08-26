import {storage} from "../../services/"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid"



export async function uploadFile(file){
    const storageRef=ref(storage, v4())
     await uploadBytes(storageRef,file)
     const url=getDownloadURL(storageRef)
     return url
}