import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function SettingsButton({ history }) {
  return (
    <button
      id="settings-button"
      type="button"
      className="btn btn-default"
      title="Settings"
      onClick={() => history.push('/settings')}
    >
      <i className="fas fa-lg fa-cog"></i>
    </button>
  );
}

SettingsButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SettingsButton);
