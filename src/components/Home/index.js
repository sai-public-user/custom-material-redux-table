import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import * as Styles from '../../common/Table/SharedStyles';

import {
  manageDays,
  manageSwitchData,
} from '../../actions/getAllData';

import PageHeader from './PageHeader';
import Table from '../../common/Table/table';
import TableFilter from './TableFilter';

const {
    MaindataContainer,
    TableContainer,
} = Styles.default;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Fragment>
              <PageHeader />
              <MaindataContainer>
                <TableContainer>
                  <Table hasPinnedColumns />
                </TableContainer>
              </MaindataContainer>
              <TableFilter />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
  Data: state.GetAllData,
  table: state.table,
})

const dispatchToProps = {
  manageDays,
  manageSwitchData,
}
 
export default connect(mapStateToProps, dispatchToProps)(Home);