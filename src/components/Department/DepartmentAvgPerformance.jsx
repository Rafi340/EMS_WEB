import React from "react";

const DepartmentAvgPerformance = () => {
  const departmentList = [];
  return (
    <>
      <div className="lg:col-span-2">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Department Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Manager Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Budget
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {departmentList?.map((department) => (
                <tr
                  key={department.departmentId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {department.departmentName}
                  </th>
                  <td className="px-6 py-4">{department.managerName}</td>
                  <td className="px-6 py-4">{department.budget}</td>

                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-4"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DepartmentAvgPerformance;
