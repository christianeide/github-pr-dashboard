import React from 'react';
import PropTypes from 'prop-types';

export default function RefreshButton(props) {
  return (
    <button
      id="refresh-button"
      type="button"
      className="btn btn-default"
      onClick={props.onRefresh}
      title="Refresh"
    >
      <i className="fas fa-lg fa-sync-alt"></i>
    </button>
  );
}

RefreshButton.propTypes = {
  onRefresh: PropTypes.func.isRequired
};
