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
        this.state = {
            filterType: '',
            fileType: '',
            isDownload: false,
        }
    }

    onFileTypeChange = ({ target: { value } }) => {
      console.log(value);
    }

    handleSwitchChange = ({ target: { value } }) => {
        let { days = [] } = this.props.Data;
        if (days.includes(value)) {
            days = days.filter(one => one !== value)
        } else {
            days.push(value);
        }
        this.props.manageDays(days);
        this.props.manageSwitchData('');
    }


    toggleTableFilter = (filterType, isDownload) => {
      this.setState({
        filterType,
        isDownload,
      });
    };

    getFilterHeaders = () => {
      let filterHeaderNames = [];
      const { Data: { headers }, table: { pinned = [] } } = this.props;
      const filterHeaders = headers.filter(({ name, value }) => {
        if (name.indexOf(' - ') > -1) {
          const tierType = (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '');
          if (filterHeaderNames.includes(tierType.trim())) return false;
          else filterHeaderNames.push(tierType.trim());
          return true;
        } else filterHeaderNames.push(name); 
        return true;
      });
      return JSON.parse(JSON.stringify(filterHeaderNames).replace(/PT:/g, 'Preferred Tier ').replace(/ST:/g, 'Standard Tier '));
    }

    onDownloadClick() {
      console.log(this);
      this.setState({ isDownload: !this.state.isDownload });
    }

    render() {
        const {
          filterType,
          exHeadersNames, fileType,
          isDownload,
        } = this.state;
        const { Data: { days, order }, table: { pinned = [] } } = this.props;
        const filterHeaderNames = this.getFilterHeaders();
        let filterLeft = filterHeaderNames.map(one=>one);
        filterLeft = filterHeaderNames.length > 10 && filterLeft.splice(0,10);
        let filterRight = filterHeaderNames.map(one=>one);
        filterRight = filterHeaderNames.length > 10 && filterRight.splice(10);
        return (
            <Fragment>
              <PageHeader onSwitchChange={this.handleSwitchChange} days={days} onTableToggle={this.toggleTableFilter} />
              <MaindataContainer>
                <TableContainer>
                  <Table hasPinnedColumns order={order} />
                </TableContainer>
              </MaindataContainer>
              <TableFilter
                filterType={filterType}
                filterLeft={filterLeft}
                filterRight={filterRight}
                handleSwitchChange={this.handleSwitchChange}
                toggleTableFilter={this.toggleTableFilter}
                filterHeaderClick={this.filterHeaderClick}
                pinned={pinned}
                exHeadersNames={exHeadersNames}
                fileType={fileType}
                isDownload={isDownload}
                onFileTypeChange={this.onFileTypeChange}
              />
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