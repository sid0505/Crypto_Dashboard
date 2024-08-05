import React, { useEffect, useState} from 'react';
import './Pagination.css';

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.pageChange(currentPage)
  }, [currentPage])

  const onFirstPage = (): void => {
    setCurrentPage(1);
  }

  const onLastPage = (): void => {
    setCurrentPage(props.allPagesNumber);
  }

  const onSelectedPage = (pageno): void => {
    setCurrentPage(pageno);
  }

  const onNextPage = (): void => {
    setCurrentPage(currentPage + 1);
  }

  const onPreviousPage = (): void => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="pagination__container">
      <div
        className={`pagination__button pagination__page-first ${(currentPage === 1||currentPage === 2)  ? 'pagination__button--disabled' : ''}`}
        onClick={() => onFirstPage()}
      >
        First
      </div>
      <div
        className={`pagination__button ${(currentPage === 1||currentPage === 2) && 'pagination__button--disabled'}`}
        onClick={() => onPreviousPage()}
      >
        Previous
      </div>
      <div className={`pagination__button ${(currentPage === 1||currentPage === 2) && 'pagination__button--disabled'}`}>
        ...
      </div>
      <div 
      	className={`pagination__button ${(currentPage === 1||currentPage === 2) && 'pagination__button--disabled'}`}
      	onClick={() => onSelectedPage(currentPage-2)}
      >
        {currentPage-2}
      </div>
      <div 
      	className={`pagination__button ${currentPage === 1 && 'pagination__button--disabled'}`}
      	onClick={() => onSelectedPage(currentPage-1)}
      >
        {currentPage-1}
      </div>
      <div className="pagination__button pagination__page-active">
        {currentPage}
      </div>
      <div 
      	className={`pagination__button ${currentPage === props.allPagesNumber && 'pagination__button--disabled'}`}
      	onClick={() => onSelectedPage(currentPage+1)}
      >
        {currentPage+1}
      </div>
      <div 
      	className={`pagination__button ${(currentPage === props.allPagesNumber||currentPage === props.allPagesNumber-1) && 'pagination__button--disabled'}`}
      	onClick={() => onSelectedPage(currentPage+2)}
      >
        {currentPage+2}
      </div>
      <div className={`pagination__button ${(currentPage === props.allPagesNumber||currentPage === props.allPagesNumber-1) && 'pagination__button--disabled'}`}>
        ...
      </div>
      <div
        className={`pagination__button ${(currentPage === props.allPagesNumber||currentPage === props.allPagesNumber-1) && 'pagination__button--disabled'}`}
        onClick={() => onNextPage()}
      >
        Next
      </div>
      <div
        className={`pagination__button ${(currentPage === props.allPagesNumber||currentPage === props.allPagesNumber-1) && ' pagination__button--disabled'}`}
        onClick={() => onLastPage()}
      >
        Last
      </div>
    </div>
  )
}

export default Pagination;