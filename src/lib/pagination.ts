export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function isValidPageNumber(
  totalItems: number,
  page: number,
  pageSize: number
): boolean {
  if (!Number.isInteger(page) || page < 1) return false;
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  if (page === 1) return true;
  return totalItems > 0 && page <= totalPages;
}

export function paginateItems<T>(
  items: readonly T[],
  page: number,
  pageSize: number
): PaginatedResult<T> {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  if (!Number.isInteger(page) || page < 1 || (page > 1 && page > totalPages)) {
    throw new RangeError(
      `Invalid pagination page ${page} for ${totalItems} items (totalPages=${totalPages}).`
    );
  }

  const currentPage = page;
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
