import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _indexOf from 'lodash/indexOf';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _uniq from 'lodash/uniq';
import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import Paginator from '@wicked_query/ultimatejs/lib/laravel/components/Paginator';
import {load, clearList} from '@wicked_query/ultimatejs/lib/laravel/redux/store/actions';

const fields = {
  'value': 'id',
  'desc': 'name',
};

let myTimeout = null;

class Models extends Component {

  static propTypes = {
    show: PropTypes.bool,
    closeResource: PropTypes.func,
    clonedValues: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
    clonedList: PropTypes.array,
    callBack: PropTypes.func,
    dispatch: PropTypes.func,
    list: PropTypes.object,
    listName: PropTypes.string,
    api: PropTypes.string,
    fields: PropTypes.shape({
      value: PropTypes.string,
      desc: PropTypes.string
    }),
    multiple: PropTypes.bool,
    name: PropTypes.string
  };

  static defaultProps = {
    fields: {
      value: 'id',
      desc: 'name'
    }
  };

  constructor() {
    super();
    this.body = this.body.bind(this);
    this.footer = this.footer.bind(this);
    this.getData = this.getData.bind(this);
    this.pushSearch = this.pushSearch.bind(this);
    this.renderPaginator = this.renderPaginator.bind(this);
    this.setParams = this.setParams.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = {
      keep: [],
      values: [],
      list: [],
      params: {
        search: ''
      },
    };
  }

  getData() {
    this.props.dispatch(load(this.props.listName, this.props.api, this.state.params));
  }




  componentDidMount() {
    this.setState({
      keep: this.props.clonedValues || [],
      values: this.props.clonedValues || [],
      list: this.props.clonedList || []
    });
  }

  componentDidUpdate(prevProps) {

    if (this.props.show === true && prevProps.show === false) {
      this.props.dispatch(clearList(this.props.listName));
    }
    if (!_isEqual(this.props.show, prevProps.show)) {
      this.setState({
        keep: this.props.clonedValues || [],
        values: this.props.clonedValues,
        list: this.props.clonedList || []
      }, () => {
        this.getData();
      });
    }
  }

  onChange(e, item) {
    const values = this.state.values;
    const list = this.state.list;
    const mappedItem = {
      value: item[this.props.fields.value],
      desc: item[this.props.fields.desc]
    };
    if (this.props.multiple === false) {
      if (e.target.checked === true) {
        this.setState({
          values: mappedItem.value,
          list: [mappedItem]
        });
      } else {
        this.setState({
          values: null,
          list: null
        });
      }
    } else {
      // If checkbox
      const index = _findIndex(list, {value: item[this.props.fields.value]});
      if (e.target.checked === true) {
        if (index === -1) {
          list.push(mappedItem);
        }
        values.push(mappedItem.value);
      } else {
        if (index > -1) {
          list.splice(index, 1);
        }
        values.splice(_indexOf(values, mappedItem.value), 1);
      }

      this.setState({
        values: _uniq(values),
        list: list
      });
    }
  }

  list(items) {
    return _map(items, (item, key) => {
      return (
        <li key={item[this.props.fields.value]}>
          <label htmlFor={`item-${key}`}>
            <input
              type={this.props.multiple ? 'checkbox' : 'radio'}
              id={`item-${key}`}
              name={this.props.multiple ? `check-${key}` : `check-${this.props.name}`}
              value={item[fields.value]}
              defaultChecked={this.props.multiple ? _indexOf(this.state.values, item[this.props.fields.value]) > -1 : String(this.state.values) === String(item[this.props.fields.value])}
              onChange={(e) => {
                this.onChange(e, item);
              }}
            />
            {' ' + item[this.props.fields.desc]}
          </label>
        </li>
      );
    });
  }

  pushSearch(e) {
    const value = e.target.value;
    const params = this.state.params;
    params.search = value;
    params.page = 1;
    this.setState({
      params: params
    }, () => {
      if (myTimeout) {
        clearTimeout(myTimeout);
      }
      myTimeout = setTimeout(() => {
        this.getData();
      }, 200);
    });
  }

  clearSearch() {
    const params = this.state.params;
    params.search = '';
    params.page = 1;
    this.setState({
      params: params
    }, this.getData);
  }

  body() {
    return (
      <Modal.Body>
        <ul>
          {this.list(_get(this.props, 'list.list.data', []))}
        </ul>
        {this.renderPaginator()}
      </Modal.Body>
    );
  }

  setParams(name, value) {
    const params = this.state.params;
    params[name] = value;
    this.setState({params: params}, () => {
      this.getData();
    });
  }

  footer() {
    const callBack = () => {
      this.props.callBack(this.state.values, this.state.list);
      this.props.closeResource();
    };

    const callBackEmpty = () => {
      this.props.callBack([], []);
      this.props.closeResource();
    };

    return (
      <Modal.Footer>
        <Button onClick={this.props.closeResource}>
          sluiten
        </Button>
        <Button onClick={callBackEmpty}>
          legen
        </Button>
        <Button onClick={callBack}
          bsStyle="primary">
          versturen
        </Button>
      </Modal.Footer>
    );
  }

  renderPaginator() {
    if (_get(this.props.list, 'list.total', null)) {
      return (
        <Paginator
          currPage={this.props.list.list.current_page}
          lastPage={this.props.list.list.last_page}
          onChange={(page) => {
            this.setParams('page', page);
          }}
        />
      );
    }
  }

  render() {
    return (
      <Modal bsSize="large"
        show={this.props.show}
        onHide={this.props.closeResource}>
        <Modal.Header>
          <Modal.Title>
            Data resource
          </Modal.Title>
        </Modal.Header>
        {this.body()}
        {this.footer()}
      </Modal>
    );
  }
}

export default Models;
