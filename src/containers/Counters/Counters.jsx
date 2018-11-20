import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Table from 'react-bootstrap/lib/Table';
import {Link} from 'react-router-dom';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';

registerLanguage('jsx', jsx);

const localStorage = require('./LocalStorage.txt');
const cookieStorageServer = require('./CookieSrorageServer.txt');
const cookieStorageClient = require('./CookieStorageClient.txt');

class Counters extends React.Component {
  render() {
    return (
      <Container fluid>
        <div className={'row mt-5'}>
          <div className={'col-md-12'}>
            <h1>Persistent storage</h1>
            <p>
              If you don&apos;t know what redux is, go over <a href="https://redux.js.org/">there</a> and get familiar.
            </p>

            <p>
              There are times you would like to remember the state of your application.<br />
              This can easily done with the <code>PersistComponent</code> package.
            </p>
            <p>
              <code>PersistComponent</code> works on universal apps. because it uses the <code>redux dispatcher</code> with an unique <code>action</code><br />
              you are in control what will be stored and restored.
            </p>

            <h2 className={'mt-5'}>How it works</h2>
            <p>
              <strong>Storing</strong>: Persist component will subscibe onto redux store and listen for changes on the given keys. If any change is detected it will store the state
              in the given storage engine.
            </p>
            <p>
              <strong>restoring data</strong>: Persist component will dispach the action <code>&#x40;&#x40;redux-persist-component/key</code> where <code>key</code>
              {' '}
              is the given name on the persist component.
            </p>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {"<PersistComponent\n" +
              "  storage={localForage}\n" +
              "  modules={['counters']}\n" +
              ">\n" +
              "  <App />\n" +
              "</PersistComponent>"}
            </SyntaxHighlighter>

            <h2 className={'mt-5'}>API</h2>
            <Table striped>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>value</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>storage</code>
                  </td>
                  <td>
                    Object containing <code>setItem</code> and <code>getItem</code> that returns a promise.<br />

                    packages: <a href={'https://www.npmjs.com/package/localforage'}>localforage</a>,
                    <a href={'https://www.npmjs.com/package/redux-persist-cookie-storage'}>redux-persist-cookie-storage</a>
                  </td>
                  <td>
                    Storage engine, where the state whould be saved.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>modules</code>
                  </td>
                  <td>
                    <code>Array</code>([<code>string</code>|<code>object</code>]) containing the redux reducer keys that should be stored and restored.
                  </td>
                  <td>
                    Storage engine, where the state whould be saved.
                  </td>
                </tr>
              </tbody>
            </Table>

            <h5>modules</h5>
            Can contain a  string <code>{"<ReduxStoreComponent modules={['auth']} />"}</code> or can contain an object containing two functions.<br />

            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {"" +
              "{\n" +
              "  save: (state) => (state),\n" +
              "  restore: ({ dispatch, result, currentState }) => {\n" +
              "    if (result !=== currentState) {\n" +
              "       dispatch(restoreState(result))\n;" +
              "    }" +
              "}\n" +
              "}\n" +
              ""}
            </SyntaxHighlighter>

            <code>save</code>: resturn an object that can be parsed with <code>JSON.stringify</code><br />
            <code>restore</code>: within restore dispatch your own action that restores the state.<br />
            --<code>dispatch</code>(): redux dispatcher function<br />
            --<code>result</code>:{'{}'} data retrieved from your storage engine<br />
            --<code>currentState</code>:{'{}'} currentState to check against when you are using an universal app and cookieStorage.<br />



            <h2 className={'mt-5'}>Storage engines</h2>
            <p>Use multiple storage engines simultaneously in your app.</p>

            <h3 className={'mt-5'}><Link to="/counters/local">Local storage</Link></h3>
            <p>
              Use localstorage for state that is not required for loading data on the initial render.<br />
              Localstorage implementation is relative easy, just wrap after <code>Store</code> your application with the <code>PersistCompenent</code>.
              Add the restore action in your reducer and you are done.
            </p>
            <p>
            <code>client.js</code>
            </p>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {localStorage}
            </SyntaxHighlighter>

            <h3 className={'mt-5'}><Link to="/counters/cookie">Cookie storage</Link></h3>
            <p>
              Save data like a auth token in cookie storage so the server is aware of the token and pass it along too you api server.<br />
              Implementing cookie storage is a bit more difficult. Because it requires changes in bot <code>client.js</code> and <code>server.js</code>.
              And because there are np react lifecycles hooks that will wait for async action to resolve we need to add some code our self.
            </p>

            <code>server.js</code>
            <p>
              Here we import <code>persist-component/PersistServer</code> this function returns a promise we wait for this promise to resolve before first render.
            </p>
            <SyntaxHighlighter language={'jsx'} style={prism}>{cookieStorageServer}</SyntaxHighlighter>

            <code>client.js</code>
            <p>
              Here we import <code>persist-component/PersistServer</code> AND <code>persist-component/PersistComponent</code>
              {' '}
              Also on the client we need to &quot;wait&quot; for the cookie storage to be restored before continuing with rendering the page.
            </p>
            <SyntaxHighlighter language={'jsx'} style={prism}>{cookieStorageClient}</SyntaxHighlighter>


          </div>
        </div>
      </Container>
    );
  }
}

Counters.propTypes = {
};
Counters.defaultProps = {};

export default Counters;
