import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import StickyComponent from '@wicked_query/ultimatejs/lib/sticky';

registerLanguage('jsx', jsx);


class Sticky extends React.Component {
  render() {
    return (
      <Container fluid>
        <StickyComponent>
          <h1 style={{backgroundColor: '#fff'}}>Sticky Component</h1>
        </StickyComponent>


        <h2 className={'mt-5'}>Simple implementation</h2>
        <p>
          Just wrap the html tag or a react component with the sticky component.
          <br />
          Scroll this page to see that the header sticks to the top.
        </p>
        <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
        {'<StickyComponent>\n' +
        '  <h1>Sticky Component</h1>\n' +
        '</StickyComponent>'}
        </SyntaxHighlighter>
        <Row>
          <Col xs={12}>

            <h2 className={'mt-5'}>Api</h2>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {'<StickyComponent \n' +
              '  subscribe={(props) => {\n' +
              '    this.setState({offset: props.height});\n' +
              '    return null;\n' +
              '  }\n' +
              '  offset={50}\n' +
              '  addClassName="small"\n' +
              '' +
              '/>'}
            </SyntaxHighlighter>
            <Table size={'sm'} striped>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>offset</code></td>
                  <td>integer | float</td>
                  <td>Add an <code>offset</code> in pixels from the top</td>
                </tr>
                <tr>
                  <td><code>subscride</code></td>
                  <td>function(props)</td>
                  <td>Get the current style properties from the component</td>
                </tr>
                <tr>
                  <td><code>addClassName</code></td>
                  <td>string</td>
                  <td>aAd an <code>className</code> when the component gets sticky</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}

Sticky.propTypes = {};
Sticky.defaultProps = {};

export default Sticky;
