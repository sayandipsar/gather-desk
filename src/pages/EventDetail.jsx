export default function EventDetail({ event, employees, rsvp, setRsvp }) {
  return (
    <section className="card"><h2>Event Detail</h2>
      <p>{event.name} — RSVP deadline {event.rsvpDeadline}</p>
      {employees.slice(0, 12).map((emp) => {
        const key = `${event.id}_${emp.id}`;
        return <div key={emp.id}>{emp.name}
          <select value={rsvp[key]?.status || 'pending'} onChange={(e)=>setRsvp(emp.id, e.target.value)}>
            <option value="attending">Attending</option><option value="not_attending">Not Attending</option><option value="pending">Pending</option>
          </select>
        </div>;
      })}
    </section>
  );
}
