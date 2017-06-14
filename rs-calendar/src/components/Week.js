import React from 'react';
import moment from 'moment';
import DayContainer from '../containers/DayContainer';
import { v4 } from 'node-uuid';

const Week = ({
    startDate,
}) => {
    const counter = Array(7).fill(0);
    return (
      <section className="week">
        {counter.map((e, i) =>
          <DayContainer
            key={v4()}
            date={moment(startDate).add(i, 'days')}
          />
        )}
      </section>
    );
};

export default Week;
