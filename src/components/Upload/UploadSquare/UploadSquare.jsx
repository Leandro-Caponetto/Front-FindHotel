import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './UploadSquare.module.css';
import IconSelector from '../../IconSelector/IconSelector';

const UploadSquare = ({ onImageUpload }) => {
  const [imageFiles, setImageFiles] = useState([])
  const [viewZoom, setViewZoom] = useState(false)
  const [hoverTimeoutId, setHoverTimeoutId] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);


  const handlerFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const updatedImages = [...imageFiles, ...newFiles];
    setImageFiles(updatedImages);
    onImageUpload(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

  const handlerImageDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handlerImageDrop = (event, dropIndex) => {
    event.preventDefault();
    const dragIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const updatedImages = [...imageFiles];
    const draggedImage = updatedImages[dragIndex];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, draggedImage);
    setImageFiles(updatedImages);
    onImageUpload(updatedImages);
  };
  const handlerImageDragOver = (event) => {
    event.preventDefault();
  };



  const handleMouseEnter = (index) => {
    const timeoutId = setTimeout(() => {
      setHoveredImageIndex(index);
      setViewZoom(true);
    }, 1500);
    setHoverTimeoutId(timeoutId);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutId) {
      clearTimeout(hoverTimeoutId);
      setHoverTimeoutId(null);
    }
    setHoveredImageIndex(null);
    setViewZoom(false);
  };

  return (
    <div className={styles.UploadSquare}>
      {imageFiles?.map((file, index) => (
        <div
          key={index}
          className={styles.Image}
          //? Imager order with mouse
          draggable
          onDragStart={(event) => handlerImageDragStart(event, index)}
          onDragOver={handlerImageDragOver}
          onDrop={(event) => handlerImageDrop(event, index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.viewImages} key={index}>
            <span className={styles.RemoveButton} onClick={() => handleRemoveImage(index)} >
              <IconSelector iconType={'trash'} size={15} color={'black'} />
            </span>
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded_${index}`}
              onMouseUp={viewZoom}
              className={hoveredImageIndex === index && viewZoom ? styles.ImageZoom : undefined}
            />

          </div>
        </div>
      ))}
      <label htmlFor={styles.imageInputstyles}>
        <div className={`${styles.newImage} ${styles.Image}`}>
          <span className="plus">+</span>
        </div>
        <input type="file" id="imageInput" className={styles.imageInput} onChange={handlerFileChange} multiple></input>
      </label>
    </div>
  )
}

UploadSquare.propTypes = {
  onImageUpload: PropTypes.func,
};

export default UploadSquare;