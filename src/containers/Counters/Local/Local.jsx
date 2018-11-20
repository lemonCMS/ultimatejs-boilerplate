import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import CounterItem from '../../../components/CounterItem/CounterItem';

class Local extends React.Component {
  render() {
    return (
      <Container>
        <div className={'row mt-5'}>
          <div className={'col-md-12'}>
            <h2>Counters stored in Localstorage</h2>
            <p>
              These counters are refilled on the <strong>client side</strong>.<br />
              They are filled through a dispacher, so this will not raise any warning about mismatch content.<br />
            </p>
          </div>
          <CounterItem index={1} as={'counterLocalStorage'} />
          <CounterItem index={2} as={'counterLocalStorage'} />
          <CounterItem index={3} as={'counterLocalStorage'} />
        </div>
      </Container>
    );
  }
}

Local.propTypes = {
};
Local.defaultProps = {};

export default Local;
