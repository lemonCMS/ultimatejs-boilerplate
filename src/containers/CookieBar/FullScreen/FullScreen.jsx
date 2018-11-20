import React, {Component} from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import CookiesJS from 'universal-cookie';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import CookieBar from '@wicked_query/ultimatejs/lib/cookiebar/CookieConsent';
// import '@wicked_query/ultimatejs/lib/cookiebar/Cookiebar.scss';

registerLanguage('jsx', jsx);
// import PropTypes from 'prop-types';

class FullScreen extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1>FullScreen</h1>
            <p>
              <button
                type={'button'}
                className={'btn btn-primary'}
                onClick={() => {
                  const cookies = new CookiesJS();
                  cookies.remove('cookieConsent', {path: '/'});
                  cookies.remove('cookieAccepted', {path: '/'});
                  window.location.reload();
                }}
              >
                clear cookies to try again
              </button>
            </p>


            <p>
              To have the cookie consent open full screen set <code>compact</code> to <code>false</code>.
            </p>

            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {'<CookieBar settings={{\n' +
              '  compact: false\n' +
              '}}/>'}
            </SyntaxHighlighter>
            <Row>
              <Col xs={4}>
                <h5>Level 1</h5>
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    data-gdpr-src={'https://images.pexels.com/photos/1166868/pexels-photo-1166868.jpeg?cs=srgb&dl=active-activity-blur-1166868.jpg&fm=jpg'}
                    data-gdpr-lvl={1}
                    className={'embed-responsive-item'}
                    alt={'woman-wearing-pair-of-black-nike-running-shoes'}
                  />
                </div>
                <h5>Level 2</h5>
                <div className="embed-responsive embed-responsive-4by3">
                  <img
                    data-gdpr-src={'https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?cs=srgb&dl=beach-freedom-friendship-1387037.jpg&fm=jpg'}
                    data-gdpr-lvl={2}
                    className={'embed-responsive-item'}
                    alt={'woman-wearing-pair-of-black-nike-running-shoes'}
                  />
                </div>
                <h5>Level 3</h5>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    title={'linus tech'}
                    width="560"
                    height="315"
                    data-gdpr-lvl="3"
                    data-gdpr-src="https://www.youtube.com/embed/TfBrKaJKRIo"
                    frameBorder="0"
                    className="embed-responsive-item"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <CookieBar settings={{
          compact: false
        }}/>
      </Container>
    );
  }
}

FullScreen.propTypes = {};
FullScreen.defaultProps = {};

export default FullScreen;
