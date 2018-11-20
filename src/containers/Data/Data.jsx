import React, {Component} from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import {provideHooks} from '@wicked_query/ultimatejs/lib/redial';
import {load, isLoaded} from '@wicked_query/ultimatejs/lib/redux/store/actions';

registerLanguage('jsx', jsx);

/* eslint-disable */
@provideHooks({
  fetch: ({store: {dispatch, getState}, params, match, history}) => {
    const state = getState();
    const promise = [];
    if (!isLoaded('users', state, {})) {
      promise.push(dispatch(load('users', '/users', {})));
    }

    return Promise.all(promise);
  }
})
class Data extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1>Data fetching</h1>
            <p>
              Fetching data made easy. When changing routes it is possible to fetch data. You can fetch data already on the serverside or choose to only fetch on the client side.
            </p>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {'@provideHooks({\n' +
              '  fetch: ({store: {dispatch, getState}, params, match, history}) => {\n' +
              '    // Load serverside\n' +
              '    const state = getState();\n' +
              '    const promise = [];\n' +
              '    if (!isLoaded(\'users\', state, {})) {\n' +
              '      promise.push(dispatch(load(\'users\', \'/users\', {})));\n' +
              '    }\n' +
              '    return Promise.all(promise);\n' +
              '  },\n' +
              '  defer: ({store: {dispatch, getState}, params, match, history}) => {\n' +
              '    // Load only clientside\n' +
              '  },\n' +
              '  authorize: ({store: {dispatch, getState}, params, match, history}) => {\n' +
              '    // Is the user autorized to visit this route\n' +
              '  }\n' +
              '})\n'}
            </SyntaxHighlighter>
          </Col>
        </Row>

        <h2 className={'mt-5'}>provideHooks</h2>
        <p>
          <code>fetch</code> and <code>defer</code> expect to return a promise.<br />
          <code>authorize</code> must return a boolean. <code>true</code> for authorized, <code>false</code> if the user had no access.
        </p>

        <h3 className={'mt-5'}>fetch<small>({'{store, history, location, match, params, cookies, client}'})</small></h3>
        <p>
          <strong>server</strong>: will wait for all <code>fetch</code> to finish before rendering. The state will passed onto the client.<br />
          <strong>client</strong>: side will not fetch the data again from the server on initial render.
        </p>
        <h3 className={'mt-5'}>defer<small>({'{store, history, location, match, params, cookies, client}'})</small></h3>
        <p>
          <strong>server</strong>: no data will be fetched.<br />
          <strong>client</strong>: data will be fetch on initial render.
        </p>
        <h3 className={'mt-5'}>authorize<small>({'{store, history, location, match, params, cookies, client}'})</small></h3>
        <p>
          Check your current state if the user has access. If not a error is thrown.
          Authorize is called before fetching any data.
        </p>

      </Container>
    );
  }
}

Data.propTypes = {};
Data.defaultProps = {};

export default Data;
