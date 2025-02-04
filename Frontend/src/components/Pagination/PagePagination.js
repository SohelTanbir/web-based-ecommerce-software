import React, { useEffect, useState } from 'react';
import './PagePagination.css'
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPageNumber } from '../../Store/PaginationSlice/PaginationSlice';



const PagePagination = ({totalProduct=10}) => {
  const dispatch = useDispatch();
  const currentPage =  useSelector(state => state.PaginationSlice.page);
  const showPerPage = 15;
  const page = Math.ceil(totalProduct/showPerPage);
  const totoalPage = [];
  for (let number = 1; number <=page; number++) {
    totoalPage.push(
      <Pagination.Item onClick={()=>dispatch(getPageNumber({page:number}))}  key={number} active={currentPage===number}>
        {number}
    </Pagination.Item>
    )
    
  }


  return (
    <Pagination>
    {totoalPage}
  </Pagination>
  );
};

export default PagePagination;