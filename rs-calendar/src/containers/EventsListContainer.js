import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions';
import EventsList from '../components/EventsList';
import FetchError from '../components/FetchError';

class EventsListContainer extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { events, speakers, fetchEvents, fetchTrainers } = this.props;
        if (!events.length) {
            fetchEvents();
        }
        if (!speakers.length) {
            fetchTrainers();
        }
    }

    render() {
        const { events, viewtype, currDate, setDate, isFetching, errorMessage } = this.props;

        const className = 'eventsList ' + (viewtype === 'day' ? 'hide' : '');
        if (isFetching && !events.length) {
            return (
              <div className={className}>
                <p className="noEventsDay">Loading...</p>
              </div>
            );
        }

        if (errorMessage) {
            return (
              <FetchError
                message={errorMessage}
                onRetry={() => this.fetchData()}
              />
            );
        }
        const currMonthEvents = (month) => events.filter(
            (e) =>
            moment(e.start).format('YYYY-MM') ===
            moment(month).format('YYYY-MM')
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

        const monthEvents = currMonthEvents(currDate).sort(sortFunc);
        const evts = (monthEvents.length) ?
            (<EventsList
              monthEvents={monthEvents}
              className={className}
              setDate={setDate}
            />) :
            (<div className={className}>
              <p className="noEventsDay">No events</p>
            </div>);


        return (evts);
    }
}

const mapStateToProps = (state) => ({
    viewtype: state.tableBody.viewtype,
    currDate: state.range.currDate,
    events: state.eventsList.events,
    speakers: state.speakersList.speakers,
    isFetching: state.eventsList.isFetchingEvents,
    errorMessage: state.eventsList.errorMessage,
});

export default connect(
  mapStateToProps,
  actions
)(EventsListContainer);
