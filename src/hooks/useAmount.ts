import { useState, useEffect } from "react";
import {
  getTotalForWeek,
  getTotalForPreviousWeek,
  getTotalForMonth,
  getTotalForPreviousMonth,
  calculatePercentageChange,
} from "@/core/utils/dateInfo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAmount = (transactions: any[]) => {
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [totalPreviousWeek, setTotalPreviousWeek] = useState(0);
  const [totalThisMonth, setTotalThisMonth] = useState(0);
  const [totalPreviousMonth, setTotalPreviousMonth] = useState(0);
  const [percentageChangeWeek, setPercentageChangeWeek] = useState(0);
  const [percentageChangeMonth, setPercentageChangeMonth] = useState(0);

  useEffect(() => {
    // Cálculos de totales
    const thisWeek = getTotalForWeek(transactions, "date");
    const previousWeek = getTotalForPreviousWeek(transactions, "date");
    const thisMonth = getTotalForMonth(transactions, "date");
    const previousMonth = getTotalForPreviousMonth(transactions, "date");

    // Actualiza los estados
    setTotalThisWeek(thisWeek);
    setTotalPreviousWeek(previousWeek);
    setTotalThisMonth(thisMonth);
    setTotalPreviousMonth(previousMonth);

    // Calcula el porcentaje de cambio
    setPercentageChangeWeek(calculatePercentageChange(previousWeek, thisWeek));
    setPercentageChangeMonth(calculatePercentageChange(previousMonth, thisMonth));
  }, [transactions]);

  return {
    totalThisWeek,
    totalPreviousWeek,
    totalThisMonth,
    totalPreviousMonth,
    percentageChangeWeek,
    percentageChangeMonth,
  };
};

export default useAmount;
