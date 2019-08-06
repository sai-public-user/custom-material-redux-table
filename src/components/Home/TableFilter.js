import React, { Fragment } from 'react';
import * as Styles from '../../common/Table/SharedStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
	colorSwitchBase: {
		color: '#0cb1c3',
		'&$colorChecked': {
			color: '#0cc324',
			'& + $colorBar': {
				backgroundColor: '#ffffff',
			},
		},
	},
	colorBar: {},
	colorChecked: {},
});

const {
	FilterContent,
	FilterContentBlock,
	FilterCell,
	FilterHeaderPaper,
	SwitchDrawerText,
  HeaderCheck,
  FilterFileType,
  SelectFileType,
} = Styles.default;

function TableFilter(props) {
	const {
		classes = {},
		filterType,
		toggleTableFilter,
		days,
		handleSwitchChange,
		filterLeft,
		filterRight,
		filterHeaderClick,
		pinned,
    exHeadersNames,
    fileType,
    onFileTypeChange,
    isDownload = false,
	} = props || {};
    return (
      <SwipeableDrawer
        anchor="right"
        open={filterType !== ''}
        onClose={() => toggleTableFilter('')}
      >
        <FilterContent>
          {filterType === 'column' && (
            <FilterContentBlock>
              {isDownload && (<SelectFileType>
                <Select
                  value={fileType}
                  onChange={onFileTypeChange}
                  input={<BootstrapInput name="fileType" id="file-customized-select" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="EXCEL">
                    <FilterFileType>
                      <div>EXCEL</div>
                      <HeaderCheck><i className="fa fa-check" aria-hidden="true" /></HeaderCheck>
                    </FilterFileType>
                  </MenuItem>
                  <MenuItem value="CSV">
                    <FilterFileType>
                      <div>CSV</div>
                      <HeaderCheck><i className="fa fa-check" aria-hidden="true" /></HeaderCheck>
                    </FilterFileType>
                  </MenuItem>
                </Select>
              </SelectFileType>)}
              <FormGroup row>
                <FormGroup column>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={days.includes("30 Days")}
                          onChange={handleSwitchChange}
                          value="30 Days"
                          classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar,
                          }}
                        />
                      }
                      label={<SwitchDrawerText>30 Days</SwitchDrawerText>}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={days.includes("90 Days")}
                          onChange={handleSwitchChange}
                          value="90 Days"
                          classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar,
                          }}
                        />
                      }
                      label={<SwitchDrawerText>90 Days</SwitchDrawerText>}
                    />
                </FormGroup>
                <FormGroup column>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={days.includes("Mail Order")}
                          onChange={handleSwitchChange}
                          value="Mail Order"
                          classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar,
                          }}
                        />
                      }
                      label={<SwitchDrawerText>Mail Order</SwitchDrawerText>}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={days.includes("Retail Order")}
                          onChange={handleSwitchChange}
                          value="Retail Order"
                          classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar,
                          }}
                        />
                      }
                      label={<SwitchDrawerText>Retail</SwitchDrawerText>}
                    />
                </FormGroup>
              </FormGroup>
              <b>Table Columns Selection</b>
              <FilterHeaderPaper>
                <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                  {
                    <Fragment>
                      <FilterCell name="Select All" onClick={filterHeaderClick}>
                        <div>{!exHeadersNames.includes('Select All') ? 'Select All' : 'Deselect All'}</div>
                      </FilterCell>
                      {Array.isArray(filterLeft) && filterLeft.map(name =>
                        <FilterCell name={name} onClick={filterHeaderClick} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
                          <div>{name}</div>
                          {!exHeadersNames.includes(name) &&
                          <HeaderCheck>
                            <i className="fa fa-check" aria-hidden="true" />
                          </HeaderCheck>}
                        </FilterCell>
                      )}
                    </Fragment>
                  }
                </Paper>
                <Paper style={{ padding: '0.5rem', marginTop: 10, width: '15.5vw' }}>
                  {
                    Array.isArray(filterRight) && filterRight.map(name => 
                      <FilterCell name={`${Array.isArray(days) && days.length < 2 ? null : name}`} onClick={filterHeaderClick} className={`${Array.isArray(days) && days.length < 2 ? 'disabled' : ''}`} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
                        <div>{name}</div>
                          {!exHeadersNames.includes(name) && (Array.isArray(days) && days.length >= 2) &&
                          <HeaderCheck>
                            <i className="fa fa-check" aria-hidden="true" />
                          </HeaderCheck>}
                      </FilterCell>
                    )
                  }
                </Paper>
              </FilterHeaderPaper>
            </FilterContentBlock>
          )}
          {filterType === 'search' && (
            <FilterContentBlock>
              data comes here
            </FilterContentBlock>
          )}
        </FilterContent>
      </SwipeableDrawer>
    );
}

export default withStyles(styles)(TableFilter);