import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEPARTMENT_API } from "../../constants/apiEndPoints";
import { get, post } from "../../helpers/api_helpers";
const DepartmentForm = ({ editDepartment, fetch, setDepartmentEdit }) => {
  const [errors, setErrors] = useState({});
  const [dropdown, setDropdown] = useState([]);
  const initialState = {
    departmentId: crypto.randomUUID(),
    departmentName: "",
    managerId: "",
    budget: "",
  };
  const [department, setDepartment] = useState(editDepartment || initialState);
  const [departmentDropdown, setDepartmentDropdown] = useState([]);
  const fetchManager = async () => {
    const fetchData = await get(DEPARTMENT_API.dropdown());
    setDropdown(fetchData);
  };
  useEffect(() => {
    fetchManager();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setDepartment({
      ...department,
      [name]: value,
    });
  };
  const validateForm = () => {
    const newErrors = {};

    if (!department.departmentName.trim()) {
      newErrors.departmentName = "Name is required.";
    }

    if (!department.managerId) {
      newErrors.managerId = "Manager is required.";
    }
    if (!department.budget) {
      newErrors.budget = "Budget is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (editDepartment) {
        const update = await post(DEPARTMENT_API.update(), { ...department });
        if (update?.departmentId) {
          toast.success("Department Updated!");
          fetch();
          setDepartment(initialState);
          setDepartmentEdit(null);
        }
      } else {
        const create = await post(DEPARTMENT_API.create(), { ...department });

        if (create.departmentId) {
          toast.success("Department Added!");
          fetch();
          setDepartment(initialState);
          setDepartmentEdit(null);
        }
      }
    } else {
      console.log("Validation failed.");
    }
  };
  return (
    <>
      <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
        <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
          Department
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label
              htmlFor="departmentName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Department Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="departmentName"
                id="departmentName"
                autoComplete="off"
                placeholder="Enter department Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={department.departmentName}
                onChange={handleChange}
              />
              {errors.departmentName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.departmentName}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="managerId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Manager
            </label>
            <div className="mt-2">
              <select
                id="managerId"
                name="managerId"
                autoComplete="managerId"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={department.managerId}
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
              {errors.managerId && (
                <p className="text-sm text-red-600 mt-1">{errors.managerId}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Budget
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="budget"
                id="budget"
                autoComplete="off"
                placeholder="Enter department Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={department.budget}
                onChange={handleChange}
              />
              {errors.budget && (
                <p className="text-sm text-red-600 mt-1">{errors.budget}</p>
              )}
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

export default DepartmentForm;
