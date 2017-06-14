import React from 'react';
import moment from 'moment';
import Event from './Event';

const EventsList = ({
    className,
    monthEvents,
    setDate,
}) => (
  <div className={className}>
    {monthEvents.map(event => (
      <Event
        key={event.id}
        details={event}
        setDate={() => setDate(moment(event.start))}
      />
    ))}
  </div>
);

export default EventsList;
