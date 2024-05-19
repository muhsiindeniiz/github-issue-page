import React from "react";
import moment from "moment";

interface DateDifferenceProps {
  date: string;
}

const DateDifference: React.FC<DateDifferenceProps> = ({ date }) => {
  const currentDate = moment();
  const dateToCompare = moment(date);

  const daysAgo = currentDate.diff(dateToCompare, "days");
  const hoursAgo = currentDate.diff(dateToCompare, "hours") % 24;
  const minutesAgo = currentDate.diff(dateToCompare, "minutes") % 60;

  let formattedDifference;

  if (daysAgo > 0) {
    formattedDifference = `${daysAgo} days`;
  } else if (hoursAgo > 0) {
    formattedDifference = `${hoursAgo} hours ago`;
  } else {
    formattedDifference = `${minutesAgo} minutes ago`;
  }

  return <div>{formattedDifference}</div>;
};

export default DateDifference;
