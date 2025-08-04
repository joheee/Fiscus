"use server";
import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";

/**
 * Fetches and aggregates expense data for the current user within a date range,
 * grouped by label. This function is designed to provide data for charts.
 * @param startDate The start of the date range.
 * @param endDate The end of the date range.
 * @returns An array of objects, each containing the label name and the total expense amount.
 */
export async function getExpenseSummaryByLabel(startDate: Date, endDate: Date) {
  const session = await getUserSession();
  if (!session) return [];

  const summary = await prisma.expense.groupBy({
    by: ["label_id"],
    where: {
      user_id: session.user_id,
      transaction_date: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      price: true,
    },

    orderBy: {
      _sum: {
        price: "desc",
      },
    },
  });

  if (summary.length === 0) {
    return [];
  }

  const labelIds = summary.map((item) => item.label_id);

  const labels = await prisma.label.findMany({
    where: {
      label_id: {
        in: labelIds,
      },
    },
    select: {
      label_id: true,
      name: true,
    },
  });

  const labelMap = new Map(labels.map((label) => [label.label_id, label.name]));

  const baseHue = 210;
  const saturation = 70;
  const initialLightness = 75;
  const lightnessStep = 5;

  const chartData = summary.map((item, index) => {
    const name = labelMap.get(item.label_id) || "Unknown Label";

    const lightness = initialLightness - ((index * lightnessStep) % 40);

    return {
      name: name,
      total: item._sum.price || 0,
      fill: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`,
    };
  });

  return chartData;
}

export async function getTotalExpensesForCurrentUser(
  startDate: Date,
  endDate: Date
) {
  const session = await getUserSession();
  if (!session) {
    return 0;
  }

  const totalExpenses = await prisma.expense.aggregate({
    _sum: {
      price: true,
    },
    where: {
      user_id: session.user_id,
      transaction_date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return totalExpenses._sum.price || 0;
}
