import React from 'react';
import moment from 'moment';
import SpeakersContainer from '../containers/SpeakersContainer';
import { v4 } from 'node-uuid';

const DayEvent = ({
    details,
}) => {
    const className = 'dayEvent ' + details.type;
    return (
      <div className={className}>
        <span className="eventsType">{details.type}</span>
        <span className="eventsTitle">{details.title}</span>
        <h1 className="eventsDate">
          {moment(details.start).format('HH-mm a') + ' - ' +
            moment(details.start).add(details.duration, 'ms').format('HH-mm a')
          }
        </h1>
        <span className="eventsDescription">{details.description}</span>
        <SpeakersContainer speakersIds={details.speakers} />
        <p className="eventsLocation"> {'Location: ' + details.location} </p>
        <div className="google-maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4698.436823116764!2d27.685787836297415!3d53.927863472436925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcebb6d7b5ae9%3A0xc3063ef9bbdf17cf!2z0YPQuy4g0JDQutCw0LTQtdC80LjQutCwINCa0YPQv9GA0LXQstC40YfQsCAz0LIsINCc0LjQvdGB0LogMjIwMTQx!5e0!3m2!1sru!2sby!4v1496317729676"
            width="600px"
            height="400px"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          >
          </iframe>
        </div>
        <div className="eventsResources">
          {details.resources.map(res => (
            <div key={v4()} className="eventsResource">
              <div className="resContent">
                <div className="resType">{res.type}</div>
                <a className="resLink" href={res.resource}>
                  <img src="../assets/book.png" alt="resource link" />
                </a>
              </div>
              <div className="resDescript">{res.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DayEvent;
