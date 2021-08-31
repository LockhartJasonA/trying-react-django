import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
  matchPath,
  Link
} from 'react-router-dom'

import Columns from "./Tables/Columns";

import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import TableIcon from "@material-ui/icons/TableChart";
// import SelectTableIcon from "@material-ui/icons/Shortcut";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import SelectTableSvg from '../../../../Assets/shortcut_black_24dp.svg'

class Tables extends Component {

  static propTypes = {
    nodeTypeId: PropTypes.number,
    nodeId: PropTypes.number,

    tables: PropTypes.array
  };

  state = {
    tablesOpen: []
  }

  componentDidMount() {
    let { pathname } = this.props.location
    const match = matchPath(pathname, {
      path: "/type/:typeId/node/:nodeId/table/:id",
    });
    if(match) {
      let tableId = parseInt(match.params.id, 10)
      this.setState({tablesOpen: [tableId]})
    }
  }

  handleClick = (id) => {
    let { tablesOpen } = this.state;
    let index = tablesOpen.indexOf(id)
    if(index === -1) {
      this.setState({
        tablesOpen: [...tablesOpen, id]
      })
    }
    else {
      this.setState({
        tablesOpen: [
          ...tablesOpen.slice(0, index),
          ...tablesOpen.slice(index + 1)
        ]
      })
    }
  }

  render() {
    let { nodeTypeId, nodeId, tables } = this.props;
    let { tablesOpen } = this.state;

    return (
      <List
        className="table-list"
        component="nav"
      >
        {tables.map(table => {
          let open = tablesOpen.includes(table.id)
          return (
            <div key={`table-${table.id}`}>
              <ListItem
                className="table-list-item"
                button
                onClick={() => this.handleClick(table.id)}
              >
                <ListItemIcon>
                  <TableIcon />
                </ListItemIcon>
                <ListItemText primary={table.table_name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open}>
                <Link
                  className="select-table-button-link"
                  to={`/type/${nodeTypeId}/node/${nodeId}/table/${table.id}`}
                >
                  <ListItem button className="select-table-button">
                    <ListItemIcon>
                      <img
                        className="select-table-icon"
                        src={SelectTableSvg} alt='SVG'
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select This Table" />
                  </ListItem>
                </Link>
                <Columns
                  nodeTypeId={this.props.nodeTypeId}
                  nodeId={this.props.nodeId}
                  tableId={table.id}
                  columns={table.columns}
                />
              </Collapse>
            </div>
          )
        })}
      </List>
    )
  }
}

export default withRouter(Tables);
