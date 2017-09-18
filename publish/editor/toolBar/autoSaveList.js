'use strict';

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css3 = require('antd/lib/tree/style/css');

var _tree = require('antd/lib/tree');

var _tree2 = _interopRequireDefault(_tree);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _publicDatas = require('../../global/supports/publicDatas');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _ImageDecorator = require('../decorators/ImageDecorator');

var _ImageDecorator2 = _interopRequireDefault(_ImageDecorator);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _tree2.default.TreeNode;
var rawContent = {
  blocks: [{
    text: 'This is an "immutable" entity: Superman. Deleting any ' + 'characters will delete the entire entity. Adding characters ' + 'will remove the entity from the range.',
    type: 'unstyled',
    entityRanges: [{ offset: 31, length: 3, key: 'first' }]
  }, {
    text: '',
    type: 'unstyled'
  }, {
    text: 'This is a "mutable" entity: Batman. Characters may be added ' + 'and removed.',
    type: 'unstyled',
    entityRanges: [{ offset: 28, length: 6, key: 'second' }]
  }, {
    text: '',
    type: 'unstyled'
  }, {
    text: 'This is a "segmented" entity: Green Lantern. Deleting any ' + 'characters will delete the current "segment" from the range. ' + 'Adding characters will remove the entire entity from the range.',
    type: 'unstyled',
    entityRanges: [{ offset: 30, length: 13, key: 'third' }]
  }],

  entityMap: {
    first: {
      type: 'TOKEN',
      mutability: 'IMMUTABLE'
    },
    second: {
      type: 'TOKEN',
      mutability: 'MUTABLE'
    },
    third: {
      type: 'TOKEN',
      mutability: 'SEGMENTED'
    }
  }
};
function getEntityStrategy(mutability) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      if (entityKey === null) {
        return false;
      }
      return contentState.getEntity(entityKey).getMutability() === mutability;
    }, callback);
  };
}
function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE':
      return styles.immutable;
    case 'MUTABLE':
      return styles.mutable;
    case 'SEGMENTED':
      return styles.segmented;
    default:
      return null;
  }
}
var styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: 'center'
  },
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0'
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0'
  },
  segmented: {
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0'
  }
};
var TokenSpan = function TokenSpan(props) {
  var style = getDecoratedStyle(props.contentState.getEntity(props.entityKey).getMutability());
  return _react2.default.createElement(
    'span',
    { 'data-offset-key': props.offsetkey, style: style },
    props.children
  );
};

var AutoSaveControls = function (_Component) {
  _inherits(AutoSaveControls, _Component);

  function AutoSaveControls(props) {
    _classCallCheck(this, AutoSaveControls);

    var _this = _possibleConstructorReturn(this, (AutoSaveControls.__proto__ || Object.getPrototypeOf(AutoSaveControls)).call(this, props));

    var decorator = new _draftJs.CompositeDecorator([{
      strategy: getEntityStrategy('IMMUTABLE'),
      component: TokenSpan
    }, {
      strategy: getEntityStrategy('MUTABLE'),
      component: TokenSpan
    }, {
      strategy: getEntityStrategy('SEGMENTED'),
      component: TokenSpan
    }]);
    var blocks = (0, _draftJs.convertFromRaw)(rawContent);

    _this.state = {
      editorState: _draftJs.EditorState.createWithContent(blocks, decorator),

      visible: false
    };
    return _this;
  }

  _createClass(AutoSaveControls, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'onClick',
    value: function onClick() {
      var content = (0, _utils.stateFromHTML)(this.state.editorState);

      var contentStateWithEntity = content.createEntity('aaa', 'IMMUTABLE', { aaa: 'bbb' });
      var entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      var currentSelectionState = this.state.editorState.getSelection();

      var emojiAddedContent = void 0;
      var emojiEndPos = 0;
      var blockSize = 0;
      var afterRemovalContentState = _draftJs.Modifier.removeRange(content, currentSelectionState, 'backward');
      return;
      var targetSelection = afterRemovalContentState.getSelectionAfter();
      emojiAddedContent = _draftJs.Modifier.insertText(afterRemovalContentState, targetSelection, '{{<span>11111</span>}}', null, entityKey);
      emojiEndPos = targetSelection.getAnchorOffset();
      var blockKey = targetSelection.getAnchorKey();

      blockSize = content.getBlockForKey(blockKey).getLength();
      if (emojiEndPos === blockSize) {
        emojiAddedContent = _draftJs.Modifier.insertText(emojiAddedContent, emojiAddedContent.getSelectionAfter(), ' ');
      }
      var newEditorState = _draftJs.EditorState.push(this.state.editorState, emojiAddedContent, 'insert-emoji');
      var ccc = _draftJs.EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
      this.setState({ editorState: ccc });
    }
  }, {
    key: 'onAutoSaveToggle',
    value: function onAutoSaveToggle() {
      this.setState({ visible: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'RichEditor-styleButton';

      return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'span',
            { className: className, onClick: this.onAutoSaveToggle.bind(this), title: this.props.lang.draftTipMsg },
            _react2.default.createElement(_icon2.default, { type: 'editor_safty' })
          )
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: this.props.lang.draftModalTitle,
            visible: this.state.visible,
            closable: true,
            width: 600
          },
          _react2.default.createElement(
            'div',
            { onClick: this.onClick.bind(this) },
            '\u6D4B\u8BD51111'
          )
        )
      );
    }
  }]);

  return AutoSaveControls;
}(_react.Component);

module.exports = AutoSaveControls;