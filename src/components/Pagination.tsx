import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  visible: boolean;
  pageCount: number;
  range: number;
  onPageChange: (selectedItem: { selected: number }) => any;
}

export const Pagination = ({ visible, pageCount = 10, range = 5, onPageChange }: PaginationProps): JSX.Element => {
  return (
    <ReactPaginate
      containerClassName={`Pagination highlight`}
      pageLinkClassName={`Pagination-link`}
      activeLinkClassName={`Pagination-activeLink`}
      breakClassName={`Pagination-ellipses`}
      nextLabel={""}
      previousLabel={""}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={range}
      onPageChange={onPageChange}
    />
  );
};
