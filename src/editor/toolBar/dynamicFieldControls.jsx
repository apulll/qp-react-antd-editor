import React, {Component} from 'react';
import {Tooltip, Icon, Popover,Button, Tabs, Tag, Radio } from "antd"
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];


class AddField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value:null,
    }
    this.hide = this.hide.bind(this)
    this.onOk = this.onOk.bind(this)
    this.onChange1 = this.onChange1.bind(this)
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
  onChange1(e){
    console.log('radio1 checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  handleVisibleChange(visible){
    this.setState({ visible });
  }
  render() {

    const tpl = <div>
                  
                  <a onClick={this.onOk}>确定</a><a onClick={this.hide}>Close</a>
                </div>


    return (
      <Popover
        content={tpl}
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


