import React from 'react';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faSync} from '@fortawesome/free-solid-svg-icons/faSync';
import {faPlusSquare} from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import {faMinusSquare} from '@fortawesome/free-regular-svg-icons/faMinusSquare';

library.add(
  faPlusSquare,
  faMinusSquare,
  faCheck,
  faMinus,
  faTimes,
  faSync
);

class FontAwesome extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <React.Fragment>{children}</React.Fragment>
    );
  }
}

FontAwesome.propTypes = {
  children: PropTypes.array.isRequired
};
FontAwesome.defaultProps = {};

export default FontAwesome;
