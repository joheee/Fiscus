"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import {
  getExpenseSummaryByLabel,
  getTotalExpensesForCurrentUser,
} from "@/app/server/analytic";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

export const description = "A pie chart with a label";

// This function now correctly sets the time to the start and end of the month
const getMonthDateRange = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // FIX: Set to the absolute beginning of the day
  firstDay.setHours(0, 0, 0, 0);
  // FIX: Set to the absolute end of the day
  lastDay.setHours(23, 59, 59, 999);

  return { from: firstDay, to: lastDay };
};

export function ChartPieLabel() {
  const [chartData, setChartData] = useState<
    {
      name: string;
      total: number;
      fill: string;
    }[]
  >([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRange>(
    getMonthDateRange()
  );

  useEffect(() => {
    async function fetchData() {
      // Ensure we have valid dates before fetching
      if (dateRangeFilter?.from && dateRangeFilter?.to) {
        const data = await getExpenseSummaryByLabel(
          dateRangeFilter.from,
          dateRangeFilter.to
        );
        const totalExpense = await getTotalExpensesForCurrentUser(
          dateRangeFilter.from,
          dateRangeFilter.to
        );
        setChartData(data);
        setTotalExpense(totalExpense);
      }
    }
    fetchData();
  }, [dateRangeFilter]);

  const handleDateUpdate = (values: { range: DateRange }) => {
    const { from, to } = values.range;

    // Use the 'to' date if it exists, otherwise use 'from' for single-day selection
    const endDate = to ?? from;

    if (from && endDate) {
      const adjustedFrom = new Date(from);
      const adjustedTo = new Date(endDate);

      // FIX: Set 'from' to the absolute beginning of the selected day
      adjustedFrom.setHours(0, 0, 0, 0);
      // FIX: Set 'to' to the absolute end of the selected day
      adjustedTo.setHours(23, 59, 59, 999);

      setDateRangeFilter({ from: adjustedFrom, to: adjustedTo });
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center mb-4">
          Total Expense By Label
        </CardTitle>
        <DateRangePicker
          onUpdate={handleDateUpdate}
          initialDateFrom={dateRangeFilter.from}
          initialDateTo={dateRangeFilter.to}
          align="start"
          locale="en-GB"
          showCompare={false}
        />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="total">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          You spend{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "IDR",
          }).format(totalExpense)}
        </div>
      </CardFooter>
    </Card>
  );
}
