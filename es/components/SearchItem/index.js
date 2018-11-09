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
    option: PropTypes.any.isRequired,
    onFieldChange: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.onUpdateOption = this.onUpdateOption.bind(this);
    this.state = { optionConfig: { ...props.option } };
  }

  onBlurOrChange(option, value) {
    const { form, onFieldChange } = this.props;
    const changeEventElements = ['date', 'month', 'range', 'week', 'time', 'select'];
    if (changeEventElements.includes(option.type)) {
      form.setFieldsValue({ [option.keyword]: value });
    }
    onFieldChange();
  }

  onUpdateOption() {
    const { option } = this.props;
    const optionConfig = Object.assign({}, option);
    this.setState({ optionConfig });
  }

  render() {
    const { form, onFieldChange } = this.props;
    const { optionConfig } = this.state;
    const { getFieldDecorator } = form;
    const initialValue = optionConfig.defaultValue;
    const defaultStyle = { width: '50%' };
    const weekDefaultStyle = { width: '100%' };
    let initialElement = null;

    switch (optionConfig.type) {
      case 'textArea':
        initialElement = (
          <TextArea
            style={defaultStyle}
            rows={1}
            autosize
            onBlur={() => { this.onBlurOrChange(optionConfig); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'number':
        initialElement = (
          <InputNumber
            style={defaultStyle}
            onBlur={() => { this.onBlurOrChange(optionConfig); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'select':
        initialElement = (
          <Select
            style={defaultStyle}
            onFocus={this.onUpdateOption}
            onChange={(value) => { this.onBlurOrChange(optionConfig, value); }}
          >
            {optionConfig.selectOptions.map(o => (
              <Option key={o.value} value={o.value}>
                { o.name }
              </Option>
            ))}
          </Select>
        );
        break;
      case 'date':
        initialElement = (
          <DatePicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(optionConfig, value); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'month':
        initialElement = (
          <MonthPicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(optionConfig, value); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'range':
        initialElement = (
          <RangePicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(optionConfig, value); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'week':
        initialElement = (
          <WeekPicker
            style={weekDefaultStyle}
            onChange={(value) => { this.onBlurOrChange(optionConfig, value); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'time':
        initialElement = (
          <TimePicker
            style={defaultStyle}
            onChange={(value) => { this.onBlurOrChange(optionConfig, value); }}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'cascader': //todo...
        initialElement = (
          <Cascader
            style={defaultStyle}
            onChange={onFieldChange}
            {...optionConfig.customProps}
          />
        );
        break;
      case 'text':
      default:
        initialElement = (
          <Input
            style={defaultStyle}
            onBlur={() => { this.onBlurOrChange(optionConfig); }}
            {...optionConfig.customProps}
          />
        );
    }

    return (
      <FormItem
        style={{ width: '90%' }}
        label={optionConfig.text}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <InputGroup compact>
          <Select
            style={{ width: 108 }}
            defaultValue={optionConfig.defaultPredicate}
          >
            {
              optionConfig.predicates.map(predicate => (
                <Option
                  key={predicate}
                  value={predicate}
                >
                  { predicate }
                </Option>
              ))
            }
          </Select>
          {getFieldDecorator(optionConfig.keyword, { initialValue })(initialElement)}
        </InputGroup>
      </FormItem>
    );
  }
}
