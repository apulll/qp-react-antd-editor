import React, {Component} from 'react';
import {Tooltip, Icon, Popover,Button} from "antd"
class AddField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.hide = this.hide.bind(this)
    this.onOk = this.onOk.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  hide(){
    this.setState({
      visible: false,
    });
  }
  onOk(e){
    this.setState({
      visible: false,
    },()=> {
      //example
      const value = {id:'F111', txt:'字段一'}
      this.props.onToggle(e, value)
      //console.log(this.props.onToggle(e, value))
    });
  }
  handleVisibleChange(visible){
    this.setState({ visible });
  }
  render() {
    return (
      <Popover
        content={<div><a onClick={this.onOk}>确定</a><a onClick={this.hide}>Close</a></div>}
        placement="right"
        title="动态字段添加"
        trigger="hover"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className="RichEditor-controls">
          <span className="RichEditor-styleButton" onClick={this.props.onToggle} title='添加动态字段'>
            <Icon type="ellipsis" />
          </span>
        </div>
      </Popover>
    )
  }
}

module.exports = {
  AddField
};


