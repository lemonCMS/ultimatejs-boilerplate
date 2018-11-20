import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import {connect} from 'react-redux';
import {provideHooks} from "@wicked_query/ultimatejs/lib/redial";
import {getUser, isLoaded} from '../../../../redux/store/auth';

@provideHooks({
  authorized: ({store: {getState}}) => {
    const state = getState();
    return state.auth.token !== null;
  },
  fetch: ({store: {dispatch, getState}}) => {
    const promise = [];
    const state = getState();

    if (!isLoaded(state)) {
      promise.push(dispatch(getUser(state.auth.token)));
    }
    return Promise.all(promise);
  }
})
@connect((state) => ({
  user: state.auth.user || {}
}))
class NeedsToken extends Component {
  render() {
    const rows = () => {
      const {user} = this.props;
      if (user) {
        return Object.keys(user).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{JSON.stringify(user[key])}</td>
          </tr>
        ))
      }
      return null;
    };

    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>Page after authorization</h1>
            <p>
              This page is only accessible after login. When you refresh this page with CTRL+F5 you will have returned
              here
              and the user object is already filled.
            </p>

            <Table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {rows()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

NeedsToken.propTypes = {
  user: PropTypes.object
};
NeedsToken.defaultProps = {
  user: {}
};

export default NeedsToken;
