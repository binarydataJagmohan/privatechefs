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
  return (
    <div className="container-fluid">
     <ul className={`${styles.pagination} row `}>
  {pages.map((page) => (
    <li
      key={page}
      className={
        page === currentPage ? `${styles.pageItemActive} col-md-2` : `${styles.pageItem} col-md-2`
      }
      onClick={() => onPageChange(page)}
    >
      <a className={styles.pageLink}>{page}</a>
    </li>
  ))}
</ul>
    </div>
  );
};
export default Pagination;