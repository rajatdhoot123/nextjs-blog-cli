const dateFormat = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default dateFormat;
