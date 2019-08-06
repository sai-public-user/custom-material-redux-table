import React, { Component } from 'react';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';
import PropTypes from 'prop-types';

const {
    Rows,
    HeaderData,
    CustomTable,
} = Styles.default;

class PinnedTable extends Component {

    onScroll = () => {
        this.props.onScroll(this.refs.tbody.scrollTop, 'pinned');
    }
    
    render() {
        const {
            pinnedHeaders,
            sortedCol,
            onCellClick,
            compareClicked,
            hasPinnedColumns,
            pinned,
            pinnedRow,
            isPinned,
            rows,
            checked,
            rowCheckBoxChange,
            checkBoxChange,
            checkBox,
        } = this.props;
        return (
            <div style={{ width: `${(pinnedHeaders.length * 18) + pinnedHeaders.length}%` }}>
                <CustomTable>
                  <HeaderData><Header checkBoxChange={checkBoxChange} checkBox={checkBox} sortedCol={sortedCol} onCellClick={onCellClick} headers={pinnedHeaders} compare={compareClicked} hasPinnedColumns={hasPinnedColumns} pinned={pinned} pinnedRow={pinnedRow} isPinned={isPinned} /></HeaderData>
                </CustomTable>
                <CustomTable>
                  <Rows style={{ overflowY: 'scroll', overflowX: 'hidden' }} ref="tbody" onScroll={this.onScroll}>
                      {Array.isArray(rows) && rows.map((row, i) => <Row checked={checked} pinnedRow pinned={pinned} checkBoxChange={rowCheckBoxChange} row={row} key={i} headers={pinnedHeaders} />)}
                  </Rows>
                </CustomTable>
            </div>
        );
    }
}

PinnedTable.propTypes = {
    pinnedHeaders: PropTypes.array,
    sortedCol: PropTypes.object,
    onCellClick: PropTypes.func,
    compareClicked: PropTypes.func,
    hasPinnedColumns: PropTypes.bool,
    pinned: PropTypes.array,
    pinnedRow: PropTypes.bool,
    isPinned: PropTypes.func,
    rows: PropTypes.array,
    checked: PropTypes.array,
    rowCheckBoxChange: PropTypes.func,
    onScroll: PropTypes.func,
    checkBoxChange: PropTypes.func,
    checkBox: PropTypes.bool,
}
 
export default PinnedTable;