export const PERFORMANCE_REVIEW_API = {
    fetch_all_with_pagination: (page, perPage) =>
      `/api/PerformanceReview/GetAll?page=${page}&per_page=${perPage}`,
    create: () => `/api/PerformanceReview/create`,
    update: () => `/api/PerformanceReview/update`,
    delete: (id) => `/api/employee/delete?id=${id}`
  };
  