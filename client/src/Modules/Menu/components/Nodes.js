import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom'

import Tables from "./Nodes/Tables";

import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import DBIcon from "@material-ui/icons/Storage";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

class Nodes extends Component {

  static propTypes = {
    nodeTypeId: PropTypes.number,

    nodes: PropTypes.array
  };

  state = {
    nodesOpen: []
  }

  componentDidMount() {
    let { pathname } = this.props.location
    const match = matchPath(pathname, {
      path: "/type/:typeId/node/:id",
    });
    if(match) {
      let nodeId = parseInt(match.params.id, 10)
      this.setState({nodesOpen: [nodeId]})
    }
  }

  handleClick = (id) => {
    let { nodesOpen } = this.state;
    let index = nodesOpen.indexOf(id)
    if(index === -1) {
      this.setState({
        nodesOpen: [...nodesOpen, id]
      })
    }
    else {
      this.setState({
        nodesOpen: [
          ...nodesOpen.slice(0, index),
          ...nodesOpen.slice(index + 1)
        ]
      })
    }
  }

  render() {
    let { nodesOpen } = this.state;
    let { nodes } = this.props;

    return (
      <List
        className="node-list"
        component="nav"
      >
      {nodes.map(node => {
        let open = nodesOpen.includes(node.id)
        return (
          <div key={`node-${node.id}`}>
            <ListItem
              className="node-list-item"
              button
              onClick={() => this.handleClick(node.id)}
            >
              <ListItemIcon>
                <DBIcon />
              </ListItemIcon>
              <ListItemText primary={node.node_name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open}>
              <Tables
                nodeTypeId={this.props.nodeTypeId}
                nodeId={node.id}
                tables={node.tables}
              />
            </Collapse>
          </div>
        )
        })}
      </List>
    )
  }
}

export default withRouter(Nodes);
