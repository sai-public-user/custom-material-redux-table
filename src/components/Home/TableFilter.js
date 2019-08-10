import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
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
import Button from '@material-ui/core/Button';

import Search from './search';

import {
  updateHeaders,
} from '../../actions/table';

import {
  manageDays,
  manageSwitchData,
  toggleTableFilter,
} from '../../actions/getAllData';

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

class TableFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: '',
      isDownload: false,
    };
  }

  filterHeaderClick = ({ currentTarget } = {}) => {
    let name = currentTarget.getAttribute('name');
    let { excludeHeaders = [], exHeadersNames = [] } = this.props.table;
    let {  days = [], pinned = [] } = this.props.Data;
    if (name !== null) {
      if (name === 'Select All') {
        if (excludeHeaders.includes('select_all')) {
          excludeHeaders = this.getFilterHeaders();
          excludeHeaders = excludeHeaders.map(one => one.toLowerCase().replace(/ /g, '_'));
          exHeadersNames = this.getFilterHeaders();
          days = [];
        } else {
          excludeHeaders = ['select_all'];
          exHeadersNames = ['Select All'];
          // days = [ 'Retail Order', '30 Days', 'Mail Order', '90 Days' ];
        }
        this.props.updateHeaders({ excludeHeaders, exHeadersNames });
        this.props.manageDays(days);
        return this.setState({ excludeHeaders, exHeadersNames, days });
      }
      if (pinned.includes(name.toLowerCase().replace(/ /g,'_'))) return;
      if (exHeadersNames.includes(name)) exHeadersNames = exHeadersNames.filter(one => one !== name);
      else exHeadersNames.push(name.trim());
      if(name.indexOf('Preferred Tier ') > -1) name = name.replace('Preferred Tier ', 'PT:');
      else if(name.indexOf('Standard Tier ') > -1) name = name.replace('Standard Tier ', 'ST:');
      else name = name.toLowerCase().replace(/ /g, '_');
      if (excludeHeaders.includes(name)) excludeHeaders = excludeHeaders.filter(one => one !== name);
      else excludeHeaders.push(name.trim());
      this.props.updateHeaders({ excludeHeaders, exHeadersNames });
      this.setState({ excludeHeaders, exHeadersNames });
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
      classes = {},
      fileType,
    } = this.props || {};

    const { exHeadersNames = [] } = this.props.table;

    const { Data: { days, order, isDownload, filterType }, table: { pinned = [] } } = this.props;
    const filterHeaderNames = this.getFilterHeaders();
    let filterLeft = filterHeaderNames.map(one=>one);
    filterLeft = filterHeaderNames.length > 10 && filterLeft.splice(0,10);
    let filterRight = filterHeaderNames.map(one=>one);
    filterRight = filterHeaderNames.length > 10 && filterRight.splice(10);

    return (
      <SwipeableDrawer
        anchor="right"
        open={filterType !== ''}
        onClose={() => this.props.toggleTableFilter('')}
      >
        <FilterContent>
          {filterType === 'column' && (
            <FilterContentBlock>
              {isDownload && (
                <SelectFileType>
                  <Select
                    value={fileType}
                    onChange={this.onFileTypeChange}
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
                </SelectFileType>
              )}
              <FormGroup row>
                <FormGroup column>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={days.includes("30 Days")}
                          onChange={this.handleSwitchChange}
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
                          onChange={this.handleSwitchChange}
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
                          onChange={this.handleSwitchChange}
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
                          onChange={this.handleSwitchChange}
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
                      <FilterCell name="Select All" onClick={this.filterHeaderClick}>
                        <div>{!exHeadersNames.includes('Select All') ? 'Select All' : 'Deselect All'}</div>
                      </FilterCell>
                      {Array.isArray(filterLeft) && filterLeft.map(name =>
                        <FilterCell name={name} onClick={this.filterHeaderClick} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
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
                      <FilterCell name={`${Array.isArray(days) && days.length < 2 ? null : name}`} onClick={this.filterHeaderClick} className={`${Array.isArray(days) && days.length < 2 ? 'disabled' : ''}`} style={{ color: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '#777': 'black'}`, cursor: `${pinned.includes(name.toLowerCase().replace(/ /g,'_')) ? '' : 'pointer'}` }}>
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
          {isDownload && (
            <Fragment>
              <Button variant="contained" color="primary">Export</Button>
              <Button variant="contained" color="secondary">Cancel</Button>
            </Fragment>
          )}
          {filterType === 'search' && (
            <Search />
          )}
        </FilterContent>
      </SwipeableDrawer>
    );
  }
}

const mapStateToProps = (state) => ({
  Data: state.GetAllData,
  table: state.table,
})

const dispatchToProps = {
  updateHeaders,
  manageDays,
  manageSwitchData,
  toggleTableFilter,
};

export default connect(mapStateToProps, dispatchToProps) (withStyles(styles)(TableFilter));
