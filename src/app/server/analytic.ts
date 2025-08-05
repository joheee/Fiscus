"use server";
import prisma from "@/app/lib/prisma";
import { getUserSession } from "@/app/lib/session";
import { Prisma } from "@/generated/prisma"; // Import Prisma for raw query typing

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

  // Use a raw SQL query for complex aggregation (price * quantity).
  // This is more efficient than fetching all data and calculating in code.
  const summary: { name: string; total: number }[] = await prisma.$queryRaw(
    Prisma.sql`
      SELECT
        l.name as name,
        SUM(e.price * e.quantity)::float as total
      FROM
        "Expense" as e
      INNER JOIN
        "Label" as l ON e.label_id = l.label_id
      WHERE
        e.user_id = ${session.user_id} AND
        e.transaction_date >= ${startDate} AND
        e.transaction_date <= ${endDate}
      GROUP BY
        l.name
      ORDER BY
        total DESC;
    `
  );

  if (summary.length === 0) {
    return [];
  }

  // Define the base color and the number of steps for your color palette
  const baseHue = 210; // The hue for blue
  const saturation = 70;
  const initialLightness = 75;
  const lightnessStep = 5;

  const chartData = summary.map((item, index) => {
    // Calculate a unique lightness for each label based on its index.
    const lightness = initialLightness - ((index * lightnessStep) % 40);

    return {
      name: item.name,
      total: item.total, // The total is now correctly calculated by the database
      fill: `hsl(${baseHue}, ${saturation}%, ${lightness}%)`,
    };
  });

  return chartData;
}

// You would also update your getTotalExpensesForCurrentUser function similarly
export async function getTotalExpensesForCurrentUser(
  startDate: Date,
  endDate: Date
) {
  const session = await getUserSession();
  if (!session) return 0;

  const result: { sum: number | null }[] = await prisma.$queryRaw(
    Prisma.sql`
            SELECT SUM(price * quantity)::float as sum FROM "Expense"
            WHERE user_id = ${session.user_id}
            AND transaction_date >= ${startDate}
            AND transaction_date <= ${endDate};
        `
  );

  return result[0]?.sum || 0;
}
