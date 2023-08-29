import React from 'react'
import { uploadFile } from '../../../services/firebase';
import { useState, useEffect } from 'react';
import styles from "./UploadImages.module.css"
import UploadSquare from '../UploadSquare/UploadSquare';
// eslint-disable-next-line react/prop-types
const UploadImages = ({ onChangeUpload }) => {
  useEffect(() => {
    //? Get Data from localStorage
    const storedData = JSON.parse(localStorage.getItem("files"));
    if (storedData) {
      console.log(storedData);
      setFiles({ ...storedData });
    }
  }, []);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [{ id, url }] = await Promise.all(files.map(uploadFile));
      console.log(id)
      const currentImage = {
        id: id,
        src: url,
        typeImage: files[0].type,
        size: files[0].size,
      }
      localStorage.setItem('files', JSON.stringify(currentImage));
      console.log(currentImage)
      setImageUrls(prevUrls => [...prevUrls, currentImage]);
      onChangeUpload(currentImage)
    } catch (error) {
      console.error(error);
    }
  };

  const handlerChangeImages = async (arrayImages) => {
    try {
      const [{ id, url }] = await Promise.all(files.map(uploadFile));
      console.log(id)
      const currentImage = {
        id: id,
        src: url,
        typeImage: files[0].type,
        size: files[0].size,
      }
      localStorage.setItem('files', JSON.stringify(currentImage));
      console.log(currentImage)
      setImageUrls(prevUrls => [...prevUrls, currentImage]);
      onChangeUpload(currentImage)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.UploadImages}>
      <UploadSquare onImageUpload={handlerChangeImages} />
    </div>
    // <div>
    //   <div className={styles.centerButton}>
    //     <UploadSquare />
    //     {/* <input type="file" name='' id='' onChange={handleFileChange} multiple></input> */}

    //     {/* <button className={styles.button} onClick={handleSubmit}>Upload</button> */}
    //   </div>
    //   {/* {imageUrls.length > 0 && (
    //     <div>
    //       <h2>uploaded images:</h2>
    //       {imageUrls.map(({ src }, index) => (
    //         <img className={styles.img} key={index} src={src} alt={`Uploaded ${index}`} />
    //       ))}
    //     </div>
    //   )} */}
    // </div>
  );
};

export default UploadImages;