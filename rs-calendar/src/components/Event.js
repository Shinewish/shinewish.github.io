import React from 'react';
import moment from 'moment';

const Event = ({ details, setDate }) => {
    const className = 'eventCeil ' + details.type;

    return (
      <article className={className} onClick={setDate}>
        <div className="eventDaTy">
          <div className={'eventType ' + details.type}>
            <p className="flexCenter">{details.type}</p>
          </div>
          <div className="eventDate">
            <p className="eventDateDay">{moment(details.start).format('Do')}</p>
            <p className="eventDateTime">{moment(details.start).format('HH:mm - ') +
              moment(details.start).add(details.duration, 'ms').format('HH:mm')}
            </p>
          </div>
        </div>

        <div className="eventInfo">
          <p className="eventTitle">{details.title}</p>
          <p className="eventDescription">{details.description}</p>
        </div>
      </article>
    );
};

export default Event;
