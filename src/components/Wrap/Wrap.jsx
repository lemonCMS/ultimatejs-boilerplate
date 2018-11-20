import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router';
import {renderRoutes} from 'react-router-config';

class Wrap extends React.Component {
  render() {
    const {route: {routes}} = this.props;
    return (
      <Switch>{renderRoutes(routes)}</Switch>
    );
  }
}

Wrap.propTypes = {
  route: PropTypes.object.isRequired
};
Wrap.defaultProps = {};

export default Wrap;
