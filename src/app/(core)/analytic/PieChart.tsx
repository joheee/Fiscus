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

export const description = "A pie chart with a label";

export function ChartPieLabel() {
  const [chartData, setChartData] = useState<
    {
      name: string;
      total: number;
      fill: string;
    }[]
  >([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  useEffect(() => {
    async function fetchData() {
      const data = await getExpenseSummaryByLabel(
        new Date("2025-08-01"),
        new Date()
      );
      const totalExpense = await getTotalExpensesForCurrentUser();
      setChartData(data);
      setTotalExpense(totalExpense);
    }
    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Expense By Label</CardTitle>
        <DateRangePicker
          onUpdate={(values) => console.log(values)}
          initialDateFrom="2023-01-01"
          initialDateTo="2023-12-31"
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
          You already spend{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "IDR",
          }).format(totalExpense)}
        </div>
      </CardFooter>
    </Card>
  );
}
