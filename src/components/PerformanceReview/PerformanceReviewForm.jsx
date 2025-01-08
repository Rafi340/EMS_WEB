import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DEPARTMENT_API,
  PERFORMANCE_REVIEW_API,
} from "../../constants/apiEndPoints";
import { get, post } from "../../helpers/api_helpers";
import { formatDate } from "../../utilities/helper";
const PerformanceReviewForm = ({
  editPerformanceReview,
  fetch,
  setPerformanceReviewEdit,
}) => {
  console.log(editPerformanceReview);
  const [errors, setErrors] = useState({});
  // const [dropdown, setDropdown] = useState([]);
  const initialState = {
    performanceReviewId: crypto.randomUUID(),
    employeeId: "",
    reviewDate: "",
    reviewScore: "",
    reviewNote: "",
  };
  const [performanceReview, setPerformanceReview] = useState(
    editPerformanceReview || initialState
  );
  const [dropdown, setDropdown] = useState([]);
  const fetchManager = async () => {
    const fetchData = await get(DEPARTMENT_API.dropdown());
    setDropdown(fetchData);
  };
  useEffect(() => {
    fetchManager();
  }, []);
  useEffect(() => {
    if (editPerformanceReview) {
      setPerformanceReview(editPerformanceReview);
    }
  }, [editPerformanceReview]);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setPerformanceReview({
      ...performanceReview,
      [name]: value,
    });
  };
  const validateForm = () => {
    const newErrors = {};

    if (!performanceReview.employeeId) {
      newErrors.employeeId = "Employee is required.";
    }

    if (!performanceReview.reviewDate) {
      newErrors.reviewDate = "Review Date is required.";
    }
    if (!performanceReview.reviewScore || performanceReview.reviewScore > 10) {
      newErrors.reviewScore = "Review Score is between 1 - 10.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (editPerformanceReview) {
        const update = await post(PERFORMANCE_REVIEW_API.update(), {
          ...performanceReview,
        });
        if (update?.performanceReviewId) {
          toast.success("performanceReview Updated!");
          fetch();
          setPerformanceReview(initialState);
          setPerformanceReviewEdit(null);
        }
      } else {
        const create = await post(PERFORMANCE_REVIEW_API.create(), {
          ...performanceReview,
        });

        if (create.performanceReviewId) {
          toast.success("performanceReview Added!");
          fetch();
          setPerformanceReview(initialState);
          setPerformanceReviewEdit(null);
        }
      }
    } else {
      toast.warning("Validation failed!");
    }
  };
  return (
    <>
      <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
        <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
          Performance Review
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Employee
            </label>
            <div className="mt-2">
              <select
                id="employeeId"
                name="employeeId"
                autoComplete="employeeId"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={performanceReview.employeeId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a manager
                </option>
                {dropdown?.map((option) => (
                  <option key={option.employeeId} value={option.employeeId}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="text-sm text-red-600 mt-1">{errors.employeeId}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="reviewDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Review Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="reviewDate"
                id="reviewDate"
                autoComplete="off"
                placeholder="Enter department Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={formatDate(performanceReview.reviewDate)}
                onChange={handleChange}
              />
              {errors.reviewDate && (
                <p className="text-sm text-red-600 mt-1">{errors.reviewDate}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="reviewScore"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Review Score
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="reviewScore"
                id="reviewScore"
                autoComplete="off"
                placeholder="Enter Review Score (1 - 10)"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={performanceReview.reviewScore}
                onChange={handleChange}
              />
              {errors.reviewScore && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.reviewScore}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="reviewNote"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Review Note
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="reviewNote"
                id="reviewNote"
                autoComplete="off"
                placeholder="Enter Review Note"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={performanceReview.reviewNote}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default PerformanceReviewForm;
