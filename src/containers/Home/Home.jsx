import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Card from 'react-bootstrap/lib/Card';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <div className="jumbotron">
          <h1 className="display-4">Welcome to @Wicked_query/UltimateJS</h1>
          <p className="lead">This is your starterboilerplate. We have implemented some helpful features that will get you ready into makeng your own React application.
          </p>
          <hr className="my-4" />
          <p>
            You can create your front- and backend with this boilerplate. You backend does not have to be oldSkool anymore.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="http://tweakers.net" role="button">Learn more</a>
          </p>
        </div>

        <Row>
          <Col md={4}>
            <Card bg="light" className={'mb-2'}>
              <Card.Header>Works great with laravel</Card.Header>
              <Card.Body>
                <Card.Title>Laravel</Card.Title>
                <Card.Text>
                  We have already implemented an redux store and laravel helper components, like pagination, authorization and administrative list / item handling.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="secondary" text="white" className={'mb-2'}>
              <Card.Header>Universal webapp out of the box</Card.Header>
              <Card.Body>
                <Card.Title>Universal</Card.Title>
                <Card.Text>
                  We have already implemented an redux store and laravel helper components, like pagination, authorization and administrative list / item handling.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="light" className={'mb-2'}>
              <Card.Header>Webpack hot reloading</Card.Header>
              <Card.Body>
                <Card.Title>Hot reloading, LESS and SASS</Card.Title>
                <Card.Text>
                  Development made easy with hot reloading, less and sass support out of the box. Faster development build times with the webpackDLL plugin enabled.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
