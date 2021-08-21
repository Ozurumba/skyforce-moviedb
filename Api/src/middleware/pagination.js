
export const pagination = (query) => {
  const page = query.page && query.page > 0 ? parseInt(query.page) : 1;

  const PAGE_SIZE = query.page_size ? parseInt(query.page_size) : 10;

  const offset = (page - 1) * PAGE_SIZE;

  const limit = PAGE_SIZE;

  return {
    offset,
    limit
  }
}



export const CustomPaginate = (items, count, current_page, per_page_items) => {
  const page = current_page || 1;
  const per_page = per_page_items || 10;
  const total_pages = Math.ceil(count / per_page);

  return {
    docs: items,
    totalDocs: count,
    page: parseInt(current_page),
    limit: parseInt(per_page_items),
    prevPage: current_page - 1 ? parseInt(current_page) - 1 : null,
    nextPage: (total_pages > page) ? parseInt(page) + 1 : null,
    pagingCounter: (parseInt(per_page) * parseInt(page)) + 1,
    totalPages: total_pages,
    hasPrevPage: !!(page - 1),
    hasNextPage: (total_pages > page),
  };
};
