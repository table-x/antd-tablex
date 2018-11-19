import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import {
  Form, Card, Row, Col, Button
} from 'antd';
import SearchItem from './SearchItem';
import { translateWords } from '../utils';

class TablexSearch extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    lang: PropTypes.string.isRequired,
    realTime: PropTypes.bool.isRequired,
    searchOptions: PropTypes.array.isRequired,
    searchItems: PropTypes.array.isRequired,
    searchQuery: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onClickClearButton = this.onClickClearButton.bind(this);
    this.onClickSearchButton = this.onClickSearchButton.bind(this);
    this.handlePredicateChange = this.handlePredicateChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  onClickClearButton() {
    const { form } = this.props;
    form.resetFields();
    this.handleFieldChange(true);
  }

  onClickSearchButton() {
    this.handleFieldChange(true);
  }

  handleFieldChange(clickSearchButton) {
    const {
      form, realTime, searchItems, onChange
    } = this.props;
    if (realTime || clickSearchButton) {
      form.validateFields((errors, values) => {
        const newSearchItems = searchItems.map((item) => {
          let value = get(values, item.keyword);
          if (Boolean(value) && (typeof value === 'object')) {
            value = moment(value).format('YYYY-MM-DD HH:mm:ss');
          }
          return {
            ...item,
            value
          };
        });
        onChange(newSearchItems, true);
      });
    }
  }

  handlePredicateChange(keyword, value) {
    const { searchItems, onChange } = this.props;
    let searchNow = false;
    const newSearchItems = searchItems.map((item) => {
      if (item.keyword !== keyword) {
        return item;
      }
      searchNow = Boolean(item.value);
      return {
        ...item,
        predicate: value
      };
    });
    onChange(newSearchItems, searchNow);
  }

  render() {
    const {
      form, lang, realTime, searchOptions, searchQuery
    } = this.props;
    const showClearButton = searchQuery.length > 0;
    const showSearchButton = !realTime;
    const showAllButton = showClearButton && showSearchButton;

    return (
      <Card
        title="Search"
        type="inner"
        style={{ marginBottom: 10 }}
      >
        <Form
          layout="inline"
        >
          <Row>
            {searchOptions.map(option => (
              <Col
                span={12}
                key={option.keyword}
              >
                <SearchItem
                  form={form}
                  lang={lang}
                  option={option}
                  handleFieldChange={this.handleFieldChange}
                  handlePredicateChange={this.handlePredicateChange}
                />
              </Col>
            ))}
          </Row>
          <Row style={{ textAlign: 'center' }}>
            {showClearButton && (
              <Button
                type="dashed"
                icon="delete"
                style={{ marginRight: (showAllButton ? 20 : 0) }}
                onClick={this.onClickClearButton}
              >
                {translateWords(lang, 'clear')}
              </Button>
            )}
            {showSearchButton && (
              <Button
                type="primary"
                icon="search"
                style={{ marginLeft: (showAllButton ? 20 : 0) }}
                onClick={this.onClickSearchButton}
              >
                {translateWords(lang, 'search')}
              </Button>
            )}
          </Row>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(TablexSearch);
