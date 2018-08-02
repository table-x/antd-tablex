import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Switch, Radio
} from 'antd';
import { MANAGE_OTHER_TABLE_PROPS } from '../../constants';

const { Group: RadioGroup, Button: RadioButton } = Radio;

export default class ManageSettingTable extends React.Component {
  static propTypes = {
    localConfigs: PropTypes.any.isRequired,
    resetLocalTableProps: PropTypes.func.isRequired
  };

  onChange(v, k) {
    const { localConfigs, resetLocalTableProps } = this.props;
    const changedLocalConfigs = {
      ...localConfigs,
      [k]: v
    };
    resetLocalTableProps(changedLocalConfigs);
  }

  render() {
    const { localConfigs } = this.props;
    const manageTableColumns = [
      {
        title: 'key',
        align: 'center',
        dataIndex: 'key'
      },
      {
        title: 'value',
        align: 'center',
        render: (value, values) => {
          const { key } = values;
          switch (key) {
            case 'bordered':
              return (
                <Switch
                  checked={values.value}
                  onChange={(e) => {
                    this.onChange(e, 'bordered');
                  }}
                />
              );
            case 'size':
              return (
                <RadioGroup
                  value={values.value}
                  onChange={(e) => { this.onChange(e.target.value, 'size'); }}
                >
                  <RadioButton
                    value="default"
                  >
                    Default
                  </RadioButton>
                  <RadioButton
                    value="middle"
                  >
                    Middle
                  </RadioButton>
                  <RadioButton
                    value="small"
                  >
                    Small
                  </RadioButton>
                </RadioGroup>
              );
            default:
              return null;
          }
        }
      }
    ];
    const dataSource = MANAGE_OTHER_TABLE_PROPS.map(k => (
      {
        key: k,
        value: localConfigs[k]
      }
    ));

    return (
      <Table
        bordered
        size="small"
        showHeader={false}
        pagination={false}
        columns={manageTableColumns}
        dataSource={dataSource}
      />
    );
  }
}
