'use strict';

var _css = require('antd/lib/popover/style/css');

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _css2 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css3 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css4 = require('antd/lib/radio/style/css');

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _css5 = require('antd/lib/tabs/style/css');

var _tabs = require('antd/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _tabs2.default.TabPane;
var RadioGroup = _radio2.default.Group;

var AddField = function (_Component) {
  _inherits(AddField, _Component);

  function AddField(props) {
    _classCallCheck(this, AddField);

    var _this = _possibleConstructorReturn(this, (AddField.__proto__ || Object.getPrototypeOf(AddField)).call(this, props));

    _this.state = {
      visible: false,
      value: null,
      fieldTpl: null
    };
    _this.hide = _this.hide.bind(_this);
    _this.onOk = _this.onOk.bind(_this);
    _this.onChange1 = _this.onChange1.bind(_this);
    _this.handleVisibleChange = _this.handleVisibleChange.bind(_this);
    return _this;
  }

  _createClass(AddField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.props, 'field props');
    }
  }, {
    key: 'renderField',
    value: function renderField() {
      var _this2 = this;

      var fieldData = this.props.fieldProps;

      var tpl = fieldData.map(function (item) {

        return _react2.default.createElement(
          'div',
          { key: item.id },
          _react2.default.createElement(
            'h5',
            null,
            item.title
          ),
          _react2.default.createElement(RadioGroup, { name: 'radiogroup', options: item.child, onChange: _this2.onChange1, value: _this2.state.value })
        );
      });
      console.log(tpl, 'tpl');
      this.setState({ fieldTpl: tpl });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: 'findItem',
    value: function findItem() {
      var newArr = [];
      var arr = _.mapValues(this.props.fieldProps, 'child');
      var value = this.state.value;

      var selectedVal = {};
      (0, _lodash.forEach)(arr, function (item) {

        var findItem = (0, _lodash.find)(item, ['value', value]);
        if (findItem) {
          selectedVal = findItem;
        }
      });
      return selectedVal;
    }
  }, {
    key: 'onOk',
    value: function onOk(e) {
      var _this3 = this;

      this.setState({
        visible: false
      }, function () {

        var selectedItem = _this3.findItem();
        var value = { id: _this3.state.value, txt: selectedItem.title, field: selectedItem.field };
        _this3.props.onToggle(e, value);
      });
    }
  }, {
    key: 'onChange1',
    value: function onChange1(e) {
      console.log('radio1 checked', e.target);
      this.setState({
        value: e.target.value
      });
    }
  }, {
    key: 'handleVisibleChange',
    value: function handleVisibleChange(visible) {
      this.setState({ visible: visible });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var fieldData = this.props.fieldProps;

      var fieldTpl = fieldData ? fieldData.map(function (item) {

        return _react2.default.createElement(
          'div',
          { key: item.id, style: { marginBottom: 20 } },
          _react2.default.createElement(
            'h3',
            null,
            item.title,
            '\uFF1A'
          ),
          _react2.default.createElement(RadioGroup, { options: item.child, onChange: _this4.onChange1, value: _this4.state.value })
        );
      }) : null;

      var tpl = _react2.default.createElement(
        'div',
        null,
        fieldTpl,
        _react2.default.createElement(
          'div',
          { style: { marginTop: 10 } },
          _react2.default.createElement(
            _button2.default,
            { type: 'primary', size: 'small', onClick: this.onOk },
            '\u786E\u5B9A'
          ),
          '\xA0\xA0',
          _react2.default.createElement(
            _button2.default,
            { type: 'dashed', size: 'small', onClick: this.hide },
            '\u53D6\u6D88'
          )
        )
      );

      return _react2.default.createElement(
        _popover2.default,
        {
          content: tpl,
          placement: 'right',
          title: '\u52A8\u6001\u5B57\u6BB5\u6DFB\u52A0',
          trigger: 'hover',
          visible: this.state.visible,
          onVisibleChange: this.handleVisibleChange,
          overlayStyle: { maxWidth: 400 }
        },
        _react2.default.createElement(
          'div',
          { className: 'RichEditor-controls' },
          _react2.default.createElement(
            'span',
            { className: 'RichEditor-styleButton', title: '\u6DFB\u52A0\u52A8\u6001\u5B57\u6BB5' },
            _react2.default.createElement(_icon2.default, { type: 'ellipsis' })
          )
        )
      );
    }
  }]);

  return AddField;
}(_react.Component);

module.exports = {
  AddField: AddField
};