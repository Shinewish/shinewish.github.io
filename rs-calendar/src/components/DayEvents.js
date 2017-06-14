import React from 'react';
import DayEvent from './DayEvent';

const DayEvents = ({
    className,
    dayEvents,
}) => (
  <div className={className}>
    {dayEvents.map(event => (
      <DayEvent
        key={event.id}
        details={event}
      />
    ))}
  </div>
);

export default DayEvents;
