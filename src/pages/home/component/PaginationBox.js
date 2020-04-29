import React from 'react'
import '../css/paginationBox.css'
const PaginationBox = ({ postPerPage, totalPosts, paginate, paginateNextPage, paginatePreviousPage, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <>
      <nav >
        <ul className="pagination justify-content-center">
          <li className="page-item">
            {1 >= currentPage ? <div></div> : <button onClick={() => paginatePreviousPage()}>上一頁</button>}
          </li>
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
          <li className="page-item">
            {(Math.floor(totalPosts / postPerPage) + 1) <= currentPage ? <div></div> : <button onClick={() => paginateNextPage()}>下一頁</button>}

          </li>
        </ul>
      </nav>
    </>
  )
}
export default PaginationBox