import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'multireducer';
import {increase, decrease} from '../../redux/store/counter';


class CounterItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    counter: PropTypes.number
  };

  static defaultProps = {
    counter: 0
  };

  render() {
    const {counter, index} = this.props;
    return (
      <div className={'col-sm'}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Counter: {counter}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
              cards content.</p>
            <button type={'button'}
              className={'btn'}
              onClick={() => this.props.increase(index)}>+
            </button>
            <button type={'button'}
              className={'btn'}
              onClick={() => this.props.decrease(index)}>-
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const TmpComponent = connect((state, {as, index}) => ({counter: state.counters[as][index]}),
  (dispatch, {as}) => bindActionCreators({increase, decrease}, dispatch, as)
)(CounterItem);


export default TmpComponent
