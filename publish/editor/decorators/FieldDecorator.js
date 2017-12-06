'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('antd/lib/tag');

var _tag2 = _interopRequireDefault(_tag);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _main = require('../utils/stateUtils/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Field(props_) {
  var _Entity$get$getData = _draftJs.Entity.get(props_.entityKey).getData(),
      id = _Entity$get$getData.id,
      field = _Entity$get$getData.field,
      txt = _Entity$get$getData.txt;

  console.log(field, 'field');
  return _react2.default.createElement(
    _tag2.default,
    { 'data-id': id, 'data-field': field },
    props_.children
  );
}

function findFieldEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey != null && _draftJs.Entity.get(entityKey).getType() === _main.ENTITY_TYPE.FIELD;
  }, callback);
}

exports.default = {
  strategy: findFieldEntities,
  component: Field
};