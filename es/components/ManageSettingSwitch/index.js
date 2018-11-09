import React from 'react';
import PropTypes from 'prop-types';
import { Table, Switch } from 'antd';

export default class ManageSettingSwitch extends React.Component {
  static propTypes = {
    useLocal: PropTypes.bool.isRequired,
    toggleLocalSwitch: PropTypes.func.isRequired
  };

  onChange(v) {
    const { toggleLocalSwitch } = this.props;
    toggleLocalSwitch('all', null, v);
  }

  render() {
    const { useLocal } = this.props;
    const manageSwitch = [
      {
        title: 'key',
        align: 'center',
        dataIndex: 'key'
      },
      {
        title: 'value',
        align: 'center',
        render: () => (
          <Switch
            checked={useLocal}
            onChange={(e) => {
              this.onChange(e);
            }}
          />
        )
      }
    ];
    const dataSource = [{
      key: 'Use Local Settings',
      value: useLocal
    }];

    return (
      <Table
        bordered
        size="small"
        showHeader={false}
        pagination={false}
        columns={manageSwitch}
        dataSource={dataSource}
      />
    );
  }
}
