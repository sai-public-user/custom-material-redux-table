import React, { Component, Fragment } from 'react';
import Header from './header';
import Row from './row';
import './table.css';
import * as Styles from '../../common/Table/SharedStyles';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';

const {
    Rows,
    HeaderData,
    CustomTable,
} = Styles.default;

function DialogTable(props) {
    const {
        showCmpDialog,
        closeDialog,
        compareRows,
        compareHeaders,
    } = props;
    return (
        <Dialog open={showCmpDialog} onClose={closeDialog} >
            {
                Array.isArray(compareRows) && compareRows.length > 1 ? (
                    <CustomTable>
                      <HeaderData><Header headers={compareHeaders} noCompare /></HeaderData>
			          <Rows>{ Array.isArray(compareRows) && compareRows.map((row, i) => <Row row={row} key={i} headers={compareHeaders} noCompare />)}</Rows>
                    </CustomTable>
                ) : (<div style={{ padding: '1rem', textAlign: 'center' }}>Minimum 2 Rows are required to compare please check more than 1 row to compare</div>)
            }
        </Dialog>
    );
}

DialogTable.propTypes = {
    showCmpDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    compareRows: PropTypes.array.isRequired,
    compareHeaders: PropTypes.array.isRequired,
}

export default DialogTable;