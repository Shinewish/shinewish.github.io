import React from 'react';
import moment from 'moment';
import Week from './Week';
import { v4 } from 'node-uuid';

// import TableHeader from './TableHeader';

const Calendar = ({
    calendDisplay,
    currDate,
}) => {
    const getLastMonday = (date) => {
        const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
        const startOfIsoWeek = moment(startOfMonth).startOf('isoWeek').format('YYYY-MM-DD');
        const lastIsoMonday = (startOfIsoWeek === startOfMonth) ?
            moment(startOfIsoWeek).subtract(7, 'days').format('YYYY-MM-DD') :
            startOfIsoWeek;
        return lastIsoMonday;
    };

    const show = 'calendar ' + calendDisplay;
    const startDate = getLastMonday(currDate);
    const counter = Array(6).fill(0);
    return (
      <div className={show}>
        {counter.map((e, i) =>
          <Week
            key={v4()}
            startDate={moment(startDate).add(i * 7, 'days').format('YYYY-MM-DD')}
          />
        )}
      </div>
    );
};

export default Calendar;
