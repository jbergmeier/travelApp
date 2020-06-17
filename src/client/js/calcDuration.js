const calcDuration = (startDate, endDate) => {
  const startDateParse = Date.parse(startDate);
  const endDateParse = Date.parse(endDate);
  const travelDateDays = Math.ceil(
    (endDateParse - startDateParse) / (24 * 60 * 60 * 1000)
  );
  return travelDateDays;
};

export { calcDuration };
