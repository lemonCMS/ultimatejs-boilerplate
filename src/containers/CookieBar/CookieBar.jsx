import React, {Component} from 'react';
import CookiesJS from 'universal-cookie';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import CookieBar from '@wicked_query/ultimatejs/lib/cookiebar/CookieConsent';
// import '@wicked_query/ultimatejs//cookiebar/Cookiebar.scss';

registerLanguage('jsx', jsx);



class CookieBarPage extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1>Cookie Consent</h1>
            <p>
              In order to apply to the GDPR almost all websites need to have some kind of cookie consent before setting any, but functional, cookies.
            </p>
            <p>
              With this <code>Cookiebar</code> package you can easily implement cookie consent into your website with minor changes in your code.
            </p>

            <h2 className={'mt-5'}>Implementation in NON React website</h2>
            <p>
              Add the following code just before your closing <code>body</code> tag. Make shure to point to the right directory where the files are downloaded.
            </p>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {"<div id=\"reactContent\"></div>\n" +
              "<script type=\"text/javascript\" src=\"/gdpr/settings.js\"></script>\n" +
              "<script type=\"text/javascript\" src=\"/gdpr/gdpr.js\"></script>\n" +
              ""}
            </SyntaxHighlighter>

            <h2 className={'mt-5'}>Implementation in React application</h2>
            <p>
              Just add the Cookiebar component in your root of your application.
            </p>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {"<Cookiebar settings={{}} />"}
            </SyntaxHighlighter>
            <h2 className={'mt-5'}>Settings</h2>
            The following settings can be changed.

            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>reload</code></td>
                  <td>bool(false)</td>
                  <td>Force a full page reload after setting consent level.</td>
                </tr>
                <tr>
                  <td><code>ignoreUserAgent</code></td>
                  <td>Regular expression</td>
                  <td>Disabling the cookiebar for certain userAgents like google bots.</td>
                </tr>
                <tr>
                  <td><code>whiteList</code></td>
                  <td>Regular expression</td>
                  <td>Disabling the cookiebar for certain pages.</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td>string</td>
                  <td>Title cookie modal.</td>
                </tr>
                <tr>
                  <td><code>intro</code></td>
                  <td>string</td>
                  <td>Description in cookie modal.</td>
                </tr>
                <tr>
                  <td><code>compact</code></td>
                  <td>boole(true)</td>
                  <td>Descrioption in cookie modal.</td>
                </tr>
                <tr>
                  <td><code>cookieBar</code></td>
                  <td>null | string</td>
                  <td>When defined the cookiebar will be displayed as compact thus not page blocking.</td>
                </tr>
                <tr>
                  <td><code>button</code></td>
                  <td>string</td>
                  <td>content button accept</td>
                </tr>
                <tr>
                  <td><code>buttonCancel</code></td>
                  <td>null | string</td>
                  <td>content to cancel / close modal</td>
                </tr>
                <tr>
                  <td><code>buttonSettings</code></td>
                  <td>null | string</td>
                  <td>Displaying the setting buttin in compact mode.</td>
                </tr>
                <tr>
                  <td><code>level1</code></td>
                  <td>string</td>
                  <td>Explaining content of this level</td>
                </tr>
                <tr>
                  <td><code>level2</code></td>
                  <td>string</td>
                  <td>Explaining content of this level</td>
                </tr>
                <tr>
                  <td><code>level3</code></td>
                  <td>string</td>
                  <td>Explaining content of this level</td>
                </tr>
                <tr>
                  <td><code>iFrameBlob</code></td>
                  <td>blob</td>
                  <td>Containing data for the replacement of resources that need consent.</td>
                </tr>
              </tbody>
            </Table>
            <h3 className={'mt-2'}>Example default settings</h3>
            <SyntaxHighlighter language={'jsx'} showLineNumbers style={prism}>
              {"var reactGpdrSettings = {\n" +
              "  reload: false,\n" +
              "  ignoreUserAgent: /bot|googlebot|crawler|spider|robot|crawling|page speed/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : 'xxxx'),\n" +
              "  whitelist: /privacy/i.test(typeof window !== 'undefined' ? window.location.href : 'xxxx'),\n" +
              "  title: 'Deze website gebruikt cookies',\n" +
              "  intro: 'Daarmee zorgen we dat de website werkt en je kunt inloggen. Selecteer één van de drie opties en klik op\\n' +\n" +
              "  '                &#39;Accepteren&#39;. Bekijk onze <a href=\"/privacy\">privacy- en cookieverklaring</a>',\n" +
              "  button: 'Accepteren',\n" +
              "  buttonCancel: null,\n" +
              "  compact: true,\n" +
              "  cookieBar: 'Deze website gebruikt cookies standaard alleen o.b.v. anonieme verwerking. <a href=\"/privacy\">Lees de privacy- en cookieverklaring</a>',\n" +
              "  buttonSettings: 'Instellingen',\n" +
              "  level1: '<h4>Strikt:</h4> Cookies zonder video&#39;s en zonder aanbiedingen. Deze zijn nodig om onze website te kunnen bezoeken en\\n' +\n" +
              "  '                in te kunnen loggen. Je bezoek en gegevens worden niet bijgehouden.',\n" +
              "  level2: '<h4>Statistieken:</h4> Cookies met video&#39;s maar zonder aanbiedingen. Met deze cookies kun je de website bezoeken,\\n' +\n" +
              "  '                inloggen en video&#39;s bekijken. Je bezoek en gegevens worden bijgehouden.',\n" +
              "  level3: '<h4>Extern:</h4> Cookies met video&#39;s en aanbiedingen. Met deze cookies werkt de website optimaal. Je bezoek wordt\\n' +\n" +
              "  '                bijgehouden zodat we onze website kunnen verbeteren en je aanbiedingen kunnen doen.',\n" +
              "  iFrameBlob: ReactDomServer.renderToStaticMarkup(<BlockResource />)\n" +
              "}"}
            </SyntaxHighlighter>

            <h2 className={'mt-5'}>Making your website compliant</h2>

            <p>Because of the GDPR you are not allowed to set tracking cookies or start tracking before having constent from the user.</p>
            <p>This means in most cases that we need to postpone the loading of certain script, embed, iframes and even images from external sites that sets cookies.</p>
            <h3>Let say you embed a video from youtube</h3>
            <SyntaxHighlighter language={'html'} showLineNumbers style={prism}>
              {"<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TfBrKaJKRIo\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"}
            </SyntaxHighlighter>

            <p>
              Change the <code>src</code> attribute into <code>data-gdpr-src</code> and add <code>data-gdpr-lvl</code> probably level 3. When a user accepts your cookies level 3. then the youtube content will be shown.
            </p>

            <SyntaxHighlighter language={'html'} showLineNumbers style={prism}>
              {"<iframe width=\"560\" height=\"315\" data-gdpr-lvl=\"3\" data-gdpr-src=\"https://www.youtube.com/embed/TfBrKaJKRIo\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"}
            </SyntaxHighlighter>


            <h3 className={'mt-5'}>Live example</h3>
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


            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title={'linus tech'}
                width="560"
                height="315"
                data-gdpr-lvl="3"
                data-gdpr-src="https://www.youtube.com/embed/TfBrKaJKRIo"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
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
        <CookieBar />
      </Container>
    );
  }
}

CookieBarPage.propTypes = {};
CookieBarPage.defaultProps = {};

export default CookieBarPage;
