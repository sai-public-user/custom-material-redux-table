import React from 'react';
import * as Styles from './SharedStyles';
import PropTypes from 'prop-types';

const {
    TableRowCell,
} = Styles.default;

function Cell(props) {
    const { data = null, endPosition = -1, name, title } = props;
    return (
        <TableRowCell title={title} className={`${endPosition > 0 ? ' last_cell' : ''}`} name={name}>
            {data !== null && (data.length > 0 || typeof data === 'number') ? data : '-'}
        </TableRowCell>
    )
}

Cell.propTypes = {
    data: PropTypes.any.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
}

export default Cell;

//${isPinnedVal ? ' pinned_cell' : ''}