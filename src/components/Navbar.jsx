export default function Navbar({ route, setRoute, isAdmin, user, userId, setUserId, employees }) {
  const tabs = ['dashboard', 'events', 'event-detail'];
  if (isAdmin) tabs.push('employees', 'funds', 'admin');

  return (
    <header className="topbar">
      <div><strong>OfficeTreat</strong> · {user?.name}</div>
      <nav>
        {tabs.map((tab) => <button key={tab} onClick={() => setRoute(tab)} className={route === tab ? 'active' : ''}>{tab}</button>)}
      </nav>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        {employees.map((emp) => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
      </select>
    </header>
  );
}
