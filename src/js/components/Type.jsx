import React from 'react';

const Type = (props) => (
  <div className="type">
    <a target="_blank" href={props.pullRequest.repoUrl}>
      {props.pullRequest.repo}
    </a>
  </div>
);

export default Type;

Type.propTypes = {
  pullRequest: React.PropTypes.object.isRequired
};
