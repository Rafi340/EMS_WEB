const Header = () => {
  return (
    <nav>
      <div className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto">
        <div></div>

        <div className="hidden md:block">
          <ul className="flex gap-4 text-gray-500 font-medium">
            <li>
              {" "}
              <a href="/employee/employeeList">Employee</a>
            </li>
            <li>
              <a href="/department/departmentList">Department</a>
            </li>
            <li>
              <a href="/performanceReview/performanceReviewList">
                Performance Review
              </a>
            </li>
            <li>
              <a href="/department/DepartmentAvgPerformance">
                Department Average Performance
              </a>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Header;
