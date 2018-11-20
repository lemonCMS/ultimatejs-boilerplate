import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from '@wicked_query/ultimatejs/lib/final-form/Form';
import Button from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Button';
import Input from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Input';
import Select from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Select';
import Radio from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Radio';
import Checkbox from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Checkbox';
import DateTime from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/DateTime';
import Dropdown from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Dropdown';
import Plupload from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Plupload';
import TinyMce from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/TinyMce';
import ComplexRow from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/ComplexRow';
import Complex from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Complex';
import Show from '@wicked_query/ultimatejs/lib/final-form/Bootstrap4/Show';
// import PropTypes from 'prop-types';

class Register extends Component {
  render() {

    const size = {
      labelSize: {xs: 3},
      fieldSize: {xs: 9}
    };

    const sizeComplex = {
      fieldSize: { xs: 12 }
    };

    return (
      <div>
        <Helmet
          script={[
            {type: 'text/javascript', src: '/js/plupload-2.1.9/plupload.full.min.js'},
            {type: 'text/javascript', src: '/js/tinymce/js/tinymce/tinymce.min.js'}
          ]}
        />
        <h2>
          Registration Form
        </h2>
        <p>
          This form demonstrates a form with field arrays.
          here you can add multiple domestic pets and children.
        </p>
        <Form debug>

          <Input label="Username" placeholder="email" name={'username'} type={'text'} {...size} />
          <Input label="Password" placeholder="password" name={'password'} type={'password'} {...size} />

          <Input label="Firstname" placeholder="Firstname" name={'firstname'} type={'text'} {...size} />
          <Input label="Lastname" placeholder="Lastname" name={'lastname'} type={'text'} {...size} />

          <Select label="Favorite Color"  name={'color'} {...size} >
            <option value={'1'}>White</option>
            <option value={'2'}>Black</option>
            <option value={'3'}>Red</option>
            <option value={'4'}>Pink</option>
            <option value={'5'}>Green</option>
            <option value={'6'}>Brown</option>
            <option value={'7'}>Grey</option>
          </Select>
          <Checkbox label="Favorite food" name={'colorCB'} {...size} >
            <option value={'1'}>pizza</option>
            <option value={'2'}>patat</option>
            <option value={'3'}>pasta</option>
            <option value={'4'}>steak</option>
            <option value={'5'}>burger</option>
            <option value={'6'}>chicken</option>
            <option value={'7'}>fish</option>
          </Checkbox>
          <Radio label="Favorite season" name={'colorRadio'} {...size} >
            <option value={'1'}>Winter</option>
            <option value={'2'}>Spring</option>
            <option value={'3'}>Summer</option>
            <option value={'4'}>Fall</option>
          </Radio>
          <DateTime label="Date of birth" name={'date-time'} {...size}/>
          <Dropdown label="Drop down" name={'dropdown'} {...size}>
            <option value={''} selected>-- choose --</option>
            <option value={'1'}>White</option>
            <option value={'2'}>Black</option>
            <option value={'3'}>Red</option>
            <option value={'4'}>Pink</option>
            <option value={'5'}>Green</option>
            <option value={'6'}>Brown</option>
            <option value={'7'}>Grey</option>
          </Dropdown>
          <Plupload name="plupload" label={'Upload'} {...size} conf={{id: 'plupload'}}/>
          <h4 className={'mb-1'}>Do you have pets?</h4>
          <ComplexRow
            label={'Domestic pets'}
            name={"pets"}
            {...size}
            left={{ xs: 9 }}
            right={{ xs: 3 }}
            moveBtn={{variant: 'secondary'}}
            removeBtn={{variant: 'danger'}}
            render={name => (
              <Row>
                <Col xs={6}>
                  <Input
                    placeholder="Name"
                    name={`${name}.name`}
                    type={"text"}
                    {...sizeComplex}
                  />
                </Col>
                <Col xs={6}>
                  <Input
                    placeholder="Age"
                    name={`${name}.age`}
                    type={"number"}
                    {...sizeComplex}
                  />
                </Col>
              </Row>
            )}
          />

          <h4 className={'mb-1'}>Do you have children?</h4>

          <Radio label="Children" name={'hasChildren'} {...size} >
            <option value={'0'}>No</option>
            <option value={'1'}>Yes</option>
          </Radio>
          <Show show={(data) => {
            if (data.hasChildren && data.hasChildren === '1') {
              return true;
            }
            return false;
          }}>
            <Complex
              label={'Children'}
              name={"children"}
              {...size}
              left={{ xs: 9 }}
              right={{ xs: 3 }}
              moveBtn={{variant: 'secondary', size: 'sm'}}
              removeBtn={{variant: 'danger', size: 'sm'}}
              render={name => (
                <Row>
                  <Col xs={6}>
                    <Input
                      placeholder="Name"
                      name={`${name}.name`}
                      type={"text"}
                      {...sizeComplex}
                    />
                  </Col>
                  <Col xs={6}>
                    <Input
                      placeholder="Age"
                      name={`${name}.age`}
                      type={"number"}
                      {...sizeComplex}
                    />
                  </Col>
                </Row>
              )}
            />
          </Show>
          <TinyMce name={'about'} label={'About you'} {...size} help={'Tell us something about yourself.'}/>
          <Button type={'button'}>Send</Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {};
Register.defaultProps = {};

export default Register;
