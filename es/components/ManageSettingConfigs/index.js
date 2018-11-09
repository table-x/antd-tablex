import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Switch, Radio
} from 'antd';
import {
  localConfigOfTableKeys,
  localConfigOfSearchKeys
} from '../../constants';

const { Group: RadioGroup, Button: RadioButton } = Radio;

export default class ManageSettingConfigs extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    localConfigs: PropTypes.object.isRequired,
    resetLocalConfigsProps: PropTypes.func.isRequired
  };

  onChange(v, k) {
    const { localConfigs, resetLocalConfigsProps } = this.props;
    const changedLocalConfigs = {
      ...localConfigs,
      [k]: v
    };
    resetLocalConfigsProps('configs', changedLocalConfigs);
  }

  render() {
    const { type, localConfigs } = this.props;
    const manageTable = [
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
            case 'realTime':
              return (
                <Switch
                  checked={values.value}
                  onChange={(e) => {
                    this.onChange(e, 'realTime');
                  }}
                />
              );
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
    const localConfigKeys = type === 'search' ? localConfigOfSearchKeys : localConfigOfTableKeys;
    const dataSource = localConfigKeys.map(k => (
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
        columns={manageTable}
        dataSource={dataSource}
      />
    );
  }
}
