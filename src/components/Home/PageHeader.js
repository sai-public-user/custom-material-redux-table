import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Styles from '../../common/Table/SharedStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import {
  manageDays,
  manageSwitchData,
  toggleTableFilter,
} from '../../actions/getAllData';

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
    Header,
    TableFilters,
    SwitchText,
    TableFilterIcon,
} = Styles.default;

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { classes = {}, Data: { days = [] } } = this.props || {};
    return (
      <Header>
          <span><h1>Benefits Structures</h1></span>
          <TableFilters>
              <FormGroup row>
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
                    label={<SwitchText>30 Days</SwitchText>}
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
                    label={<SwitchText>90 Days</SwitchText>}
                  />
              </FormGroup>
              <TableFilterIcon onClick={() => this.props.toggleTableFilter('column', false)}><i className="fa fa-table fa-lg" aria-hidden="true" /></TableFilterIcon>
              <TableFilterIcon onClick={() => this.props.toggleTableFilter('column', true)}><i className="fa fa-download" aria-hidden="true" /></TableFilterIcon>
          </TableFilters>
      </Header>
    );
  }
}
 
const mapStateToProps = (state) => ({
  Data: state.GetAllData,
})

const dispatchToProps = {
  manageDays,
  manageSwitchData,
  toggleTableFilter,
};

export default connect(mapStateToProps, dispatchToProps)(withStyles(styles)(PageHeader));