import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { refresh, loadPullRequests } from '../actions';
import RefreshButton from './RefreshButton';
import SettingsButton from './SettingsButton';
import AutoRefreshControl from './AutoRefreshControl';
import FilterRepoDropdown from './FilterRepoDropdown';
// import SortControl from './SortControl';

class Toolbar extends React.Component {

  renderFilterRepoDropdown() {
    return (
      <FilterRepoDropdown
        onRefresh={this.props.refresh}
        failedRepos={this.props.failedRepos}
        allRepos={this.props.repos}
      />
    );
  }
  render() {
    return (
      <div id="toolbar">
        <SettingsButton />
        <RefreshButton onRefresh={this.props.refresh} />
        <AutoRefreshControl onRefresh={this.props.refresh} />
        {/* <SortControl /> */}
      </div>
    );
  }
}

Toolbar.propTypes = {
  refresh: PropTypes.func.isRequired,
  failedRepos: PropTypes.array.isRequired,
  repos: PropTypes.array.isRequired
};

function mapStateToProps(state) { return state; }

function mapDispatchToProps(dispatch) {
  return {
    refresh: () => {
      dispatch(refresh());
      dispatch(loadPullRequests());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
