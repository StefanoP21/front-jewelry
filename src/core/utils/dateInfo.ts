/* eslint-disable @typescript-eslint/no-explicit-any */
import { startOfWeek, startOfMonth, subWeeks, subMonths } from "date-fns";

// Función para obtener el total de la semana actual
export const getTotalForWeek = (array: any[], field: string) => {
  const currentWeekStart = startOfWeek(new Date()); // Primer día de esta semana
  const amountThisWeek = array.filter((item) => {
    const elementDate = new Date(item[field]); // Usa el campo dinámico
    return elementDate >= currentWeekStart && elementDate <= new Date(); // Compara con la semana actual
  });
  // Calcula el total, asegurándose de que solo se sumen valores válidos
  return amountThisWeek.reduce((total, item) => {
    const value = parseFloat(item.total);
    return total + (isNaN(value) ? 0 : value); // Si no es un número válido, sumar 0
  }, 0);
};

// Función para obtener el total de la semana pasada
export const getTotalForPreviousWeek = (array: any[], field: string) => {
  const previousWeekStart = startOfWeek(subWeeks(new Date(), 1)); // Primer día de la semana pasada
  const amountPreviousWeek = array.filter((item) => {
    const elementDate = new Date(item[field]); // Usa el campo dinámico
    return elementDate >= previousWeekStart && elementDate < startOfWeek(new Date()); // Compara con la semana pasada
  });
  // Calcula el total, asegurándose de que solo se sumen valores válidos
  return amountPreviousWeek.reduce((total, item) => {
    const value = parseFloat(item.total);
    return total + (isNaN(value) ? 0 : value); // Si no es un número válido, sumar 0
  }, 0);
};

// Función para obtener el total del mes actual
export const getTotalForMonth = (array: any[], field: string) => {
  const currentMonthStart = startOfMonth(new Date()); // Primer día de este mes
  const amountThisMonth = array.filter((item) => {
    const elementDate = new Date(item[field]); // Usa el campo dinámico
    return elementDate >= currentMonthStart && elementDate <= new Date(); // Compara con el mes actual
  });
  // Calcula el total, asegurándose de que solo se sumen valores válidos
  return amountThisMonth.reduce((total, item) => {
    const value = parseFloat(item.total);
    return total + (isNaN(value) ? 0 : value); // Si no es un número válido, sumar 0
  }, 0);
};

// Función para obtener el total del mes pasado
export const getTotalForPreviousMonth = (array: any[], field: string) => {
  const previousMonthStart = startOfMonth(subMonths(new Date(), 1)); // Primer día del mes pasado
  const amountPreviousMonth = array.filter((item) => {
    const elementDate = new Date(item[field]); // Usa el campo dinámico
    return elementDate >= previousMonthStart && elementDate < startOfMonth(new Date()); // Compara con el mes pasado
  });
  // Calcula el total, asegurándose de que solo se sumen valores válidos
  return amountPreviousMonth.reduce((total, item) => {
    const value = parseFloat(item.total);
    return total + (isNaN(value) ? 0 : value); // Si no es un número válido, sumar 0
  }, 0);
};

// Función para calcular el porcentaje de mejora
export const calculatePercentageChange = (previous: number, current: number) => {
  if (previous === 0) return 0; // Evitar división por cero
  return ((current - previous) / previous) * 100;
};
