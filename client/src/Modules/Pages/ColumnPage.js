import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TableNotFound from "./NotFoundViews/TableNotFound";
import ColumnNotFound from "./NotFoundViews/ColumnNotFound";

import './scss/pages.scss'

class ColumnPage extends Component {

  static propTypes = {
    tables: PropTypes.array
  };

  render() {
    let { tableId, columnId } = this.props.match.params;
    let table = this.props.tables.find(table => table.id == tableId);
    if(!table)
      return <TableNotFound/>

    let column = table.columns.find(column => column.id == columnId);
    if(!column)
      return <ColumnNotFound/>

    return (
      <div className='column-page-container'>
        <div className='title'>Column Page!</div>
        <div className='content'>
          <div className='name'>
            Column: {column.column_name}
          </div>
          <div className='description'>
            Description: {column.description}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch);
}

function mapStateToProps(state) {
  return {
    tables: state.menu.tables
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnPage);
