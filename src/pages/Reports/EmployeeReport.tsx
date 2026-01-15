import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { ExpenseReportReponse } from "@/interfaces/Report";

type EmployeeReportProps = {
  data: ExpenseReportReponse[];
  employees: string[];
  employeeNameById: Record<string, string>;
};

type ChartRow = {
  date: string;
  [employeeId: string]: number | string;
};

function buildChartData(
  expenses: ExpenseReportReponse[],
  employeeIds: string[]
): ChartRow[] {
  const map: Record<string, ChartRow> = {};

  expenses.forEach((expense) => {
    const date = expense.date.split("T")[0];

    if (!map[date]) {
      map[date] = { date };
      employeeIds.forEach((id) => {
        map[date][id] = 0;
      });
    }

    if (employeeIds.includes(expense.employeeId)) {
      map[date][expense.employeeId] =
        (map[date][expense.employeeId] as number) + expense.amount;
    }
  });

  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

export default function EmployeeReport({
  data,
  employees,
  employeeNameById,
}: EmployeeReportProps) {
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

      {employees.map((id, index) => (
        <Line
          key={id}
          type="monotone"
          dataKey={id}
          name={employeeNameById[id] ?? id}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={2}
          dot={false}
        />
      ))}
    </LineChart>
  );
}
