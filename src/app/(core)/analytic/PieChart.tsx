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
} from "@/app/server/profile";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

export const description = "A pie chart with a label";

const getMonthDateRange = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  firstDay.setHours(0, 0, 0, 0);
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

  console.log(dateRangeFilter);

  useEffect(() => {
    async function fetchData() {
      const data = await getExpenseSummaryByLabel(
        dateRangeFilter.from!,
        dateRangeFilter.to!
      );
      const totalExpense = await getTotalExpensesForCurrentUser(
        dateRangeFilter.from!,
        dateRangeFilter.to!
      );
      setChartData(data);
      setTotalExpense(totalExpense);
    }
    fetchData();
  }, [dateRangeFilter]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center mb-4">
          Total Expense By Label
        </CardTitle>
        <DateRangePicker
          onUpdate={(values) => setDateRangeFilter(values.range)}
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
