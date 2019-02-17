import React from 'react';
import PropTypes from 'prop-types';

const Type = (props) => (
  <div className="type">
    <a target="_blank" href={props.pullRequest.repoUrl}>
      {props.pullRequest.repo}
    </a>
  </div>
);

export default Type;

Type.propTypes = {
  pullRequest: PropTypes.object.isRequired
};
