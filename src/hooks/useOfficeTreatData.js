import { useMemo, useState } from 'react';
import { loadDb, saveDb } from '../firebase/localDb';

export function useOfficeTreatData() {
  const [db, setDb] = useState(loadDb());

  const updateDb = (updater) => {
    setDb((prev) => {
      const next = updater(prev);
      saveDb(next);
      return next;
    });
  };

  const currentEvent = db.events[0];

  const summary = useMemo(() => {
    const rsvpValues = Object.values(db.rsvp).filter((row) => row.eventId === currentEvent.id);
    const attending = rsvpValues.filter((v) => v.status === 'attending').length;
    const notAttending = rsvpValues.filter((v) => v.status === 'not_attending').length;
    const pending = db.employees.length - attending - notAttending;
    const contributorCount = db.employees.length;
    const paymentRows = Object.values(db.payments).filter((row) => row.eventId === currentEvent.id);
    const collected = paymentRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
    const target = contributorCount * Number(currentEvent.contributionAmount || 0);

    return { attending, notAttending, pending, collected, target };
  }, [db, currentEvent]);

  return { db, currentEvent, summary, updateDb };
}
