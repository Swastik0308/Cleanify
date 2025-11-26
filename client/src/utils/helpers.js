export const formatCurrency = (num) => {
  if (num == null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
};
