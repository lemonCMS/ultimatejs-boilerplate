import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _get from 'lodash/get';
import _uniq from 'lodash/uniq';
import _map from 'lodash/map';
import _omitBy from 'lodash/omitBy';
import ResourceModel from './ResourceModel';

const listName = [];

@connect((state) => {
  const rest = {};
  _map(listName, list => (rest[list] = _get(state, ['store', list], {})));
  return rest;
})
class Tmp extends React.Component {
  static propTypes = {
    'listName': PropTypes.string,
    'show': PropTypes.bool
  };

  constructor(props) {
    super(props);
    _uniq(listName.push(props.listName));
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || _get(this.props, [this.props.listName]) !== _get(nextProps, [this.props.listName]);
  }

  render() {
    return (<ResourceModel {..._omitBy(this.props, listName)} list={_get(this.props, [this.props.listName])} />);
  }
}

export default Tmp;
