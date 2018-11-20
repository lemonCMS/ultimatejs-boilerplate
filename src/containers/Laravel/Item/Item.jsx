import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Card from 'react-bootstrap/lib/Card';
import _get from 'lodash/get';
import {connect} from 'react-redux';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/prism-light';
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/styles/prism/prism';
import Table from 'react-bootstrap/lib/Table';
import {provideHooks} from '@wicked_query/ultimatejs/lib/redial';
import connectToForm from '@wicked_query/ultimatejs/lib/laravel/decorators/connectToForm';
import {isLoadedItem, loadItem} from '@wicked_query/ultimatejs/lib/redux/store/actions';
import Form from '@wicked_query/ultimatejs/lib/final-form/Form';
import Input from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Input';
import Checkbox from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Checkbox';
import Message from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Message';
import validator from '@wicked_query/ultimatejs/lib/final-form/validator';
import Button from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Button';
import Sticky from '@wicked_query/ultimatejs/lib/sticky';

registerLanguage('jsx', jsx);

const api = '/users';
const key = 'users';

@provideHooks({
  fetch: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    if (params.id && params.id !== 'new') {
      if (!isLoadedItem(key, getState(), params.id)) {
        promises.push(dispatch(loadItem(key, api, params.id, {})));
      }
    }
    return Promise.all(promises);
  }

})
@connect(state => ({
  item: _get(state.store, [key, 'item'], {})
}))
@connectToForm({
  api,
  key
})
class Item extends PureComponent {

  state = {};

  static getDerivedStateFromProps(props, state) {
    if (state.id !== props.item.id || state.updated_at !== props.item.updated_at) {
      return props.item;
    }
    return null;
  }

  validate(data) {
    const errors = {};
    errors.name = validator.mandatory(data.name);
    errors.email = validator.mandatoryEmail(data.email);
    return validator.omit(errors);
  }

  render() {
    const size = {
      labelSize: {md: 2},
      fieldSize: {md: 10},
    };
    const {edit, newItem} = this.props;

    return (
      <Container fluid>
        <Row>
          <Col md={12}>
            <h1>ConnectToForm</h1>
            <p>
              Adds the handleSubmit function as a property on your component. This makes it easy in a admin environment where there a lot of forms.<br />
              Correct handling of server errors.
            </p>

            <SyntaxHighlighter language={'js'} showLineNumbers style={prism}>
              {'import connectToForm from \'@wicked_query/ultimatejs/lib/laravel/decorators/connectToForm\';\n\n' +
              '@connectToForm({\n' +
              '  api,\n' +
              '  key\n' +
              '})' +
              '' +
              ''}
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
                  <td><code>api</code></td>
                  <td>string</td>
                  <td>path to your api relative from /api proxy.</td>
                </tr>
                <tr>
                  <td><code>key</code></td>
                  <td>string</td>
                  <td>The key in redux where under the data should be stored / available.</td>
                </tr>
              </tbody>
            </Table>

            <h2 className={'mt-5'}>Added props</h2>
            <Table className={'mt-5'}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>onSubmit</code></td>
                  <td>function</td>
                  <td>This will handle post/put request to your server.</td>
                </tr>
                <tr>
                  <td><code>id</code></td>
                  <td>int</td>
                  <td>The id of the item.</td>
                </tr>
                <tr>
                  <td><code>new</code></td>
                  <td>boolean</td>
                  <td><code>true</code> when it is a new item.</td>
                </tr>
                <tr>
                  <td><code>edit</code></td>
                  <td>boolean</td>
                  <td><code>true</code> when you are editing a item.</td>
                </tr>
              </tbody>
            </Table>

          </Col>

          <Col md={12} className={'mt-5'}>
            <h2>Example simple user form</h2>
            <Card>
              <Card.Header>
                You&#39;re editing:
                {' '}
                <strong>
                  {this.state.name || 'new user'}
                </strong>
              </Card.Header>
              <Card.Body>
                <Form
                  className={'horizontal'}
                  initialValues={this.state}
                  validate={this.validate}
                  onSubmit={this.props.onSubmit}
                  static={!edit && !newItem}
                >
                  <Sticky>
                    <Row className={'mb-2 message-min-height'}>
                      <Col md={8}>
                        <Message type={'success'}>
                          Your changes have been saved.
                        </Message>
                        <Message type={'error'}>
                          There is a problem, please check the form.
                        </Message>
                      </Col>
                      <Col md={4}>
                        <Button className={'float-right'}
                          type={'submit'}
                          variant={'primary'}>
                          save
                        </Button>
                      </Col>
                    </Row>
                  </Sticky>
                  <Input label={'Name'}
                    name={'name'}
                     autoComplete={'off'}
                    type={'text'} {...size} />
                  <Input label={'Email'}
                    name={'email'}
                    type={'email'} {...size} />
                  <Checkbox name={'active'}
                    fieldSize={{md: {span: 10, offset: 2}}}>
                    <option value>Actief</option>
                  </Checkbox>
                  <Input label={'Created'}
                    name={'created_at'}
                    type={'text'}
                    static {...size} />
                  <Input label={'updated'}
                    name={'updated_at'}
                    type={'text'}
                    static {...size} />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func,
  edit: PropTypes.bool,
  newItem: PropTypes.bool,
};
Item.defaultProps = {};

export default Item;
