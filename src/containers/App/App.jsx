import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import {Switch} from 'react-router';
import {renderRoutes} from 'react-router-config';
import Menu from '@wicked_query/ultimatejs/lib/admin/Menu/Menu';
import FontAwesome from './FontAwesome';
import menu from '../../menu';
import './app.scss';

class App extends React.Component {
  state = {
    active: false
  };

  render() {
    const {route: {routes}} = this.props;
    return (
      <FontAwesome>
        <Helmet
          script={[
            {type: 'text/javascript', src: '/js/plupload-2.1.9/plupload.full.min.js'},
            {type: 'text/javascript', src: '/js/tinymce/js/tinymce/tinymce.min.js'}
          ]}

        />
        <div className="wrapper">
          <nav id="sidebar" className={classNames({'active': this.state.active})}>
            <div className="sidebar-header">
              <h3>UltimateJS</h3>
            </div>
            <Menu menu={menu} className={'list-unstyled components'}/>
          </nav>
          <div id="content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">

                <button
                  type="button"
                  id="sidebarCollapse"
                  className={classNames({'navbar-btn': true, 'active': this.state.active})}
                  onClick={() => {
                    const {active} = this.state;
                    this.setState({active: !active});
                  }}
                >
                  <span />
                  <span />
                  <span />
                </button>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                  <i className="fas fa-align-justify" />
                </button>
              </div>
            </nav>

            <Switch>{renderRoutes(routes)}</Switch>
          </div>
        </div>
      </FontAwesome>
    );
  }
}

App.propTypes = {
  route: PropTypes.instanceOf(Object)
};

export default App;
