import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import CounterItem from '../../../components/CounterItem/CounterItem';

class Cookie extends React.Component {
  render() {
    return (
      <Container>
        <div className={'row mt-5'}>
          <div className={'col-md-12'}>
            <h2>Counters stored in cookies</h2>
            <p>
              These counter are refilled on the <strong>server side</strong> with the data stored in the cookies.<br />
              When you disable javascript in your browser you will see these counters are filled.

            </p>
          </div>
          <CounterItem index={1} as={'counterCookie'} />
          <CounterItem index={2} as={'counterCookie'} />
          <CounterItem index={3} as={'counterCookie'} />
        </div>
      </Container>
    );
  }
}

Cookie.propTypes = {
};
Cookie.defaultProps = {};

export default Cookie;
