import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Switch, Radio
} from 'antd';
import {
  MANAGE_COLUMN_PROPS
} from '../../constants';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class ManageSettingColumns extends React.Component {
  static propTypes = {
    localColumns: PropTypes.any.isRequired,
    resetLocalColumnsProps: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(v, k, title) {
    const { localColumns, resetLocalColumnsProps } = this.props;
    const changedLocalColumns = localColumns.map((column) => {
      const newColumn = { ...column };
      if (newColumn.title === title) {
        newColumn[k] = v;
      }
      return newColumn;
    });
    resetLocalColumnsProps(changedLocalColumns);
  }

  render() {
    const { localColumns } = this.props;
    const manageColumns = [
      {
        title: 'title',
        align: 'center',
        dataIndex: 'title'
      },
      {
        title: 'show',
        align: 'center',
        render: (value, values) => (
          <Switch
            checked={values.show}
            onChange={(e) => { this.onChange(e, 'show', values.title); }}
          />
        )
      },
      {
        title: 'align',
        width: 250,
        align: 'center',
        render: (value, values) => (
          <RadioGroup
            value={values.align}
            onChange={(e) => { this.onChange(e.target.value, 'align', values.title); }}
          >
            <RadioButton
              value="left"
            >
              Left
            </RadioButton>
            <RadioButton
              value="center"
            >
              Center
            </RadioButton>
            <RadioButton
              value="right"
            >
              Right
            </RadioButton>
          </RadioGroup>
        )
      }
    ];

    return (
      <Table
        bordered
        size="small"
        pagination={false}
        columns={manageColumns}
        dataSource={localColumns}
        rowKey={r => r[MANAGE_COLUMN_PROPS[0]]}
      />
    );
  }
}
