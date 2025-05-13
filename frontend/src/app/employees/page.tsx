"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: string;
  name: string;
};

const EmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await fetch(`http://localhost:3456/employees`);
        const data = await result.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  return employees.map((employee) => (
    <div key={employee.id}>{employee.name}</div>
  ));
};

export default EmployeesList;
