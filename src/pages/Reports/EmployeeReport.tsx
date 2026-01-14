import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { type ExpenseResponse } from "@/components/layout/PendingApprovalsTable";

type EmployeeReportProps = {
  data: ExpenseResponse[];
  employees: string[];
};

export default function EmployeeReport({ data, employees }: EmployeeReportProps) {
  function buildChartData(
    expenses: ExpenseResponse[],
    employeeNames: string[]
  ) {
    const map: Record<string, any> = {};

    expenses.forEach((expense) => {
      const date = expense.date.split("T")[0];

      if (!map[date]) {
        map[date] = { date };
        employeeNames.forEach((name) => {
          map[date][name] = 0;
        });
      }

      if (employeeNames.includes(expense.employeeName)) {
        map[date][expense.employeeName] += expense.amount;
      }
    });

    return Object.values(map).sort((a: any, b: any) =>
      a.date.localeCompare(b.date)
    );
  }

  const chartData = buildChartData(data, employees);
  const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c"];

  return (
    <LineChart
      width={700}
      height={400}
      data={chartData}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />

      {employees.map((name, index) => (
        <Line
          key={name}
          type="monotone"
          dataKey={name}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={2}
          dot={false}
        />
      ))}
    </LineChart>
  );
}
