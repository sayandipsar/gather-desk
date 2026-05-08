export function exportAttendance(eventName, employees, rsvp) {
  const rows = employees.map((emp) => {
    const key = `${eventName}_${emp.id}`;
    return [emp.name, emp.department, rsvp[key]?.status || 'pending'];
  });

  const csv = [['Name', 'Department', 'RSVP'], ...rows]
    .map((line) => line.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${eventName}-attendance.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
