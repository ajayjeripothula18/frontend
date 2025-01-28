import { useState } from 'react';
import { ITEMS_PER_PAGE } from '../lib/constants';

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    limit: ITEMS_PER_PAGE,
  };
}