import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DepartmentAvgPerformance from "./components/Department/DepartmentAvgPerformance";
import DepartmentList from "./components/Department/DepartmentList";
import EmployeeList from "./components/Employee/EmployeeList";
import PerformanceReviewList from "./components/PerformanceReview/PerformanceReviewList";
import "./index.css";
import Root from "./Root";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/employee/employeeList",
        element: <EmployeeList />,
      },
      {
        path: "/department/departmentList",
        element: <DepartmentList />,
      },
      {
        path: "/performanceReview/performanceReviewList",
        element: <PerformanceReviewList />,
      },
      {
        path: "/department/DepartmentAvgPerformance",
        element: <DepartmentAvgPerformance />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
