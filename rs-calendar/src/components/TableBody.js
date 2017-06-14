import React from 'react';
import ViewTypeListContainer from '../containers/ViewTypeListContainer';
import CalendarContainer from '../containers/CalendarContainer';
import EventsListContainer from '../containers/EventsListContainer';
import DayEventsContainer from '../containers/DayEventsContainer';

const TableBody = () => (
  <div className="tableBody">
    <ViewTypeListContainer />
    <CalendarContainer />
    <EventsListContainer />
    <DayEventsContainer />
  </div>
);

export default TableBody;
