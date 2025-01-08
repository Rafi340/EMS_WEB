import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEPARTMENT_API, EMPLOYEE_API } from "../../constants/apiEndPoints";
import { get, post } from "../../helpers/api_helpers";
import { formatDate } from "../../utilities/helper";
const EmployeeForm = ({ editEmployee, fetch, setEmployeeEdit }) => {
  const [errors, setErrors] = useState({});
  const [dropdown, setDropdown] = useState([]);
  const initialState = {
    employeeId: crypto.randomUUID(),
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    position: "",
    joiningDate: "",
    status: 1,
  };
  const [employee, setEmployee] = useState(editEmployee || initialState);
  const [departmentDropdown, setDepartmentDropdown] = useState([]);
  const fetchDepartment = async () => {
    const fetchData = await get(DEPARTMENT_API.getAll());
    console.log(fetchData);
    setDropdown(fetchData);
  };
  useEffect(() => {
    fetchDepartment();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const validateForm = () => {
    const newErrors = {};

    if (!employee.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!employee.email.trim() || !/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!employee.phone.trim()) {
      newErrors.phone = "Valid phone number is required.";
    }
    if (!employee.departmentId) {
      newErrors.departmentId = "Department is required.";
    }
    if (!employee.position.trim()) {
      newErrors.position = "Position is required.";
    }
    if (!employee.joiningDate) {
      newErrors.joiningDate = "Joining date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(employee);
    if (validateForm()) {
      if (editEmployee) {
        const update = await post(EMPLOYEE_API.update(), { ...employee });
        if (update?.employeeId) {
          toast.success("Employee Added!");
          fetch();
          setEmployee(initialState);
          setEmployeeEdit(null);
        }
      } else {
        const create = await post(EMPLOYEE_API.create(), { ...employee });

        if (create.employeeId) {
          toast.success("Employee Added!");
          fetch();
          setEmployee(initialState);
          setEmployeeEdit(null);
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
          Employee
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="Enter Employee Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={employee.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Enter Employee Email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={employee.email}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="phone"
                id="phone"
                autoComplete="off"
                placeholder="Enter Employee Email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={employee.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="DepartmentId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Department
            </label>
            <div className="mt-2">
              <select
                id="departmentId"
                name="departmentId"
                autoComplete="departmentId"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={employee.departmentId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a department
                </option>
                {dropdown?.map((option) => (
                  <option key={option.departmentId} value={option.departmentId}>
                    {option.departmentName}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.departmentId}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="position"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Position
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="position"
                id="position"
                autoComplete="off"
                placeholder="Enter Position"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={employee.position}
                onChange={handleChange}
              />
              {errors.position && (
                <p className="text-sm text-red-600 mt-1">{errors.position}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="joiningDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Joining Date
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="joiningDate"
                id="joiningDate"
                autoComplete="off"
                placeholder="Joining Date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                value={
                  employee.joiningDate ? formatDate(employee.joiningDate) : ""
                }
                onChange={handleChange}
              />
              {errors.joiningDate && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.joiningDate}
                </p>
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

export default EmployeeForm;
