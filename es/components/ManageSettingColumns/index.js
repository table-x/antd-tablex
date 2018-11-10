import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Switch, Radio
} from 'antd';
import { localColumnKeys } from '../../constants';
import { translateLang } from '../../utils';

const { Group: RadioGroup, Button: RadioButton } = Radio;

export default class ManageSettingColumns extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
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
    resetLocalColumnsProps('columns', changedLocalColumns);
  }

  render() {
    const { lang, localColumns } = this.props;
    const manageColumns = [
      {
        title: translateLang(lang, 'title'),
        align: 'center',
        dataIndex: 'title'
      },
      {
        title: translateLang(lang, 'show'),
        align: 'center',
        render: (value, values) => (
          <Switch
            checked={values.show}
            onChange={(e) => { this.onChange(e, 'show', values.title); }}
          />
        )
      },
      {
        title: translateLang(lang, 'align'),
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
              {translateLang(lang, 'Left')}
            </RadioButton>
            <RadioButton
              value="center"
            >
              {translateLang(lang, 'Center')}
            </RadioButton>
            <RadioButton
              value="right"
            >
              {translateLang(lang, 'Right')}
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
        rowKey={r => r[localColumnKeys[0]]}
      />
    );
  }
}
