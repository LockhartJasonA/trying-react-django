import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TableNotFound from "./NotFoundViews/TableNotFound";

import './scss/pages.scss'

class TablePage extends Component {

  static propTypes = {
    tables: PropTypes.array
  };

  render() {
    let { tableId } = this.props.match.params;
    let table = this.props.tables.find(table => table.id == tableId);

    if(!table)
      return <TableNotFound/>

    return (
      <div className='table-page-container'>
        <div className='title'>Table Page!</div>
        <div className='content'>
          <div className='name'>
            Table: {table.table_name}
          </div>
          <div className='description'>
            Description: {table.description}
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

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
