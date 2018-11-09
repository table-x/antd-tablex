import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  Form, Card, Row, Col, Button
} from 'antd';
import SearchItem from '../SearchItem';

@Form.create()
export default class TablexSearch extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    realTime: PropTypes.bool.isRequired,
    searchOptions: PropTypes.array.isRequired,
    searchQuery: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onClickClearButton = this.onClickClearButton.bind(this);
    this.onClickSearchButton = this.onClickSearchButton.bind(this);
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
      form, realTime, searchOptions, onChange
    } = this.props;
    if (realTime || clickSearchButton) {
      form.validateFields((errors, values) => {
        const newSearchOptions = searchOptions.map(item => ({
          ...item,
          value: get(values, item.keyword)
        }));
        onChange(newSearchOptions);
      });
    }
  }

  render() {
    const {
      form, realTime, searchOptions, searchQuery
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
                  option={option}
                  onFieldChange={this.handleFieldChange}
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
                clear
              </Button>
            )}
            {showSearchButton && (
              <Button
                type="primary"
                icon="search"
                style={{ marginLeft: (showAllButton ? 20 : 0) }}
                onClick={this.onClickSearchButton}
              >
                search
              </Button>
            )}
          </Row>
        </Form>
      </Card>
    );
  }
}
