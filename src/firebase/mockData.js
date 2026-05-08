export const employeesSeed = Array.from({ length: 40 }, (_, idx) => {
  const id = `emp${String(idx + 1).padStart(3, '0')}`;
  return {
    id,
    name: `Employee ${idx + 1}`,
    email: `${id}@officetreat.app`,
    department: ['Engineering', 'HR', 'Finance', 'Sales'][idx % 4],
    phone: `555-${String(1000 + idx)}`,
    role: idx === 0 ? 'admin' : 'employee',
  };
});

export const eventsSeed = [
  {
    id: 'event001',
    name: 'Evening Snacks',
    date: '2026-05-20T17:30',
    venue: 'Pantry Zone B',
    contributionAmount: 100,
    rsvpDeadline: '2026-05-18T12:00',
    createdBy: 'emp001',
    status: 'planning',
  },
];
