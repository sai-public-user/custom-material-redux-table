import React, { Fragment } from 'react';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import * as Styles from './SharedStyles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const {
    TableHeader,
    Headername,
    CompareIcon,
    HeaderCell,
    HeaderPin,
    HeaderParent,
    SortIcon,
} = Styles.default;

const windowRestorSvg = (compare) => (
    <svg onClick={compare} viewBox="0 0 512 512" width="20" fill="white"><path d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM32 144c0-8.8 7.2-16 16-16h320c8.8 0 16 7.2 16 16v80H32v-80zm352 320c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256h352v208zm96-96c0 8.8-7.2 16-16 16h-48V144c0-26.5-21.5-48-48-48H128V48c0-8.8 7.2-16 16-16h320c8.8 0 16 7.2 16 16v320z"/></svg>
)

function Header(props) {
    const {
        pinned = [], headers = [],
        isPinned, hasPinnedColumns,
        pinnedRow, compare, sortedCol,
        onCellClick, noCompare,
        checkBoxChange, checkBox,
    } = props;
    return (
        <TableHeader>
            {
                (Array.isArray(pinned) && pinned.length > 0 && pinnedRow) ||
                (!pinnedRow && Array.isArray(pinned) && pinned.length === 0) && !noCompare ? 
                (
                    <Fragment>
                        {/* {checkBoxChange && checkBox !== undefined ? (<Checkbox name="allrows" onChange={checkBoxChange} value={checkBox} />) : null} */}
                        <CompareIcon>{windowRestorSvg(compare)}</CompareIcon>
                    </Fragment>
                ) : null
            }
            {headers.map(col => {
                const { name = '', value = '' } = col;
                console.log(hasPinnedColumns);
                return (
                    <HeaderCell key={value} name={name} onClick={(e) => onCellClick ? onCellClick(value, e) : null}>
                        {name.indexOf('Mail Order') !== -1 || name.indexOf('Retail Order') !== -1 ? (
                            <Headername>
                                <HeaderParent>{name.replace(' 30 Days', '').replace(' 90 Days', '')}</HeaderParent>
                                <hr />
                                <div>{name.indexOf('30 Days') > -1 ? '30 Days' : '90 Days'}</div>
                                </Headername>
                            ) : null
                        }
                        {name.indexOf('Mail Order') === -1 && name.indexOf('Retail Order') === -1 && (<Headername>{name}</Headername>)}
                        {hasPinnedColumns && (<HeaderPin className={`${pinned.includes(value) ? 'text-info' : ''}`} name={value} onClick={isPinned}><i className="fa fa-thumb-tack" name="pin_value" aria-hidden="true" /></HeaderPin>)}
                        {sortedCol && sortedCol[value] && <SortIcon name={value}>{(sortedCol[value] === 'asc' ? <i className="fa fa-arrow-up" /> : <i className="fa fa-arrow-down" />)}</SortIcon>}
                    </HeaderCell>
                );
            })}
        </TableHeader>
    );
}

Header.propTypes = {
    sortedCol: PropTypes.object,
    onCellClick: PropTypes.func,
    headers: PropTypes.array.isRequired,
    compare: PropTypes.func,
    hasPinnedColumns: PropTypes.bool,
    pinned: PropTypes.array,
    isPinned: PropTypes.bool,
    checkBoxChange: PropTypes.func,
    checkBox: PropTypes.bool,
}

export default Header;