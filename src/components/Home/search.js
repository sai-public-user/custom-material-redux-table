import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as Styles from '../../common/Table/SharedStyles';

const {
	FilterContentBlock,
} = Styles.default;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            county: '',
            organization: '',
            productType: '',
            year: '',
        };
    }

    onSearchApply = () => {
        const data = Object.assign({}, ...this.state);

    }

    onClearClick = () => {
        this.setState({
            searchKey: '',
            county: '',
            organization: '',
            productType: '',
            year: '',
        });
    }

    render() { 
        return (
            <FilterContentBlock>
              <div>data comes here</div>
              <Button variant="contained" onClick={this.onSearchApply} color="primary">Apply</Button>
              <Button variant="contained" color="secondary">Clear</Button>
            </FilterContentBlock>
        );
    }
}
 
export default Search;