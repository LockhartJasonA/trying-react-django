import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'

import { fetchNodes } from "./Modules/Menu/actions";

import Menu from './Modules/Menu'
import HomePage from "./Modules/Pages/HomePage";
import TablePage from "./Modules/Pages/TablePage";
import ColumnPage from "./Modules/Pages/ColumnPage";

class App extends Component {

  static propTypes = {
    fetchNodes: PropTypes.func,

    isLoading: PropTypes.bool,

    nodes: PropTypes.array,
  };

  componentWillMount() {
    this.props.fetchNodes()
  }

  renderLoading() {
    return (
      <div className="app-container loading">
        Loading...
      </div>
    )
  }

  renderApp() {
    return (
      <div className="app-container">
        <Menu
          nodes={this.props.nodes}
        />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/type/:typeId/node/:nodeId/table/:tableId' component={TablePage} />
          <Route exact path='/type/:typeId/node/:nodeId/table/:tableId/column/:columnId' component={ColumnPage} />
        </Switch>
      </div>
    )
  }

  render() {
    return this.props.isLoading ? this.renderLoading() : this.renderApp();
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchNodes
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    isLoading: state.menu.loadingNodes,
    nodes: state.menu.nodes,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
