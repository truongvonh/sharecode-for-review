import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { number } from 'prop-types';
import './style.scss';

const Pagination = ({ total, perpage, ...props }) => {

  const pageCount = Math.ceil(total / perpage);

  return (
    <ReactPaginate 
      { ...props}
      pageCount={pageCount}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link shadow"
      nextLinkClassName="page-link shadow"
      nextLabel={<i className="fa fa-angle-right" />}
      previousLabel={<i className="fa fa-angle-left" />}
      containerClassName="pagination"
      pageClassName="page-item"
      activeClassName="active"
      pageLinkClassName="page-link shadow"
    />
  );
};

Pagination.propTypes = {
  total: number,
  perpage: number
};

export default memo(Pagination);