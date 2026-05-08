import { employeesSeed, eventsSeed } from './mockData';

const KEY = 'officetreat-db-v1';

const seed = {
  employees: employeesSeed,
  events: eventsSeed,
  rsvp: {},
  payments: {},
  notifications: [],
};

export const loadDb = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
};

export const saveDb = (db) => localStorage.setItem(KEY, JSON.stringify(db));
