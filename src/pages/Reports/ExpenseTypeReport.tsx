import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import { type ExpenseResponse } from "@/components/layout/PendingApprovalsTable";

type ExpenseTypeReportProps = {
  data: ExpenseResponse[];
  expenseTypes: string[];
};

export default function ExpenseTypeReport({
  data,
  expenseTypes,
}: ExpenseTypeReportProps) {
  function buildChartData(expenses: ExpenseResponse[], types: string[]) {
    const map: Record<string, number> = {};

    types.forEach((type) => {
      map[type] = 0;
    });

    expenses.forEach((expense) => {
      if (types.includes(expense.category)) {
        map[expense.category] += expense.amount;
      }
    });

    return Object.entries(map).map(([type, total]) => ({
      type,
      total,
    }));
  }

  const chartData = buildChartData(data, expenseTypes);

  const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c"];

  return (
    <BarChart
      width={700}
      height={400}
      data={chartData}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar dataKey="total">
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );
}
