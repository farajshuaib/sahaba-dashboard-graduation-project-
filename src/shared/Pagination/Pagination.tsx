import React, { FC } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "../../utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  meta: Meta;
  setPage: (val: number) => void;
}

const Pagination: FC<PaginationProps> = ({ className = "", meta, setPage }) => {
  function pagination(currentPage: number, pageCount: number) {
    let delta = 2,
      left = currentPage - delta,
      right = currentPage + delta + 1,
      result = [];

    result = Array.from(
      {
        length: pageCount,
      },
      (v, k) => k + 1
    ).filter((i) => i && i >= left && i < right);

    return result;
  }

  const renderItem = (page: number, index: number) => {
    if (page === meta.current) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${
            page == meta.current && twFocusClass()
          }`}
        >
          {page}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${
          page == meta.current && twFocusClass()
        }`}
        onClick={() => setPage(page)}
      >
        {page}
      </button>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pagination(meta.current, meta.last_page).map(renderItem)}
    </nav>
  );
};

export default Pagination;
