import React, {Component} from 'react';
import {Tooltip, Icon, Popover,Button, Tabs, Tag, Radio } from "antd"
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

import { mapValues,findKey, find, forEach } from 'lodash'
// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const options = [
//   { label: 'Apple', value: 'Apple' },
//   { label: 'Pear', value: 'Pear' },
//   { label: 'Orange', value: 'Orange' },
// ];


class AddField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value:null,
      fieldTpl:null
    }
    this.hide = this.hide.bind(this)
    this.onOk = this.onOk.bind(this)
    this.onChange1 = this.onChange1.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }
  componentDidMount() {
    console.log(this.props,'field props')
    // this.renderField()
  }
  renderField() {
    const fieldData = this.props.fieldProps

    const tpl = fieldData.map( (item) => {

      

      return (
          <div key={item.id}>
              <h5>{item.name}</h5>
              <RadioGroup name="radiogroup" options={item.child} onChange={this.onChange1} value={this.state.value} />
              
          </div>
      )
    })
    console.log(tpl,'tpl')
    this.setState({fieldTpl:tpl})

  }
  hide(){
    this.setState({
      visible: false,
    });
  }
  findItem() {
    const newArr = []
    const arr = _.mapValues(this.props.fieldProps, 'child')
    const { value } = this.state
    let selectedVal = {}
    forEach(arr, function(item){

       const findItem = find(item, ['value', value]);
        if(findItem) {
          selectedVal = findItem
        }
      // if(selectedVal){
      //   return
      // }
      // newArr.push(value)
    })
    return selectedVal
  }
  onOk(e){
    this.setState({
      visible: false,
    },()=> {
      //example
      
      const selectedItem = this.findItem()
      const value = { id:this.state.value, txt:selectedItem.name }
      this.props.onToggle(e, value)
      //console.log(this.props.onToggle(e, value))
    });
  }
  onChange1(e){
    console.log('radio1 checked', e.target);
    this.setState({
      value: e.target.value,
    });
  }
  handleVisibleChange(visible){
    this.setState({ visible });
  }
  render() {
    // const  { fieldTpl } = this.state
    const fieldData = this.props.fieldProps

    const fieldTpl = fieldData ? fieldData.map( (item) => {

      return (
          <div key={item.id} style={{ marginBottom:20 }}>
              <h3>{item.name}：</h3>
              <RadioGroup options={item.child} onChange={this.onChange1} value={this.state.value} />
              
          </div>
      )
    }) : null

    const tpl = <div>
                  {fieldTpl}

                  <div style={{marginTop: 10}}>
                    
                    <Button type="primary"  size='small' onClick={this.onOk} >确定</Button>&nbsp;&nbsp;
                    <Button type="dashed"  size='small' onClick={this.hide} >取消</Button>
                  </div>
                  
                </div>


    return (
      <Popover
        content={tpl}
        placement="right"
        title="动态字段添加"
        trigger="hover"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        overlayStyle={{maxWidth:400}}
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


