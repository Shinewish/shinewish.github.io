import React from 'react';

const FetchError = ({ message, onRetry }) => (
  <div className="error">
    <div className="errorShadow"></div>
    <div className="errorBlock">
      <p className="errorMessage">
        <span>Oops! An Error during the fetching occurred!</span>
        <br />err.mess:
        <br />{message}
      </p>
      <button className="errorButton" onClick={onRetry}>Retry</button>
    </div>
  </div>
);

export default FetchError;
