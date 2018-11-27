import React, {Component} from 'react';

const style = require('./error.txt');

class Error extends Component {
  render() {
    return (
      <React.Fragment>
        <style type={'text/css'}>
          {style}
        </style>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>Oops!</h1>
              <h2>501 Not authorized. Please login and try again.</h2>
            </div>
            <a href="/">Go to Homepage</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Error.propTypes = {
};
Error.defaultProps = {};

export default Error;
