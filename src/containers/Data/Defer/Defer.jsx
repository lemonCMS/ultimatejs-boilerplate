import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/lib/Container';
import Table from 'react-bootstrap/lib/Table';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';
import {provideHooks} from '@wicked_query/ultimatejs/lib/redial';
import {load, clearList} from '@wicked_query/ultimatejs/lib/redux/store/actions';
import DataTable from '@wicked_query/ultimatejs/lib/laravel/components/DataTable';

@provideHooks({
  defer: ({store: {dispatch}}) => {
    const promise = [];
    promise.push(dispatch(load('deferUsers', 'users', {sleep: 5})));
    return Promise.all(promise);
  }
})
@connect((state) => ({
  deferUsers: state.store.deferUsers ? state.store.deferUsers : {}
}))
class Defer extends React.Component {

  componentWillUnmount() {
    this.props.dispatch(clearList('deferUsers'));
  }

  render() {
    const {deferUsers} = this.props;

    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>Deferred fetching of data.</h1>
            <p>
              It will take about 5 seconds before the data is fetched, because of a server sleep of 5 seconds to demonstrate how it works.
              It will take about 5 seconds before the data is fetched, because of a server sleep of 5 seconds to demonstrate how it works.
            </p>
            <Table>
              <tbody>
                <tr>
                  <th>pending</th>
                  <td>{deferUsers.pending ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>success</th>
                  <td>{deferUsers.success ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>failed</th>
                  <td>{deferUsers.failed ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>total fetched</th>
                  <td>{deferUsers.list && deferUsers.list.total ? deferUsers.list.total : '-'}</td>
                </tr>
              </tbody>
            </Table>

            <DataTable
              records={deferUsers.list && deferUsers.list.data ? deferUsers.list.data : []}
              rows={[
                {
                  cols: [
                    {name: 'ID', show: 'id'},
                    {name: 'Name', show: 'name'}
                  ]
                }
              ]}

            />
          </Col>
        </Row>
      </Container>
    );
  }
}

Defer.propTypes = {
  deferUsers: PropTypes.object,
  dispatch: PropTypes.func
};
Defer.defaultProps = {};

export default Defer;
