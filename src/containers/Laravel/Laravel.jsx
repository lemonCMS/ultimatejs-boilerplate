/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/lib/Container';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Table from 'react-bootstrap/lib/Table';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import connectToList from '@wicked_query/ultimatejs/lib/laravel/decorators/connectToList';
import {update, updateListItem} from '@wicked_query/ultimatejs/lib/redux/store/actions';

registerLanguage('jsx', jsx);

@connectToList({
  key: 'users',
  api: '/users',
  path: '/laravel',
  cols: [
    {
      name: 'Status',
      show: 'active',
      filterBy: [
        {desc: 'Active', value: '1'},
        {desc: 'Disabled', value: '0'},
      ],
      translate: {
        false: <FontAwesomeIcon icon={['fas', 'minus']} fixedWidth />,
        true: <FontAwesomeIcon icon={['fas', 'check']} fixedWidth />
      }
    },
    {name: 'ID', show: 'id', order: true},
    {name: 'Name', show: 'name', order: true, edit: true},
    {name: 'Email', show: 'email', order: true, edit: true},
    {name: 'Created', show: 'created_at', filter: 'date', order: true, edit: true},
    {name: 'Change status',
      show: 'active',
      checkbox: (e, record, dispatch) => {
        const data = Object.assign({}, record, {active: e.target.checked});
        dispatch(update('users', '/users', record.id, data));
        dispatch(updateListItem('users', data));
      }
    }
  ]
})

class List extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>Laravel helpers</h1>
            <p>UltimateJs comes with some helpers for laravel. With these helper you can create an admin interface</p>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {'import connectToList from \'@wicked_query/ultimatejs/lib/laravel/decorators/connectToList\';\n' +
              '\n' +
              '@connectToList({\n' +
              '  key: \'users\',\n' +
              '  api: \'/users\',\n' +
              '  path: \'/laravel\',\n' +
              '  cols: [\n' +
              '    {\n' +
              '      name: \'Status\',\n' +
              '      show: \'active\',\n' +
              '      filterBy: [\n' +
              '        {desc: \'Active\', value: \'1\'},\n' +
              '        {desc: \'Disabled\', value: \'0\'},\n' +
              '      ],\n' +
              '      translate: {\n' +
              '        false: <FontAwesomeIcon icon={[\'fas\', \'minus\']} fixedWidth />,\n' +
              '        true: <FontAwesomeIcon icon={[\'fas\', \'check\']} fixedWidth />\n' +
              '      }\n' +
              '    },\n' +
              '    {name: \'ID\', show: \'id\', order: true},\n' +
              '    {name: \'Name\', show: \'name\', order: true, edit: true},\n' +
              '    {name: \'Email\', show: \'email\', order: true, edit: true},\n' +
              '    {name: \'Created\', show: \'created_at\', filter: \'date\', order: true, edit: true},\n' +
              '  ]\n' +
              '})\n' +
              'class List extends Component {\n' +
              '  render() {\n' +
              '    return (this.props.children);\n' +
              '  }\n' +
              '}\n' +
              ''}
            </SyntaxHighlighter>

            <h2 className={'mt-5'}>Api</h2>
            <code>@connectList</code> expects an object containing at least the following configuration<br />
            <SyntaxHighlighter language={'js'} showLineNumbers style={prism}>
              {'{\n' +
              '  key: \'users\',\n' +
              '  api: \'/users\',\n' +
              '  path: \'/laravel\',\n' +
              '  cols: []\n' +
              '}\n'}
            </SyntaxHighlighter>
            <Table className={'mt-5'}>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>key</code></td>
                  <td>string</td>
                  <td>The key under which the response data should be saved in the redux store <code>store</code></td>
                </tr>
                <tr>
                  <td><code>api</code></td>
                  <td>string</td>
                  <td>Path to the resource relative to <code>/api</code> proxy</td>
                </tr>
                <tr>
                  <td><code>path</code></td>
                  <td>string</td>
                  <td>Webbrowser full pathname</td>
                </tr>
                <tr>
                  <td><code>cols</code></td>
                  <td>array</td>
                  <td>Containing the columns you wish to display in what format</td>
                </tr>
              </tbody>
            </Table>
            <h2 className={'mt-5'}><code>cols</code></h2>
            <p>
              Cols is an array constructed of at least the following
            </p>
            <SyntaxHighlighter language={'js'} showLineNumbers style={prism}>
              {'[\n' +
              '  {name: \'Table header\', show: \'column name\'}\n' +
              ']'}
            </SyntaxHighlighter>
            <Table className={'mt-5'}>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>name</code></td>
                  <td>string</td>
                  <td>Table header</td>
                </tr>
                <tr>
                  <td><code>show</code></td>
                  <td>string|array</td>
                  <td>Containing the column name to display or an <code>array</code> of column names.</td>
                </tr>
                <tr>
                  <td><code>filter</code></td>
                  <td><code>'date', 'dateTime', 'numeric', 'unixDate', 'unixDateTime'</code></td>
                  <td>Change how the data is shown</td>
                </tr>
                <tr>
                  <td><code>append</code></td>
                  <td>string</td>
                  <td>Append a string onto the data like a % character.</td>
                </tr>
                <tr>
                  <td><code>order</code></td>
                  <td>boolean</td>
                  <td>Set to true if it is possible to sort on this field.</td>
                </tr>
                <tr>
                  <td><code>edit</code></td>
                  <td>boolen</td>
                  <td>Navigate to the edit page.</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td>
                    <SyntaxHighlighter language={'js'} style={prism}>
                      {'function(record, history) { }'}
                    </SyntaxHighlighter>

                  </td>
                  <td>Callback containing the current record and history object for navigation.</td>
                </tr>
                <tr>
                  <td><code>translate</code></td>
                  <td>
                    <SyntaxHighlighter language={'js'} style={prism}>
                      {'translate: [\n' +
                      ' {valueTranslateFrom: \'valueTranslateTo\'},\n' +
                      ']'}
                    </SyntaxHighlighter>
                  </td>
                  <td>
                    Array of objects containing the value and their corresponding display value. Handy for converting booleans of numerics into user friendly texts.
                    The translation may contain strings as React.Components.
                  </td>
                </tr>
                <tr>
                  <td><code>filterBy</code></td>
                  <td>
                    <SyntaxHighlighter language={'js'} style={prism}>
                      {'filterBy: [\n' +
                      ' {desc: \'Active\', value: \'1\'},\n' +
                      ' {desc: \'Disabled\', value: \'0\'},\n' +
                      ']'}
                    </SyntaxHighlighter>
                  </td>
                  <td>
                    Define the values this field can be filterd on.
                  </td>
                </tr>
                <tr>
                  <td><code>checkbox</code></td>
                  <td>
                    <SyntaxHighlighter language={'js'} style={prism}>
                      {'checkbox: (event, item, dispatch) => { }'}
                    </SyntaxHighlighter>
                  </td>
                  <td>
                    Display an checkbox instead of a value. When clicked you are able to dispatch an action.
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {this.props.children}
          </Col>
        </Row>
      </Container>
    );
  }
}

List.propTypes = {
  children: PropTypes.object
};
List.defaultProps = {};

export default List;
