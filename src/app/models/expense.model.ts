

export interface ExpenseModel {
  id: string;
  property: {
    id: string,
    name: string
  };
  expenseDate: Date;
  description: string;
  value: number;
}