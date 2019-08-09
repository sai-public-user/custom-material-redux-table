import React, { Fragment } from 'react';
import Cell from './cell';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as Styles from './SharedStyles';
import PropTypes from 'prop-types';

const {
    RowCheckbox,
    FirstCell,
    TableRow,
} = Styles.default;

function Row(props) {
    const {
        row = {}, headers = null , pinned = [],
        checked = [], checkBoxChange, pinnedRow,
        name, noCompare,
    } = props;
    const headerVals = Array.isArray(headers) && headers.map(({ value ='' }, inx) => value) || [];
    return (
        <TableRow>
            {(Array.isArray(pinned) && pinned.length > 0 && pinnedRow) || (!pinnedRow && Array.isArray(pinned) && pinned.length === 0) && !noCompare ? (
              <RowCheckbox>
                  <FirstCell><Checkbox checked={checked.includes(row.id)} onChange={checkBoxChange} name={`${row.id}`} /></FirstCell>
              </RowCheckbox>
            ) : null}
            {row && row !== null && Array.isArray(headerVals) && headerVals.map((keyVal, i) => (
              <Cell data={row[keyVal]} key={i} title={row[keyVal].toString()} isPinnedVal={pinned.includes(keyVal)} name={keyVal} endPosition={ i === 0 || i === headerVals.length - 1 ? i : -1 } />
            ))}
        </TableRow>
    );
}

Row.propTypes = {
    row: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    pinned: PropTypes.array,
    checked: PropTypes.array,
    checkBoxChange: PropTypes.func,
    pinnedRow: PropTypes.bool,
}

export default Row;