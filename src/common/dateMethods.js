const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const toDisplayDateFormat = (date) => {
  if (date) {
    const year = date.substr(0, 4);
    const month = months[date.substr(date.length - 2, 2) - 1];
    const formattedString = month + " " + year;
    return formattedString;
  }
};

export const compareDates = (startDate, endDate) => {
  const startDateYear = startDate.substr(0, 4);
  const startDateMonth = months[startDate.substr(startDate.length - 2, 2) - 1];

  const endDateYear = endDate.substr(0, 4);
  const endDateMonth = months[endDate.substr(endDate.length - 2, 2) - 1];

  if (endDateYear > startDateYear) {
    return true;
  } else if (endDateYear === startDateYear) {
    if (endDateMonth >= startDateMonth) {
      return true;
    }
  }
  return false;
};
