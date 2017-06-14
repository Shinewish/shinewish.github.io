import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions';
import DayEvents from '../components/DayEvents';

const DayEventsContainer = ({
    events,
    viewtype,
    currDate,
    speakers,
    isFetching,
}) => {
    const className = 'dayEvents ' + (viewtype === 'day' ? '' : 'hide');
    if (isFetching && !speakers.length) {
        return (
          <div className={className}>
            <p className="noEventsDay">Loading...</p>
          </div>
        );
    }

    const currDayEvents = (date) => events.filter(
        (e) =>
        moment(e.start).format('YYYY-MM-DD') ===
        moment(date).format('YYYY-MM-DD')
    );

    const sortFunc = (a, b) => {
        const aS = moment(a.start).format('DD-HH-mm');
        const bS = moment(b.start).format('DD-HH-mm');
        if (aS > bS) {
            return 1;
        }
        if (aS === bS) {
            return 0;
        }
        return -1;
    };

    const dayEvents = currDayEvents(currDate).sort(sortFunc);
    const evts = (dayEvents.length) ?
        (<DayEvents
          dayEvents={dayEvents}
          className={className}
        />) :
        (<div className={className}>
          <p className="noEventsDay">No events</p>
        </div>);

    return (evts);
};

const mapStateToProps = (state) => ({
    events: state.eventsList.events,
    viewtype: state.tableBody.viewtype,
    currDate: state.range.currDate,
    speakers: state.speakersList.speakers,
    isFetching: state.speakersList.isFetchingSpeakers,
    errorMessage: state.speakersList.errorMessage,
});

export default connect(
  mapStateToProps,
  actions
)(DayEventsContainer);
