export default function Dashboard({ event, summary }) {
  const progress = summary.target ? Math.round((summary.collected / summary.target) * 100) : 0;
  return (
    <section className="card">
      <h2>Dashboard</h2>
      <p>Next Event: <strong>{event.name}</strong> at {event.venue}</p>
      <div className="grid3">
        <div className="metric">Attending: {summary.attending}</div>
        <div className="metric">Pending: {summary.pending}</div>
        <div className="metric">Funds: ₹{summary.collected} / ₹{summary.target} ({progress}%)</div>
      </div>
    </section>
  );
}
