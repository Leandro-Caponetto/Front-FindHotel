import React from 'react'
import { uploadFile } from '../firebase/config';
import { useState } from 'react';

const UploadImages = () => {
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
  
    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      {console.log(selectedFiles)}
      setFiles(selectedFiles);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const urls = await Promise.all(files.map(uploadFile));
        setImageUrls(prevUrls => [...prevUrls, ...urls]); 
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}> 
          <input type="file" name='' id='' onChange={handleFileChange} multiple></input>
         
          <button>Upload</button>
        </form>
        {imageUrls.length > 0 && (
          <div>
            <h2>Imágenes Cargadas:</h2>
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded ${index}`} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default UploadImages;