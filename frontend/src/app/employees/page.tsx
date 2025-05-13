"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  startDate: string; // ISO string
  image: string;
};

const EmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/employees`
        );
        const data = await result.json();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 py-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          onClick={() => router.push(`/employees/${employee.id}`)}
          className="cursor-pointer bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-16 h-16 rounded-full object-cover border border-green-400"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-600">{employee.title}</p>
              <p className="text-xs text-gray-400">
                Hired: {new Date(employee.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeesList;
