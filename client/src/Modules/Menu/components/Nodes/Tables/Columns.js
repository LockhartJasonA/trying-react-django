import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import ColumnIcon from "@material-ui/icons/ViewColumn";

class Columns extends Component {

  static propTypes = {
    nodeTypeId: PropTypes.number,
    nodeId: PropTypes.number,
    tableId: PropTypes.number,

    columns: PropTypes.array
  };

  render() {
    let { nodeTypeId, nodeId, tableId, columns } = this.props;

    return (
      <List
        className="column-list"
        component="nav"
      >
        {columns.map(column => {
          return (
            <Link
              className="column-list-item-link"
              to={`/type/${nodeTypeId}/node/${nodeId}/table/${tableId}/column/${column.id}`}
            >
              <ListItem
                key={`column-${column.id}`}
                className="column-list-item"
                button
              >
                <ListItemIcon>
                  <ColumnIcon />
                </ListItemIcon>
                <ListItemText primary={column.column_name} />
              </ListItem>
            </Link>
          )
        })}
      </List>
    )
  }
}

export default Columns;
