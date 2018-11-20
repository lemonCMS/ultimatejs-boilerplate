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
  fetch: ({store: {dispatch}}) => {
    const promise = [];
    promise.push(dispatch(load('fetchUsers', 'users', {sleep: 5})));
    return Promise.all(promise);
  }
})
@connect((state) => ({
  fetchUsers: state.store.fetchUsers ? state.store.fetchUsers : {}
}))
class Fetch extends React.Component {

  componentWillUnmount() {
    this.props.dispatch(clearList('fetchUsers'));
  }

  render() {
    const {fetchUsers} = this.props;
    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>Fetching data before route change.</h1>
            <p>
              It will take about 5 seconds before the data is fetched. It will take 5 seconds before the route change will take place. This is because first all data
              serverside has to be fetched before a rendering
            </p>
            <Table>
              <tbody>
                <tr>
                  <th>pending</th>
                  <td>{fetchUsers.pending ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>success</th>
                  <td>{fetchUsers.success ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>failed</th>
                  <td>{fetchUsers.failed ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>total fetched</th>
                  <td>{fetchUsers.list && fetchUsers.list.total ? fetchUsers.list.total : '-'}</td>
                </tr>
              </tbody>
            </Table>

            <DataTable
              records={fetchUsers.list && fetchUsers.list.data ? fetchUsers.list.data : []}
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

Fetch.propTypes = {
  fetchUsers: PropTypes.object,
  dispatch: PropTypes.func,
};
Fetch.defaultProps = {};

export default Fetch;
