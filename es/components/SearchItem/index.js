import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Select, Input, InputNumber, DatePicker, TimePicker, Cascader
} from 'antd';

const { Item: FormItem } = Form;
const { Group: InputGroup, TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class SearchItem extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    option: PropTypes.object.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    handlePredicateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onPredicateChange = this.onPredicateChange.bind(this);
  }

  onPredicateChange(value) {
    const { option, handlePredicateChange } = this.props;
    const { keyword } = option;
    handlePredicateChange(keyword, value);
  }

  onBlurOrChange(option, value) {
    const { form, handleFieldChange } = this.props;
    const changeEventElements = ['date', 'month', 'range', 'week', 'time', 'select'];
    if (changeEventElements.includes(option.type)) {
      form.setFieldsValue({ [option.keyword]: value });
    }
    handleFieldChange();
  }

  render() {
    const { form, option, onFieldChange } = this.props;
    const { getFieldDecorator } = form;
    const initialValue = option.defaultValue;
    const defaultStyle = { width: '50%' };

    let initialElement = null;
    switch (option.type) {
      case 'textArea':
        initialElement = (
          <TextArea
            style={defaultStyle}
            rows={1}
            autosize
            onBlur={() => { this.onBlurOrChange(option); }}
            {...option.customProps}
          />
        );
        break;
      case 'number':
        initialElement = (
          <InputNumber
            style={defaultStyle}
            onBlur={() => { this.onBlurOrChange(option); }}
            {...option.customProps}
          />
        );
        break;
      case 'select': {
        let selectOptions = [];
        if (option.customProps && option.customProps.selectOptions) {
          selectOptions = option.customProps.selectOptions;
        }
        initialElement = (
          <Select
            style={defaultStyle}
            onChange={(value) => {
              this.onBlurOrChange(option, value);
            }}
          >
            {selectOptions.map(o => (
              <Option key={o.value} value={o.value}>
                { o.name }
              </Option>
            ))}
          </Select>
        );
        break;
      }
      case 'date':
        initialElement = (
          <DatePicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(option, value); }}
            {...option.customProps}
          />
        );
        break;
      case 'month':
        initialElement = (
          <MonthPicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(option, value); }}
            {...option.customProps}
          />
        );
        break;
      case 'range':
        initialElement = (
          <RangePicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(option, value); }}
            {...option.customProps}
          />
        );
        break;
      case 'week':
        initialElement = (
          <WeekPicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(option, value); }}
            {...option.customProps}
          />
        );
        break;
      case 'time':
        initialElement = (
          <TimePicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(option, value); }}
            {...option.customProps}
          />
        );
        break;
      case 'cascader': //todo...
        initialElement = (
          <Cascader
            style={defaultStyle}
            onChange={onFieldChange}
            {...option.customProps}
          />
        );
        break;
      case 'text':
      default:
        initialElement = (
          <Input
            style={defaultStyle}
            onBlur={() => { this.onBlurOrChange(option); }}
            {...option.customProps}
          />
        );
    }

    return (
      <FormItem
        style={{ width: '90%' }}
        label={option.title}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <InputGroup compact>
          <Select
            style={{ width: 108 }}
            defaultValue={option.defaultPredicate}
            onChange={this.onPredicateChange}
          >
            {
              option.predicates.map(predicate => (
                <Option
                  key={predicate}
                  value={predicate}
                >
                  { predicate }
                </Option>
              ))
            }
          </Select>
          {getFieldDecorator(option.keyword, { initialValue })(initialElement)}
        </InputGroup>
      </FormItem>
    );
  }
}
