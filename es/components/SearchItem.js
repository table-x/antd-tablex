import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Form, Select, Input, InputNumber, DatePicker
} from 'antd';
import { translateWords } from '../utils';

const { Item: FormItem } = Form;
const { Group: InputGroup, TextArea } = Input;
const { Option } = Select;

export default class SearchItem extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    lang: PropTypes.string.isRequired,
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
    // todo...const types = ['date', 'month', 'range', 'week', 'time', 'select'];
    if (value) {
      if (typeof value === 'object') {
        form.setFieldsValue({ [option.keyword]: moment(value).format('YYYY-MM-DD HH:mm:ss') });
      } else {
        form.setFieldsValue({ [option.keyword]: value });
      }
    }
    handleFieldChange();
  }

  render() {
    const { form, lang, option } = this.props;
    const { getFieldDecorator } = form;
    const initialValue = option.defaultValue;
    const defaultStyle = { width: '50%' };

    let initialElement = null;
    switch (option.type) {
      case 'text':
        initialElement = (
          <Input
            style={defaultStyle}
            onBlur={() => { this.onBlurOrChange(option); }}
            {...option.customProps}
          />
        );
        break;
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
          ({ selectOptions } = option.customProps.selectOptions);
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
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(value) => { this.onBlurOrChange(option, value); }}
            {...option.customProps}
          />
        );
        break;
      default:
        break;
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
                  {translateWords(lang, predicate)}
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
