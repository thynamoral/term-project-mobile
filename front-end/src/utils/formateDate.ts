import { format } from "date-fns";

export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);
  return format(date, "MMM yyyy");
};
