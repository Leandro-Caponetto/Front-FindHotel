import React from "react";
import PropTypes from "prop-types";
import './Pagination.module.css'

const Pagination = ({
  hotelsPorPage,
  totalHotels,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumber = [];
  

  for (let i = 1; i <= Math.ceil(totalHotels / hotelsPorPage); i++) {
    pageNumber.push(i);
  }
  
  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
  } 
  const onSpecificPage = (n) => {
    setCurrentPage(n)
  }

  return (
    <nav
      className="pagination is-centered mb-6"
      role="navigation"
      aria-label="pagination"
    >
      <a className={`pagination-previous  ${currentPage === 1 ? 'is-disabled' : ''}`} onClick={onPreviusPage}>Previous</a>
      <a className={`pagination-next  ${currentPage >= pageNumber.length ? 'is-disabled' : ''}`} onClick={onNextPage}>Next</a>
      <ul className="pagination-list">
        {pageNumber.map(noPage => (
          <li key={noPage}>
            <a
             className={`pagination-link  link ${
                noPage === currentPage ? 'is-current tag is-primary is-medium' : ''}`}
                    onClick={() => onSpecificPage(noPage)}
                >
                    {noPage}</a>
          </li>
        ))}

        
        
      </ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  hotelsPorPage: PropTypes.number.isRequired,
  totalHotels: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
