export default function Events({ events }) {
  return <section className="card"><h2>Events</h2>{events.map((e) => <p key={e.id}>{e.name} · {e.date} · {e.status}</p>)}</section>;
}
