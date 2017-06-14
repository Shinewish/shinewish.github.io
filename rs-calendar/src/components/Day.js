import React from 'react';
import moment from 'moment';
import { v4 } from 'node-uuid';

const Day = ({
    date,
    setDate,
    currDate,
    events,
}) => {
    const currMonth = moment(currDate).format('MM');
    const dateCeilMonth = moment(date).format('MM');
    const anotherMonth = currMonth !== dateCeilMonth ? ' anotherMonth' : '';
    const className = 'dateCeil' + anotherMonth;
    const currDayEvents = (day) =>
        events.filter(e =>
            moment(e.start).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD')
        ).map(e => e.type);
    const currDayEventsList = currDayEvents(date);
    return (
      <time
        dateTime={date}
        className={className}
        onClick={() => setDate(date)}
      >
        {currDayEventsList.map(e => (<div key={v4()} className={e}></div>)
        )}
        <span className="caldate">
            {moment(date).format('DD')}
        </span>
      </time>
    );
};

export default Day;
