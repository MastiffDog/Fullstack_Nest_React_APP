import React, { useMemo } from 'react';
import { PaginationButton } from 'src/shared/buttons/paginationButton'; 
import styles from './pagination.module.css';

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControlsComponent: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  if (totalPages <= 1) {
    return null;
  }

  const displayedPages = useMemo(() => {
    const halfWindow = 2; // How many pages to show to the left and right of the current one
    const start = Math.max(1, currentPage - halfWindow);
    const end = Math.min(start + (halfWindow * 2), totalPages);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination_container} role="navigation" aria-label="Пагинация списка товаров">
      <PaginationButton
        buttonType="FIRST"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Первая страница"
      />

      {displayedPages.map((page) => (
        <PaginationButton
          key={page}
          buttonType="PAGE"
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          label={String(page)}
          aria-current={currentPage === page ? 'page' : null}
        />
      ))}

      <PaginationButton
        buttonType="LAST"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Последняя страница"
      />
    </div>
  );
};