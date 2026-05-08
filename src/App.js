import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Employees from './pages/Employees';
import Funds from './pages/Funds';
import Admin from './pages/Admin';
import { useAuth } from './context/AuthContext';
import { useOfficeTreatData } from './hooks/useOfficeTreatData';
import { exportAttendance } from './utils/exportCsv';

function App() {
  const [route, setRoute] = useState('dashboard');
  const { user, userId, setUserId, isAdmin } = useAuth();
  const { db, currentEvent, summary, updateDb } = useOfficeTreatData();

  const setRsvp = (empId, status) => updateDb((prev) => {
    const key = `${currentEvent.id}_${empId}`;
    return { ...prev, rsvp: { ...prev.rsvp, [key]: { eventId: currentEvent.id, empId, status, respondedAt: new Date().toISOString() } } };
  });

  const sendReminder = () => {
    updateDb((prev) => {
      const pending = prev.employees.filter((emp) => !(prev.rsvp[`${currentEvent.id}_${emp.id}`]) || prev.rsvp[`${currentEvent.id}_${emp.id}`].status === 'pending');
      const nextNotifs = pending.map((emp) => ({ targetEmpId: emp.id, type: 'reminder', message: `Please RSVP for ${currentEvent.name}`, eventId: currentEvent.id, read: false, createdAt: new Date().toISOString() }));
      return { ...prev, notifications: [...prev.notifications, ...nextNotifs] };
    });
  };

  const onExport = () => exportAttendance(currentEvent.id, db.employees, db.rsvp);

  return (
    <div className='layout'>
      <Navbar route={route} setRoute={setRoute} isAdmin={isAdmin} user={user} userId={userId} setUserId={setUserId} employees={db.employees} />
      {route === 'dashboard' && <Dashboard event={currentEvent} summary={summary} />}
      {route === 'events' && <Events events={db.events} />}
      {route === 'event-detail' && <EventDetail event={currentEvent} employees={db.employees} rsvp={db.rsvp} setRsvp={setRsvp} />}
      {isAdmin && route === 'employees' && <Employees employees={db.employees} />}
      {isAdmin && route === 'funds' && <Funds summary={summary} />}
      {isAdmin && route === 'admin' && <Admin onReminder={sendReminder} onExport={onExport} />}
    </div>
  );
}

export default App;
