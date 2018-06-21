import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { updateFilters } from '../../store/actions/filterActions';

import Checkbox from '../Checkbox';

const availableSizes = [
  '40',
  '41',
  '43',
  'S',
  'G',
  'GG',
  'GGG',
];

class Filter extends Component {

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
  } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  }

  createCheckbox = (label) => (
    <Checkbox
        classes="filters-available-size"
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
    />
  )

  createCheckboxes = () => (
    availableSizes.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="filters">
        <h4 className="title">Tamanhos:</h4>
        {this.createCheckboxes()}
        {/* <StarButton /> */}
      </div>
    );
  }
}

Filter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.array,
}

const mapStateToProps = state => ({
  filters: state.filters.items,
})

export default connect(mapStateToProps, { updateFilters })(Filter);