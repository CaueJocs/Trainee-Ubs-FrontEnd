import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { type ExpenseResponse } from "@/interfaces/Expense";

type AreaBudgetReportProps = {
  data: ExpenseResponse[];
  areas: string[];
  budgets: { area: string; budget: number }[];
};

export default function AreaBudgetReport({
  data,
  areas,
  budgets,
}: AreaBudgetReportProps) {
  function buildChartData(
    expenses: ExpenseResponse[],
    areaList: string[],
    budgetList: { area: string; budget: number }[]
  ) {
    const map: Record<
      string,
      { area: string; spent: number; budget: number }
    > = {};

    areaList.forEach((area) => {
      map[area] = {
        area,
        spent: 0,
        budget: 0,
      };
    });

    budgetList.forEach(({ area, budget }) => {
      if (map[area]) {
        map[area].budget = budget;
      }
    });

    expenses.forEach((expense) => {
      if (map[expense.departmentName]) {
        map[expense.departmentName].spent += expense.amount;
      }
    });

    return Object.values(map);
  }

  const chartData = buildChartData(data, areas, budgets);

  return (
    <ComposedChart
      width={700}
      height={400}
      data={chartData}
      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="area" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar dataKey="spent" fill="#2563eb" name="Spent" />
      <Line
        type="monotone"
        dataKey="budget"
        stroke="#dc2626"
        strokeWidth={2}
        dot={false}
        name="Budget"
      />
    </ComposedChart>
  );
}
