import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExpenseInterface } from "../server/expense";

interface ExpenseTableInterface {
  expenses: ExpenseInterface[];
}

export function ExpenseTable({ expenses }: ExpenseTableInterface) {
  return (
    <Table>
      <TableCaption>Expenses Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Expense ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Label</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.expense_id}>
            <TableCell className="font-medium">{expense.expense_id}</TableCell>
            <TableCell className="font-medium">{expense.name}</TableCell>
            <TableCell>{expense.quantity}</TableCell>
            <TableCell>{expense.price}</TableCell>
            <TableCell>{expense.label.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
