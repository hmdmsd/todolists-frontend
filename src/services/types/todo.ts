export interface TodoItem {
  id: string;
  description: string;
  status: "PENDING" | "IN-PROGRESS" | "DONE";
}
