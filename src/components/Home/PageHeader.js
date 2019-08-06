import React from 'react';
import * as Styles from '../../common/Table/SharedStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

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


function PageHeader(props) {
    const { classes = {} } = props || {};
    return (
        <Header>
            <span><h1>Benefits Structures</h1></span>
            <TableFilters>
                <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={props.days.includes("30 Days")}
                          onChange={props.onSwitchChange}
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
                          checked={props.days.includes("90 Days")}
                          onChange={props.onSwitchChange}
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
                <TableFilterIcon onClick={() => props.onTableToggle('column', false)}><i class="fa fa-table fa-lg" aria-hidden="true" /></TableFilterIcon>
                <TableFilterIcon onClick={() => props.onTableToggle('column', true)}><i class="fa fa-download" aria-hidden="true" /></TableFilterIcon>
            </TableFilters>
        </Header>
    )
}

export default withStyles(styles)(PageHeader);