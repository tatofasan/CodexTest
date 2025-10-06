import { parseISO } from 'date-fns';

export const parseDate = (value?: string) => {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const isWithinRange = (date: Date, from?: Date, to?: Date) => {
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
};

export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
