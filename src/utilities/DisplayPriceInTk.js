export const DisplayPrice = (price) => {
  return (
    "৳" +
    new Intl.NumberFormat("en-BD", {
      style: "decimal",
      minimumFractionDigits: 2,
    }).format(price)
  );
};
