import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom'

import Nodes from "./components/Nodes";

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse
} from '@material-ui/core'

import InstanceIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './scss/menu.scss'

class Menu extends Component {

  static propTypes = {
    nodes: PropTypes.array
  };

  state = {
    nodeTypesOpen: []
  }

  componentDidMount() {
    let { pathname } = this.props.location
    const match = matchPath(pathname, {
      path: "/type/:id",
    });
    if(match) {
      let nodeTypeId = parseInt(match.params.id, 10)
      this.setState({nodeTypesOpen: [nodeTypeId]})
    }
  }

  handleClick = (id) => {
    let { nodeTypesOpen } = this.state;
    let index = nodeTypesOpen.indexOf(id)
    if(index === -1) {
      this.setState({
        nodeTypesOpen: [...nodeTypesOpen, id]
      })
    }
    else {
      this.setState({
        nodeTypesOpen: [
          ...nodeTypesOpen.slice(0, index),
          ...nodeTypesOpen.slice(index + 1)
        ]
      })
    }
  }

  render() {
    let { nodeTypesOpen } = this.state;
    let { nodes } = this.props;

    return (
      <List
        className="node-types-list"
        component="nav"
      >
        {nodes.map(nodeType => {
          let open = nodeTypesOpen.includes(nodeType.id)
          return (
            <div key={`node-type-${nodeType.id}`}>
              <ListItem
                button
                onClick={() => this.handleClick(nodeType.id)}
              >
                <ListItemIcon>
                  <InstanceIcon />
                </ListItemIcon>
                <ListItemText primary={nodeType.node_type_name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open}>
                <Nodes
                  nodeTypeId={nodeType.id}
                  nodes={nodeType.nodes}
                />
              </Collapse>
            </div>
          )
        })}
      </List>
    )
  }
}

export default withRouter(Menu);
