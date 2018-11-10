import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Card, Button
} from 'antd';
import ManageSettingSwitch from '../ManageSettingSwitch';
import ManageSettingConfigs from '../ManageSettingConfigs';
import ManageSettingColumns from '../ManageSettingColumns';
import { translateLang } from '../../utils';

export default class ManageSettings extends React.Component {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    useLocal: PropTypes.bool.isRequired,
    showSearch: PropTypes.bool.isRequired,
    localConfigs: PropTypes.any.isRequired,
    localColumns: PropTypes.any.isRequired,
    resetLang: PropTypes.func.isRequired,
    resetLocalSettings: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onShow = this.onShow.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onResetAll = this.onResetAll.bind(this);
  }

  state = {
    visible: false,
    activeTabKey: 'local'
  };

  onShow() {
    this.setState({ visible: true });
  }

  onCancel() {
    this.setState({ visible: false });
  }

  onResetAll() {
    const { resetLocalSettings } = this.props;
    this.setState({ activeTabKey: 'local' });
    resetLocalSettings('all', null, false);
  }

  onTabChange(key) {
    this.setState({ activeTabKey: key });
  }

  render() {
    const {
      lang, useLocal, showSearch, iconType,
      localConfigs, localColumns, resetLang, resetLocalSettings
    } = this.props;
    const { visible, activeTabKey } = this.state;
    const tabBaseList = [
      {
        key: 'local',
        tab: translateLang(lang, 'Use Local Settings/Language')
      }
    ];
    const tabTableList = [
      {
        key: 'table',
        tab: translateLang(lang, 'Setting Table')
      },
      {
        key: 'columns',
        tab: translateLang(lang, 'Setting Columns')
      }
    ];
    const tabSearchList = [
      {
        key: 'search',
        tab: translateLang(lang, 'Setting Search')
      }
    ];
    let tabList = [];
    tabList = tabList.concat(tabBaseList);
    if (useLocal) {
      tabList = tabList.concat(tabTableList);
      if (showSearch) {
        tabList = tabList.concat(tabSearchList);
      }
    }

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
          okText={translateLang(lang, 'Reset All')}
          okType="danger"
          cancelText={translateLang(lang, 'Cancel')}
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
            {activeTabKey === 'local' && (
              <ManageSettingSwitch
                lang={lang}
                useLocal={useLocal}
                resetLang={resetLang}
                toggleLocalSwitch={resetLocalSettings}
              />
            )}
            {activeTabKey === 'table' && (
              <ManageSettingConfigs
                type="table"
                lang={lang}
                localConfigs={localConfigs}
                resetLocalConfigsProps={resetLocalSettings}
              />
            )}
            {activeTabKey === 'columns' && (
              <ManageSettingColumns
                lang={lang}
                localColumns={localColumns}
                resetLocalColumnsProps={resetLocalSettings}
              />
            )}
            {activeTabKey === 'search' && (
              <ManageSettingConfigs
                type="search"
                lang={lang}
                localConfigs={localConfigs}
                resetLocalConfigsProps={resetLocalSettings}
              />
            )}
          </Card>
        </Modal>
      </span>
    );
  }
}
