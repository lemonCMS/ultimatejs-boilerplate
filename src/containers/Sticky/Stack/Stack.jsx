import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import Col from 'react-bootstrap/lib/Col';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import Sticky from '@wicked_query/ultimatejs/lib/sticky';

registerLanguage('jsx', jsx);

class Stack extends React.Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      offsetSecond: 0,

    };
  }

  render() {
    return (
      <Container fluid>
        <h1>Sticky stacked example</h1>
        <p>
          In this example there are multiple sticky components that will get stacked.<br />
          This is were we will use the <code>subscribe</code> and <code>offset</code> attribbute.
        </p>
        <h2 className={'mt-5'}>Compenent #1</h2>
        <p>
          In this example there are 3 elements that will be stacked.<br />
          The first component can just be wrapped with the sticky component.
        </p>
        <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
          {'<Sticky>\n' +
          '  <h2>\n' +
          '    Sticky example\n' +
          '  </h2>\n' +
          '</Sticky>'}
        </SyntaxHighlighter>


        <h2 className={'mt-5'}>Compenent #2</h2>
        <p>
          For the second component we will need a offset we would like it to be place right after the first component.<br />
          So we need the height of the first component as offset for the seconden component.<br />
          We need to <code>subscribe</code> to the props of the first component and store them in the <code>this.state</code>
        </p>
        <p>
          <strong>Component #1</strong><br />
          Here we store the height from the first component.
        </p>
        <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
          {'<Sticky subscribe={(props) => (this.setState({offset: props.height}))}>\n' +
          '  <h2>\n' +
          '    Sticky component #1\n' +
          '  </h2>\n' +
          '</Sticky>'}
        </SyntaxHighlighter>
        <p>
          <strong>Component #2</strong><br />
          Here we give the height as offset for the second component.
        </p>
        <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
          {'<Sticky offset={this.state.offset}>\n' +
          '  <h2>\n' +
          '    Sticky component #2\n' +
          '  </h2>\n' +
          '</Sticky>'}
        </SyntaxHighlighter>


        <h2 className={'mt-5'}>Compenent #3</h2>
        <p>For component number 3 we repeat the steps.</p>
        <p>
          <strong>Component #2</strong><br />
          create a <code>offsetSecond</code> from the heights off the first and second component.
        </p>
        <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
          {'<Sticky \n' +
          '  offset={this.state.offset}\n' +
          '  subscribe={(props) => {\n' +
          '    const {offset} = this.state;\n' +
          '    this.setState({offsetSecond: offset + props.height});\n' +
          '    return null\n' +
          '}}>\n' +
          '  <h2>\n' +
          '    Sticky component #1\n' +
          '  </h2>\n' +
          '</Sticky>'}
        </SyntaxHighlighter>
        <p>
          <strong>Component #3</strong><br />
          Here we give the height from the first and second component as offset for the third component.
        </p>
        <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
          {'<Sticky offset={this.state.offsetSecond}>\n' +
          '  <h2>\n' +
          '    Sticky component #3\n' +
          '  </h2>\n' +
          '</Sticky>'}
        </SyntaxHighlighter>
        <Alert variant={'info'} className={'mt-5 mb-5'}>
          Scroll down to see how it all works together.
        </Alert>
        <Row>
          <Col xs={12}>
            <Sticky subscribe={(props) => (this.setState({offset: props.height}))} addClassName={'small'}>
              <h2 style={{backgroundColor: 'silver', padding: 0, margin: 0}}>
                Sticky component #1
              </h2>
            </Sticky>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan massa sit amet augue mollis, at
              finibus magna luctus. Nunc ultricies tincidunt urna vel
              finibus. Cras a nibh et est laoreet euismod ut et risus. Sed maximus nec lacus vel feugiat. Nulla interdum
              libero in orci tempus tempus. Praesent nec ultricies massa,
              quis aliquet dui. Etiam porttitor, nunc id maximus fermentum, felis leo condimentum lorem, eget pulvinar
              nulla lectus vel arcu. In in orci ac nisi dapibus facilisis
              nec
              et dolor. In pulvinar eros ac odio sagittis maximus. Cras pulvinar, sem et cursus commodo, sem velit
              auctor arcu, vel viverra lectus erat et felis. Sed faucibus
              aliquam
              varius. Ut at commodo urna. Ut in vehicula metus. Vestibulum pulvinar vel nisi a pellentesque. Suspendisse
              ullamcorper massa tincidunt turpis commodo aliquet.
              Phasellus a
              elementum leo.
            </p>
            <Sticky offset={this.state.offset} subscribe={(props) => {
              const {offset} = this.state;
              this.setState({offsetSecond: props.height + offset});
              return null
            }}>
              <h2 style={{backgroundColor: 'silver', padding: 0, margin: 0}}>
                Sticky component #2 <code>offset: {this.state.offset}px</code>
              </h2>
            </Sticky>
            <p>
              Morbi interdum viverra mauris, ac laoreet est semper a. Proin ipsum dolor, cursus a nisi id, tempor
              laoreet libero. Cras tempus, diam ut mollis auctor, lectus felis
              imperdiet urna, non pellentesque tortor mi at purus. Nulla consequat rutrum metus, a pulvinar leo
              scelerisque ac. Phasellus quis urna pulvinar, iaculis leo eu, dictum
              nunc. Curabitur et placerat sapien. Curabitur consectetur nibh elementum nulla hendrerit, a sodales quam
              ornare. Sed sit amet est diam. Morbi efficitur leo id ornare
              mattis. Donec tincidunt, ante eget condimentum lacinia, est felis elementum ex, sed tristique felis ligula
              ut sapien. Praesent consequat justo nisi, vitae placerat
              lorem
              consequat nec. Suspendisse in porta dolor.
            </p>
            <p>
              Aliquam lacus enim, laoreet id lacinia convallis, vulputate sed eros. Nunc vitae fringilla ligula. Donec
              vel velit non justo congue dapibus. Curabitur egestas lorem
              turpis, in finibus nulla fermentum ac. Morbi finibus rhoncus congue. Nullam ex quam, iaculis porttitor
              porttitor eget, dictum lacinia magna. Nam nec euismod sem. Sed
              et
              est at urna laoreet fringilla. Pellentesque imperdiet mollis nunc maximus euismod. Interdum et malesuada
              fames ac ante ipsum primis in faucibus. Curabitur urna
              tortor,
              consequat in ipsum a, laoreet accumsan enim. Vivamus sed pellentesque nisi. Mauris maximus condimentum
              nisl vitae malesuada.
            </p>
            <p>
              Etiam quis metus est. Nullam pharetra fringilla massa, et tincidunt ligula. Mauris aliquam arcu quis nunc
              venenatis ornare. Integer sapien orci, porttitor vitae
              fringilla
              id, varius eu felis. Sed quis auctor eros, eu egestas ligula. Aliquam porta dolor libero, sit amet
              ullamcorper ligula tristique id. Mauris sit amet nulla arcu. Nullam
              suscipit vestibulum nisl a ullamcorper. Cras vel lorem sed quam viverra tempus. Quisque varius nulla quis
              leo luctus finibus. Aliquam varius in urna id pharetra.
              Aliquam
              vitae ex massa. Suspendisse finibus rhoncus tellus vitae condimentum.
            </p>
            <p>
              In hac habitasse platea dictumst. Ut consectetur sapien erat, at viverra urna viverra in. Pellentesque
              finibus volutpat dolor. Suspendisse nibh nulla, rhoncus ac
              sapien
              sed, pellentesque placerat urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Vestibulum ac laoreet ipsum, eget gravida
              velit.
              Cras at euismod purus, nec finibus felis. Curabitur sollicitudin nisl quis elementum faucibus. Donec eget
              purus turpis. Maecenas justo metus, aliquam ac commodo in,
              semper eu quam. Proin risus nisi, volutpat vel venenatis porttitor, molestie id urna. Integer lacinia
              pharetra velit id euismod. Sed venenatis, justo sit amet
              volutpat
              lobortis, quam nunc congue lorem, euismod lobortis elit libero quis tortor. Vivamus pulvinar mollis
              tempor. Morbi ac consequat ex. Duis tristique nulla in interdum
              imperdiet.
            </p>
            <Sticky offset={this.state.offsetSecond}>
              <h2 style={{backgroundColor: '#ccc', padding: 0, margin: 0}}>
                Sticky component #3 <code>offset: {this.state.offsetSecond}px</code>
              </h2>
            </Sticky>

            <p>
              Morbi interdum viverra mauris, ac laoreet est semper a. Proin ipsum dolor, cursus a nisi id, tempor
              laoreet libero. Cras tempus, diam ut mollis auctor, lectus felis
              imperdiet urna, non pellentesque tortor mi at purus. Nulla consequat rutrum metus, a pulvinar leo
              scelerisque ac. Phasellus quis urna pulvinar, iaculis leo eu, dictum
              nunc. Curabitur et placerat sapien. Curabitur consectetur nibh elementum nulla hendrerit, a sodales quam
              ornare. Sed sit amet est diam. Morbi efficitur leo id ornare
              mattis. Donec tincidunt, ante eget condimentum lacinia, est felis elementum ex, sed tristique felis ligula
              ut sapien. Praesent consequat justo nisi, vitae placerat
              lorem
              consequat nec. Suspendisse in porta dolor.
            </p>
            <p>
              Aliquam lacus enim, laoreet id lacinia convallis, vulputate sed eros. Nunc vitae fringilla ligula. Donec
              vel velit non justo congue dapibus. Curabitur egestas lorem
              turpis, in finibus nulla fermentum ac. Morbi finibus rhoncus congue. Nullam ex quam, iaculis porttitor
              porttitor eget, dictum lacinia magna. Nam nec euismod sem. Sed
              et
              est at urna laoreet fringilla. Pellentesque imperdiet mollis nunc maximus euismod. Interdum et malesuada
              fames ac ante ipsum primis in faucibus. Curabitur urna
              tortor,
              consequat in ipsum a, laoreet accumsan enim. Vivamus sed pellentesque nisi. Mauris maximus condimentum
              nisl vitae malesuada.
            </p>
            <p>
              Etiam quis metus est. Nullam pharetra fringilla massa, et tincidunt ligula. Mauris aliquam arcu quis nunc
              venenatis ornare. Integer sapien orci, porttitor vitae
              fringilla
              id, varius eu felis. Sed quis auctor eros, eu egestas ligula. Aliquam porta dolor libero, sit amet
              ullamcorper ligula tristique id. Mauris sit amet nulla arcu. Nullam
              suscipit vestibulum nisl a ullamcorper. Cras vel lorem sed quam viverra tempus. Quisque varius nulla quis
              leo luctus finibus. Aliquam varius in urna id pharetra.
              Aliquam
              vitae ex massa. Suspendisse finibus rhoncus tellus vitae condimentum.
            </p>
            <p>
              In hac habitasse platea dictumst. Ut consectetur sapien erat, at viverra urna viverra in. Pellentesque
              finibus volutpat dolor. Suspendisse nibh nulla, rhoncus ac
              sapien
              sed, pellentesque placerat urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Vestibulum ac laoreet ipsum, eget gravida
              velit.
              Cras at euismod purus, nec finibus felis. Curabitur sollicitudin nisl quis elementum faucibus. Donec eget
              purus turpis. Maecenas justo metus, aliquam ac commodo in,
              semper eu quam. Proin risus nisi, volutpat vel venenatis porttitor, molestie id urna. Integer lacinia
              pharetra velit id euismod. Sed venenatis, justo sit amet
              volutpat
              lobortis, quam nunc congue lorem, euismod lobortis elit libero quis tortor. Vivamus pulvinar mollis
              tempor. Morbi ac consequat ex. Duis tristique nulla in interdum
              imperdiet.
            </p>
          </Col>
        </Row>
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

      </Container>
    );
  }
}

Stack.propTypes = {};
Stack.defaultProps = {};

export default Stack;
