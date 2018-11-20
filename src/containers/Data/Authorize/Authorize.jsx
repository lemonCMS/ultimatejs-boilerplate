import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Card from 'react-bootstrap/lib/Card';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Form from '@wicked_query/ultimatejs/lib/final-form/Form';
import Button from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Button';
import Input from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Input';
import Message from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Message';
import {simpleLoad} from '@wicked_query/ultimatejs/lib/redux/store/actions';
import {provideHooks} from '@wicked_query/ultimatejs/lib/redial';
import {authenticate} from '../../../redux/store/auth';

registerLanguage('jsx', jsx);

@provideHooks({
  defer: ({store: {dispatch}, ...rest}) => {
    console.log(rest);
    const promises = [];
    promises.push(dispatch(simpleLoad('randomUser', '/users/random')));
    return Promise.all(promises);
  }
})
@withRouter
@connect(
  state => ({
    auth: state.auth,
    randomUser: state.store.randomUser || {}
  }),
  {authenticate, simpleLoad}
)
class Authorize extends React.Component {
  render() {
    const size = {
      labelSize: {xs: 3},
      fieldSize: {xs: 9}
    };

    const validate = (values) => {
      const errors = {};
      if (!values.username || values.username === '') errors.username = 'The username is mandatory';
      if (!values.password || values.password === '') errors.password = 'The password is Secret1!';
      return errors;
    };

    const onSubmit = async (payload) =>
      (this.props.authenticate(payload).then((ret) => {
          if (ret && Object.prototype.hasOwnProperty.call(ret, 'error')) {
            return (ret.error);
          }
          this.props.history.push('/data/authorize/needstoken');
          return ({});
        }).catch((err) => err)
      );

    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>Authorize</h1>
            <p>
              The child route is protected. When you try to access this you will see an error page.
              SSR will also check if you are authorized. Or else it will also show the error page.
            </p>

            <h2>The works</h2>
            <ol>
              <li>Check if you are <code>authorized</code></li>
              <li>Then get on with the api call in <code>fetch</code> and <code>defer</code> hooks.</li>
              <li>Else replace the component with the error page.</li>
            </ol>


            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {'@provideHooks({\n' +
              '  authorized: ({store: {getState}}) => {\n' +
              '    const state = getState();\n' +
              '    return state.auth.token !== null;\n' +
              '  },\n' +
              '  fetch: ({store: {dispatch, getState}}) => {\n' +
              '    const promise = [];\n' +
              '    const state = getState();\n' +
              '\n' +
              '    if (!isLoaded(state)) {\n' +
              '      promise.push(dispatch(getUser(state.auth.token)));\n' +
              '    }\n' +
              '    return Promise.all(promise);\n' +
              '  }\n' +
              '})'}
            </SyntaxHighlighter>

            <h2 className={'mt-5'}>API</h2>
            <Table>
              <thead>
                <tr>
                  <th>hook</th>
                  <th>return</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>authorized({'{store, history, location, match, params, cookies, client}'})</code></td>
                  <td>boolean</td>
                  <td>
                    The expected result is a <code>boolean</code>. <code>true</code> for authorized, <code>false</code> if not.
                    Check for a certain value exists in the redux state, or a cookie. Check for the validity of the value in the fetch hook.
                  </td>
                </tr>

              </tbody>
            </Table>

            <h2>Demo</h2>
            <p>
              Try to login with the user below. If it does not work refresh the user.
            </p>
            <Table>
              <tbody>
                <tr>
                  <td>username:</td>
                  <td>
                    {this.props.randomUser.email || 'pending'}
                    {' '}
                    <button
                      className={'btn btn-link'}
                      type={'button'}
                      onClick={() => {
                        this.props.simpleLoad('randomUser', '/users/random', {nocache: true});
                      }}
                    >
                      <FontAwesomeIcon icon={['fas', 'sync']}/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>password:</td>
                  <td>Secret1!</td>
                </tr>
              </tbody>
            </Table>

            <Card className={'mt-5'}>
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form
                  debug
                  validate={validate}
                  onSubmit={onSubmit}

                >
                  <Input label="Username" placeholder="email" name={'username'} type={'text'} {...size} />
                  <Input label="Password" placeholder="password" name={'password'} type={'password'} {...size} />

                  <Message type={'error'}>Oopsie, we could not verify your account.</Message>
                  <Message type={'success'}>Welcome, we will redirect you shortly.</Message>
                  <Button type={'submit'}>Send</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Authorize.propTypes = {
  auth: PropTypes.object,
  randomUser: PropTypes.object,
  authorize: PropTypes.func,
  simpleLoad: PropTypes.func,
  history: PropTypes.object
};
Authorize.defaultProps = {
  auth: {},
  randomUser: {}
};

export default Authorize;
