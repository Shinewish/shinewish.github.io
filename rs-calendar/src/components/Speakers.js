import React from 'react';
import { v4 } from 'node-uuid';

const Speakers = ({
    speakersIds,
    speakers,
}) => {
    const trainer = (id) => speakers.filter(tr => tr.id === id)[0];
    const imgStyle = {
        width: (81 / speakersIds.length) + 'vw',
        maxWidth: '20vw',
    };
    return speakersIds.length ?
        (<div className="speakers">
            {speakersIds.map(trId =>
              <div className="trainer" key={v4()}>
                <img
                  className="trainerAvatar"
                  src={trainer(trId).avatar}
                  alt="trainerAvatar"
                  style={imgStyle}
                />
                <div className="trainerName">{trainer(trId).name}</div>
              </div>
            )}
        </div>) :
        (<div className="speakers"></div>);
};

export default Speakers;
