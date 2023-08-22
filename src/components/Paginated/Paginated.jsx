import React, { useState, useEffect } from 'react';
import styles from './Paginated.module.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import PropTypes from 'prop-types';

function Paginated({ Data, onDataSlice, itemsXPage = 5 }) {
  const totalPages = Math.ceil(Data.length / itemsXPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [dataSlice, setDataSlice] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlerPageChange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsXPage;
    const endIndex = startIndex + itemsXPage;
    const DataSlice = Data.slice(startIndex, endIndex)
    setCurrentPage(pageNumber);
    setCurrentData(Data)
    setDataSlice(DataSlice)
    onDataSlice(DataSlice)
  };

  useEffect(() => {
    JSON.stringify(Data) !== JSON.stringify(currentData) && handlerPageChange(1)
    JSON.stringify(Data) === JSON.stringify(currentData) && onDataSlice(dataSlice)

  }, [Data, currentData, dataSlice, handlerPageChange, onDataSlice]);

  const handlerPrevPage = () => {
    if (currentPage > 1) {
      handlerPageChange(currentPage - 1);
    }
  };

  const handlerNextPage = () => {
    if (currentPage < totalPages) {
      handlerPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.Paginated}>
      <div className={styles.Pages}>
        {currentPage > 1 && <button className={styles.BtnPrev} onClick={handlerPrevPage} disabled={currentPage === 1}>
          {<FaArrowAltCircleLeft className={styles.Icon} size={40} />}
        </button>}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlerPageChange(index + 1)}
            className={currentPage === index + 1 ? styles.Active : styles.DisableButton}
          >
            {index + 1}

          </button>
        ))}
        {currentPage < totalPages && <button className={styles.BtnNext} onClick={handlerNextPage} disabled={currentPage === totalPages}>
          {<FaArrowAltCircleRight className={styles.Icon} size={40} />}
        </button>}
      </div>
    </div>
  );
}

Paginated.propTypes = {
  Data: PropTypes.array,
  onDataSlice: PropTypes.func,
  itemsXPage: PropTypes.number,

};

export default Paginated;
