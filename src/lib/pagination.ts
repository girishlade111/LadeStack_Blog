export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function paginateItems<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): PaginatedResult<T> {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;
  const pagedItems = items.slice(startIndex, startIndex + safePageSize);

  return {
    items: pagedItems,
    currentPage,
    totalPages,
    totalItems,
    pageSize: safePageSize,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
