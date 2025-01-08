export const EMPLOYEE_API = {
  fetch_all_with_pagination: (page, perPage) =>
    `/api/Employee/GetAll?page=${page}&per_page=${perPage}`,
  create: () => `/api/employee/create`,
  update: () => `/api/employee/update`,
  delete: (id) => `/api/employee/delete?id=${id}`
};
