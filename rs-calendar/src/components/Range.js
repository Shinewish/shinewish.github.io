import React from 'react';

const Range = ({
    value,
    dayView,
    viewtype,
    nextRange,
    prevRange,
}) => (
  <header className="header">
    <div className={dayView ? 'hide' : 'leftRange'}></div>
    <div className={dayView ? 'dayRange' : 'hide'}></div>
    <div className="centerRange">
      <a className="prev alignCenter" onClick={() => prevRange(viewtype)}>
        <img className="arrow" src="./assets/arrowLeft.png" alt="previousRange" />
      </a>
      <p className="range alignCenter">
        <span className="nameRange">
          {value}
        </span>
      </p>
      <a className="next alignCenter" onClick={() => nextRange(viewtype)}>
        <img className="arrow" src="./assets/arrowRight.png" alt="nextRange" />
      </a>
    </div>
    <div className={dayView ? 'dayRange' : 'hide'}></div>
    <div className={dayView ? 'hide' : 'rightRange'}></div>
  </header>
);

export default Range;
