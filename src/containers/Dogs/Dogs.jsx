import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {provideHooks} from '@wicked_query/ultimatejs/lib/redial';
import {simpleLoad} from '@wicked_query/ultimatejs/lib/redux/store/actions';

@provideHooks({
  defer: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(simpleLoad('dog', '/breeds/image/random')));
    return Promise.all(promises);
  }
})
@connect(state => ({
  dog: state.store.dog
}), {simpleLoad})
class Dogs extends React.Component {
  render() {
    const {dog} = this.props;
    return (
      <div>
        Dogs

        <button type={'button'}
          onClick={() => this.props.simpleLoad('dog', '/breeds/image/random')}
        >
          refresh the dog
        </button>
        <p>
          {dog && dog.message && <img src={dog.message} alt={dog.path} />}
        </p>
      </div>
    );
  }
}

Dogs.propTypes = {
  simpleLoad: PropTypes.func,
  dog: PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.string,
  })
};
Dogs.defaultProps = {
  dog: {

  }
};

export default Dogs;
