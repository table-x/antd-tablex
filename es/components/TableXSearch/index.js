import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Card, Row, Col, Button
} from 'antd';
import SearchItem from '../SearchItem';

@Form.create()
export default class TableXSearch extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    searchOptions: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  onSave() {
    const { form } = this.props;
    form.validateFields((errors, values) => {
      console.log(errors, 'errors');
      console.log(values, 'values');
    });
  }

  handleFieldChange(value) {
    const { form } = this.props;
    console.log(value, 'valuevaluevalue');
    form.validateFields((errors, values) => {
      console.log(errors, 'errors');
      console.log(values, 'values');
    });
  }

  render() {
    const { form, searchOptions } = this.props;

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
            <Button
              type="primary"
              icon="search"
              onClick={this.onSave}
            >
              ddd
            </Button>
          </Row>
        </Form>
      </Card>
    );
  }
}
