import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Card, Button
} from 'antd';
import ManageSettingTable from '../ManageSettingTable';
import ManageSettingColumns from '../ManageSettingColumns';

export default class ManageSettings extends React.Component {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    localConfigs: PropTypes.any.isRequired,
    localColumns: PropTypes.any.isRequired,
    resetLocalTableProps: PropTypes.func.isRequired,
    resetLocalColumnsProps: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onShow = this.onShow.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onResetAll = this.onResetAll.bind(this);
    this.state = {
      visible: false,
      activeTabKey: 'columns',
      tabList: [
        {
          key: 'table',
          tab: 'Setting Table'
        },
        {
          key: 'columns',
          tab: 'Setting Columns'
        },
        {
          key: 'search',
          tab: 'Setting Search'
        }
      ]
    };
  }

  onShow() {
    this.setState({ visible: true });
  }

  onCancel() {
    this.setState({ visible: false });
  }

  onResetAll() {
    const { resetLocalTableProps, resetLocalColumnsProps } = this.props;
    resetLocalTableProps();
    resetLocalColumnsProps();
  }

  onTabChange(key) {
    this.setState({ activeTabKey: key });
  }

  render() {
    const {
      iconType, localConfigs, localColumns, resetLocalTableProps, resetLocalColumnsProps
    } = this.props;
    const { visible, tabList, activeTabKey } = this.state;

    return (
      <span style={{ marginLeft: 12 }}>
        <Button
          size="small"
          shape="circle"
          icon={iconType}
          onClick={this.onShow}
        />
        <Modal
          title="Setting"
          visible={visible}
          okText="Reset All"
          okType="danger"
          onCancel={this.onCancel}
          onOk={this.onResetAll}
        >
          <Card
            bordered={false}
            bodyStyle={{ padding: '24px 0 0' }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => { this.onTabChange(key); }}
          >
            {activeTabKey === 'table' && (
              <ManageSettingTable
                localConfigs={localConfigs}
                resetLocalTableProps={resetLocalTableProps}
              />
            )}
            {activeTabKey === 'columns' && (
              <ManageSettingColumns
                localColumns={localColumns}
                resetLocalColumnsProps={resetLocalColumnsProps}
              />
            )}
          </Card>
        </Modal>
      </span>
    );
  }
}
