import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';
import PropTypes from 'prop-types';

import PinnedTable from './PinnedTable';
import DialogTable from './DialogTable';

import {
    updatePinned,
    updateHeaders,
} from '../../actions/table';

const {
    Rows,
    HeaderData,
    CustomTable,
} = Styles.default;

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headers: [],
            rows: [],
            pinned: [],
			checked: [],
            maxPinnedcols: 5,
            pinnedHeaders: [],
            compareLimit: 5,
            compareRows: [],
            showCmpDialog: false,
            sortedCol: {},
            headerCheck: false,
        };
    }

    componentDidMount() {
        const { headers, rows } = this.props.Data;
        this.setState({ headers, rows });
    }

    isPinned = (e) => {
        const { maxPinnedcols, headers } = this.state;
        const { pinned = [] } = this.props.table;
        let newPinned = pinned.map(o => o);
        const name = e.currentTarget.getAttribute('name');
        if (newPinned.includes(name)) {
            newPinned = newPinned.filter(one => one != name)
        } else {
            newPinned.push(name);
        }
        if (Array.isArray(newPinned) && newPinned.length > maxPinnedcols) return;
        this.setState({ pinned: newPinned }, () => {
            const pinnedHeaders = Array.isArray(newPinned) && headers.filter(one => newPinned.includes(one.value));
            this.props.updatePinned([...newPinned]);
            this.setState({ pinnedHeaders });
        });
    }

    rowCheckBoxChange = ({ target: { name = "" } = {} }) => {
        let { checked = [], compareLimit = 2 } = this.state;
        if (checked.includes(Number(name))) {
            checked = checked.filter(one => one != Number(name))
        } else {
            checked.push(Number(name));
        }
        if( checked.length > compareLimit ) return;
        this.setState({ checked });
    }

    getHeaders = () => {
        const { days, order, headers: tableCols } = this.props.Data;
        const { pinned = [], excludeHeaders: exclude } = this.props.table;
        if(tableCols.length > 0) {
            const headers = tableCols.filter(({ name, value }) => {
				if (Array.isArray(pinned) && pinned.includes(value)) return false;
                const valueData = name.indexOf(' - ') > -1 ? name.split(' - ')[0] : value;
                const tier = Array.isArray(name.split(' - ')) && name.split(' - ').length > 1 ? (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '').trim() : '';
                const valueIfDays = name.replace(valueData, '').length > 0 ? name.replace(valueData, '').replace(tier,'').replace('-','').trim() : name;
                if(Array.isArray(exclude) && exclude.includes(name.indexOf(' - ') > -1 ? (name.split(' - ')[1]).replace('30 Days', '').replace('90 Days', '').trim() : value)) return false;
                if (Array.isArray(days) && days.includes(valueIfDays) && days.includes(valueData)) {
                    return name.indexOf(order) > -1;
                } else if(name.indexOf('Days') === -1) return true;
            });
            return headers;
        }
    }

    compareClicked = () => {
        const { checked, rows } = this.state;
        const compareRows = rows.filter(({ id }) => checked.includes(id));
        this.setState({ compareRows, showCmpDialog: true })
    }

    sortOrder = (row1, row2, type, value) => {
        if (type === 'asc') {
            if (row1[value] < row2[value]) return -1;
            else if(row1[value] > row2[value]) return 1;
            return 0;
        }
        else {
            if (row1[value] > row2[value]) return -1;
            else if(row1[value] < row2[value]) return 1;
            return 0;
        }
    }

    onCellClick = (value, { target }) => {
        const name = target.getAttribute('name');
        if (name === 'pin_value') return;
        let { sortedCol = {}, rows } = this.state;
        if (sortedCol && Object.keys(sortedCol).length > 0 && !sortedCol.hasOwnProperty(value)) sortedCol = {};
        if (sortedCol.hasOwnProperty(value) && sortedCol[value] === 'asc') sortedCol[value] = 'desc'
        else sortedCol[value] = 'asc';
        rows.sort((row1, row2) => this.sortOrder(row1, row2, sortedCol[value], value));
        this.setState({ sortedCol, rows });
    }

    closeDialog = () => this.setState({ showCmpDialog: false });

    scrollInterval = 0;
    scrollTable = '';

    scrolled = (scrollTop, name) => {
        let scrollVal = scrollTop;
        if(this.scrollInterval < (Date.now() - 150)) {
            this.scrollInterval = Date.now();
            this.scrollTable = name;
        }
        if(this.scrollTable === 'main' && this.refs.pinned) 
        this.refs.pinned.refs.tbody.scrollTo(0, scrollVal);
        if (this.scrollTable === 'pinned')
        this.refs.tbody.scrollTo(0, scrollVal); //.scrollTop = scrollVal;
    }

    headerCheckBoxChange = (e) => {
        let { headerCheck = false } = this.state;
        const { rows } = this.state;
        let checked = [];
        headerCheck =  !headerCheck;
        if (headerCheck === false) {
            return this.setState({ headerCheck, checked });
        }
        checked = rows.map((_, i) => i);
        this.setState({ headerCheck, checked });
    }

    render() {
        const {
            pinned,
            rows, checked,
            pinnedHeaders,
            compareRows,
            showCmpDialog,
            sortedCol,
            headerCheck,
        } = this.state;
        const { hasPinnedColumns } = this.props;
        const filteredHeaders = this.getHeaders();
        const compareHeaders = Array.isArray(filteredHeaders) && Array.isArray(pinnedHeaders) ? filteredHeaders.concat(pinnedHeaders) : [];
        return (
            <Fragment>
                {hasPinnedColumns && pinnedHeaders.length > 0 && (
                    <PinnedTable
                        pinnedHeaders={pinnedHeaders}
                        sortedCol={sortedCol}
                        onCellClick={this.onCellClick}
                        compareClicked={this.compareClicked}
                        hasPinnedColumns
                        pinned={pinned}
                        pinnedRow
                        isPinned={this.isPinned}
                        rows={rows}
                        checked={checked}
                        rowCheckBoxChange={this.rowCheckBoxChange}
                        onScroll={this.scrolled}
                        checkBoxChange={this.headerCheckBoxChange}
                        checkBox={headerCheck}
                        ref="pinned"
                    />)}
                <div style={{ width: `${100 - (pinnedHeaders.length * 18 + pinnedHeaders.length)}%`, overflowX: 'scroll', overflowY: 'hidden', position: 'relative' }}>
                    <Fragment className="table-head">
                        <CustomTable>
                            <HeaderData>
                                <Header sortedCol={sortedCol} checkBoxChange={this.headerCheckBoxChange} checkBox={headerCheck} onCellClick={this.onCellClick} headers={filteredHeaders} compare={this.compareClicked} hasPinnedColumns pinned={pinned} isPinned={this.isPinned} />
                            </HeaderData>
                        </CustomTable>
                    </Fragment>
                    <Fragment className="table-body">
                        <CustomTable>
                            <Rows style={{ overflowX: 'visible', overflowY: 'scroll' }} ref="tbody" onScroll={() => this.scrolled(this.refs.tbody.scrollTop, 'main')}>
                                {Array.isArray(rows) && rows.map(
                                    (row, i) => <Row checked={checked} checkBoxChange={this.rowCheckBoxChange} row={row} key={i} headers={filteredHeaders} pinned={pinned} />
                                )}
                            </Rows>
			            </CustomTable>
                    </Fragment>
                </div>
                <DialogTable
                    showCmpDialog={showCmpDialog}
                    closeDialog={this.closeDialog}
                    compareRows={compareRows}
                    compareHeaders={compareHeaders}
                />
            </Fragment>
        );
    }
}

Table.propTypes = {
    days: PropTypes.array,
    hasPinnedColumns: PropTypes.bool,
    Data: PropTypes.array.isRequired,
    order: PropTypes.any,
    exclude: PropTypes.array,
}
 
const mapStateToProps = (state) => ({
    Data: state.GetAllData,
    table: state.table,
})

const dispatchToProps = {
    updatePinned,
    updateHeaders
};

export default connect(mapStateToProps, dispatchToProps)(Table);