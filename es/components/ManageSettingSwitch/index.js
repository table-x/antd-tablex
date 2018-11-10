import React from 'react';
import PropTypes from 'prop-types';
import { Table, Switch, Radio } from 'antd';
import { translateWords } from '../../utils';

const { Group: RadioGroup, Button: RadioButton } = Radio;

export default class ManageSettingSwitch extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    useLocal: PropTypes.bool.isRequired,
    resetLang: PropTypes.func.isRequired,
    toggleLocalSwitch: PropTypes.func.isRequired
  };

  onChange(v) {
    const { toggleLocalSwitch } = this.props;
    toggleLocalSwitch('all', null, v);
  }

  onLanguageChange(value) {
    const { resetLang } = this.props;
    resetLang(value);
  }

  render() {
    const { lang, useLocal } = this.props;
    const manageSwitch = [
      {
        title: 'key',
        align: 'center',
        dataIndex: 'key',
        render: (value) => (translateWords(lang, value))
      },
      {
        title: 'value',
        align: 'center',
        render: (value, values) => {
          const { key } = values;
          switch (key) {
            case 'Use Local Settings':
              return (
                <Switch
                  checked={useLocal}
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                />
              );
            case 'Language':
              return (
                <RadioGroup
                  value={values.value}
                  onChange={(e) => { this.onLanguageChange(e.target.value); }}
                >
                  <RadioButton
                    value="enUS"
                  >
                    English
                  </RadioButton>
                  <RadioButton
                    value="zhCN"
                  >
                    简体中文
                  </RadioButton>
                </RadioGroup>
              );
            default:
              return null;
          }
        }
      }
    ];
    const dataSource = [
      {
        key: 'Use Local Settings',
        value: useLocal
      },
      {
        key: 'Language',
        value: lang
      }
    ];

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
