import React from "react";
import "./Pagination.css"; // Import the CSS file

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "page-item active" : "page-item"
            }
          >
            <a href="#!" onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
