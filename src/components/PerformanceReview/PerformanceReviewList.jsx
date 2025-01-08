import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PERFORMANCE_REVIEW_API } from "../../constants/apiEndPoints";
import { get, post } from "../../helpers/api_helpers";
import { DateFormat } from "../../utilities/helper";
import PerformanceReviewForm from "./PerformanceReviewForm";

const PerformanceReviewList = () => {
  const [performanceReviewList, setPerformanceReviewList] = useState([]);
  const [PerformanceReviewEdit, setPerformanceReviewEdit] = useState(null);
  const [id, setId] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const fetchPerformanceReview = async () => {
    const fetchData = await get(
      PERFORMANCE_REVIEW_API.fetch_all_with_pagination(page, perPage)
    );
    setPerformanceReviewList(fetchData.data);
    setPage(fetchData.page);
    setPerPage(fetchData.per_page);
    setTotalRecords(fetchData.total);
    setTotalPages(fetchData.totalPages);
  };
  useEffect(() => {
    fetchPerformanceReview();
  }, [page, perPage]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleEdit = (editData) => {
    setPerformanceReviewEdit(editData);
  };
  const handlePopUp = (value) => {
    setIsOpen(!isOpen);
    setId(value);
  };
  const handleYes = async () => {
    if (id) {
      const fetchData = await post(PERFORMANCE_REVIEW_API.delete(id));
      if (fetchData.status) {
        toast.success("Delete Successfully");
        setId(null);
        fetchPerformanceReview();
        setIsOpen(!isOpen);
      }
    }
  };
  const handleNo = () => {
    setId(null);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <PerformanceReviewForm
        fetch={fetchPerformanceReview}
        editPerformanceReview={PerformanceReviewEdit}
        setPerformanceReviewEdit={setPerformanceReviewEdit}
        key={PerformanceReviewEdit?.PerformanceReviewId}
      />

      {/* <!-- Right Column --> */}
      <div className="lg:col-span-2">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Review Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Review Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Review Note
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {performanceReviewList?.map((performanceReview) => (
                <tr
                  key={performanceReview.performanceReviewId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {performanceReview.name}
                  </th>
                  <td className="px-6 py-4">
                    {DateFormat(performanceReview.reviewDate)}
                  </td>
                  <td className="px-6 py-4">{performanceReview.reviewScore}</td>
                  <td className="px-6 py-4">{performanceReview.reviewNote}</td>

                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-4"
                      onClick={() => handleEdit(performanceReview)}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium me-2 text-red-600 dark:text-red-500 hover:underline"
                      onClick={() =>
                        handlePopUp(PerformanceReview.PerformanceReviewId)
                      }
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {page}-{perPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalRecords}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page == 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 ${
                      page === index + 1
                        ? "text-blue-600 bg-blue-50 border-blue-300"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page == totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Do you want to proceed with this action?
            </p>
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={handleNo}
              >
                No
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={handleYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PerformanceReviewList;
