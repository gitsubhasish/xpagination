import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationDiv from "./PaginationDiv";

export default function EmployeeData() {
  const [pageNo, setPageNo] = useState(1);
  const [empCount, setEmpCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        let empData = response.data;
        setEmployees(empData);
        setEmpCount(empData.length);
        setDisplayedEmployees(empData.slice(0, pageSize));
        setLoading(false);
      } catch (error) {
        alert("failed to fetch data");
      }
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const startIdx = (pageNo - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    setDisplayedEmployees(employees.slice(startIdx, endIdx)); // Set employees for the current page
  }, [pageNo, employees]);

  const incrementPage = () => {
    if (pageNo * pageSize < empCount) {
      setPageNo(pageNo + 1);
    }
  };

  const decrementPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "4rem",
        flexDirection: "column",
      }}
    >
      <table style={{ width: "80%" }}>
        <thead style={{ height: 50, backgroundColor: "green", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.length &&
            displayedEmployees.map((emp) => (
              <tr
                key={emp.id}
                style={{
                  height: 50,
                  borderBottom: "1px solid",
                  borderBottomColor: "#000",
                }}
              >
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <PaginationDiv
        pageNo={pageNo}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
        totalPages={Math.ceil(empCount / pageSize)}
      />
    </div>
  );
}
