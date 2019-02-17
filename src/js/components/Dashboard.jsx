import React from 'react';
import { connect } from 'react-redux';
import PullRequest from './PullRequest';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Type from './Type';
import UserPhoto from './UserPhoto';
import PropTypes from 'prop-types';

class Main extends React.Component {
  getRepos(pullRequests) {
    return pullRequests.reduce((acc, x) =>
      acc.concat(acc.find(y => y.repo === x.repo) ? [] : [x]), []);
  }

  getPullRequests() {
    if (this.props.pullRequests.length === 0) {
      return (<div className="goodjob">Nice work!</div>);
    }

    const types = this.getRepos(this.props.pullRequests);

    return types.map(type => (
      <div key={type.repo}>
        <Type key={type.repo} pullRequest={type} />

        {this.props.pullRequests.map(pr => {
          if (pr.repo === type.repo) {
            return (
              <PullRequest key={pr.id} pullRequest={pr} />
            );
          }

          return null;
        })}
      </div>
    ));
  }

  requested() {
    // Finds the total number of review requests a person has
    const arr = this.props.pullRequests;
    const users = {};

    arr.map(pull => {
      // If its already approved we dont count it
      if (!pull.mergeable) {
        const reviewers = pull.requested_reviewers.concat(pull.requested_teams);
        reviewers.map(user => {
          const id = user.id;

          if (!users[id]) users[id] = Object.assign({}, user);

          users[id].counter = users[id].counter + 1 || 1;

          return null;
        });
      }

      return null;
    });

    // Then we sort by size
    const ordered = [];
    Object.keys(users).sort((a, b) => {
      const keyA = users[a].counter;
      const keyB = users[b].counter;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    }).forEach(key => {
      ordered.push(users[key]);
    });

    return ordered.map(reviewer => {
      const user = {
        username: reviewer.login || `Team:  ${reviewer.name}`,
        profileUrl: reviewer.html_url,
        avatarUrl: reviewer.avatar_url
      };

      return (
        <div className="reviewer" key={reviewer.id}>
          <UserPhoto size={50} user={user} key={reviewer.id} />
          <p>{user.username}</p>
          <p className="count">{reviewer.counter}</p>
        </div>
      );
    });
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <LoadingOverlay />
      );
    }
    return <div></div>;
  }

  renderFailedRepos() {
    return (
      <div>
        {this.props.failedRepos.map(failedRepo =>
          <ErrorMessage
            key={failedRepo}
            message={`Failed to load pull request data for ${failedRepo}.`}
          />
        )}
      </div>
    );
  }

  renderBody() {
    if (this.props.error) {
      return <ErrorMessage message={this.props.error} />;
    }

    return (
      <div>
        {this.renderFailedRepos()}
        {this.renderLoading()}
        {this.getPullRequests()}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="sidebar">
          <div className="container-header">
            <h1>{this.props.title}</h1>
            <div id="pr-count" title={`${this.props.pullRequests.length} pull requests`}>
              <img role="presentation" src="images/git-pull-request.svg" />
              &nbsp;
            {this.props.pullRequests.length}
            </div>
          </div>
          <div className="container-header">
            <Toolbar failedRepos={this.props.failedRepos} />
          </div>
          <div className="requested">
            {this.requested()}
          </div>
          <Footer />
        </div>

        <div className="main">
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  loading: PropTypes.bool.isRequired,
  pullRequests: PropTypes.array.isRequired,
  repos: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  failedRepos: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired
};

export default connect(state => state)(Main);
