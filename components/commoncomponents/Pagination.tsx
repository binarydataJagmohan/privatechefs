import styles from "../../styles/pagination.module.css";

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: Function;
}

const Pagination = ({ items, pageSize, currentPage, onPageChange }: PaginationProps) => {
  const pagesCount = Math.ceil(Number(items) / pageSize);
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const pageItems = [];

  if (pagesCount <= 5) {
    // If there are 5 or fewer pages, show them all
    pageItems.push(...pages);
  } else {
    // Always show the first page
    pageItems.push(1);

    if (currentPage > 3) {
      // Show an ellipsis if the current page is greater than 3
      pageItems.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(pagesCount - 1, currentPage + 1);

    // Show current page and up to one page before and after
    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(i);
    }

    if (currentPage < pagesCount - 2) {
      // Show an ellipsis if the current page is less than pagesCount - 2
      pageItems.push("...");
    }

    // Always show the last page
    pageItems.push(pagesCount);
  }

  return (
    <div className="container-fluid">
      <ul className={`${styles.pagination} row`}>
        {pageItems.map((page, index) => (
          <li
            key={index}
            className={
              page === currentPage
                ? `${styles.pageItemActive} col-md-2`
                : `${styles.pageItem} col-md-2`
            }
            onClick={() => typeof page === "number" && onPageChange(page)}
          >
            <a className={styles.pageLink}>{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
