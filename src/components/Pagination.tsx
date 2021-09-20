import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  visible: boolean;
  pageCount: number;
  range: number;
  onPageChange: (selectedItem: { selected: number }) => any;
  currentPage: number;
}

export const Pagination = ({ visible, pageCount, range = 5, onPageChange, currentPage }: PaginationProps): JSX.Element => {
  return (
    <ReactPaginate
      containerClassName={`Pagination highlight`}
      pageLinkClassName={`Pagination-Link`}
      activeLinkClassName={`Pagination-ActiveLink`}
      breakClassName={`Pagination-Ellipses`}
      nextLabel={""}
      previousLabel={""}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={range}
      onPageChange={onPageChange}
      initialPage={currentPage}
    />
  );
};
