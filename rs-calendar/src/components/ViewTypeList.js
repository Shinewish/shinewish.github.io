import React from 'react';

const ViewTypeList = ({
    viewMonth,
    viewDay,
    viewtype,
}) => (
  <div className="viewTypeList">
    <div
      className={'viewType ' + viewtype + (viewtype === 'month' ? '' : ' passive')}
      onClick={viewMonth}
    >
      <img className="monthImg" src="./assets/month.png" alt="monthViewType" />
    </div>
    <div
      className={'viewType ' + viewtype + (viewtype === 'day' ? '' : ' passive')}
      onClick={viewDay}
    >
      <img className="dayImg" src="./assets/day.png" alt="dayViewType" />
    </div>
  </div>
);

export default ViewTypeList;
