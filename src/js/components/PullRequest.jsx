import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import '../../images/repo.svg';
import '../../images/git-pull-request.svg';

import UserPhoto from './UserPhoto';
import { Comments } from './Comments';

const CLASS_BASE = 'pull-request';
const CLASS_UNMERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--unmergeable`;
const CLASS_MERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--mergeable`;
const CLASS_STALE = `${CLASS_BASE} ${CLASS_BASE}--stale`;

function getPrClassName(pr) {
  if (pr.unmergeable) {
    return CLASS_UNMERGEABLE;
  } else if (pr.mergeable) {
    return CLASS_MERGEABLE;
  } else if (pr.stale) {
    return CLASS_STALE;
  }

  return CLASS_BASE;
}

export default class PullRequest extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  requestedReviewers(pr) {
    if (pr.mergeable) return null;
    const reviewers = pr.requested_reviewers.concat(pr.requested_teams);
    return reviewers.map(reviewer => {
      const user = {
        username: reviewer.login || `Team:  ${reviewer.name}`,
        profileUrl: reviewer.html_url,
        avatarUrl: reviewer.avatar_url
      };

      return <UserPhoto size={50} user={user} key={reviewer.id} />;
    });
  }

  render() {
    const pr = this.props.pullRequest;
    const className = getPrClassName(pr);

    return (
      <div className={className}>
        <UserPhoto size={50} user={pr.user} />
        <div className="pull-request-info">
          <div className="pull-request-title">
            <a target="_blank" href={pr.url}>
              #{pr.number}: {pr.title}
            </a>
          </div>
          <div className="pull-request-created" title={this.formatTime('Created', pr.created)}>
            Opened by {pr.user.username} {this.formatRelativeTime(pr.created)}
            <Comments
              comments={pr.comments}
              positiveCommentCount={pr.positiveComments}
              negativeCommentCount={pr.negativeComments}
              reactions={pr.reactions}
            />
          </div>
        </div>
        <div className="meta">
          {this.requestedReviewers(pr)}
          <div
            className="pull-request-last-updated"
            title={this.formatTime('Last updated', pr.updated)}
          >
            {this.formatRelativeTime(pr.updated)}
          </div>
        </div>
      </div>
    );
  }
}

PullRequest.propTypes = {
  pullRequest: PropTypes.object.isRequired
};
