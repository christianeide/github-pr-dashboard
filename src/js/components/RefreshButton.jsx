import React from 'react';

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
  onRefresh: React.PropTypes.func.isRequired
};
