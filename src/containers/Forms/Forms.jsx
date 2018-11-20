import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router-dom'
import {renderRoutes} from 'react-router-config';
import Container from 'react-bootstrap/lib/Container';

class Forms extends Component {
  render() {
    const {route: {routes}} = this.props;
    return (
      <Container fluid>
        <div className={'row'}>
          <div className="col-md-9">
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </div>
        </div>
      </Container>
    );
  }
}

Forms.propTypes = {
  route: PropTypes.instanceOf(Object).isRequired
};
Forms.defaultProps = {
};

export default Forms;
