import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';


const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null)
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees')
        try {
            const data =
                await GetAllEmployees(search, page, limit);
            console.log(data);
            setEmployeesData(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, [])


    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    }

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    }
   return (
    <div className="container-fluid bg-light min-vh-100 py-4">
        <div className="container">

            {/* Card Wrapper */}
            <div className="card shadow border-0">
                
                {/* Header */}
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="mb-0">Mudaasir Rizvi</h3>
                        <small className="text-muted">
                            Design and Developed 
                        </small>
                    </div>
                    <div>
                        <h3 className="mb-0 fw-bold ">Employee Management</h3>
                        <small className="text-muted">
                            Manage employees, departments & records
                        </small>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Employee
                    </button>
                </div>

                {/* Body */}
                <div className="card-body">

                    {/* Search */}
                    <div className="row mb-3">
                        <div className="col-md-6 ms-auto">
                            <input
                                onChange={handleSearch}
                                type="text"
                                placeholder="Search by name, email or department..."
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />
                </div>
            </div>

            {/* Modal */}
            <AddEmployee
                fetchEmployees={fetchEmployees}
                showModal={showModal}
                setShowModal={setShowModal}
                employeeObj={employeeObj}
            />
        </div>

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
        />
    </div>
);

};

export default EmployeeManagementApp;
