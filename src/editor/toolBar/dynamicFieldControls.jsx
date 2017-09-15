import React, {Component} from 'react';
import {Tooltip, Icon} from "antd"
class AddField extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="RichEditor-controls">
        <span className="RichEditor-styleButton" onClick={this.props.onToggle} title='添加动态字段'>
          <Icon type="ellipsis" />
        </span>
      </div>
    )
  }
}

module.exports = {
  AddField
};
