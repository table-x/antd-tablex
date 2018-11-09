import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import { LocalForage, LocalStorage } from './services';
import {
  generateStateOfColumns,
  generateStateOfPagination,
  generateStateOfSearch
} from './utils';
import TablexSearch from './components/TablexSearch';
import TablexError from './components/TablexError';
import ManageSettings from './components/ManageSettings';
import ManageRefresh from './components/ManageRefresh';
import { defaultLocalConfigs } from './constants';

function noop() {}

export default class TableX extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    tableRowKey: PropTypes.func,
    tableTitle: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    tableProps: PropTypes.any,
    showPagination: PropTypes.bool,
    paginationTotal: PropTypes.number,
    showSearch: PropTypes.bool,
    searchOptions: PropTypes.array,
    searchRealTime: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string
  };

  static defaultProps = {
    name: 'TableX',
    columns: [],
    dataSource: [],
    tableRowKey: noop,
    tableTitle: null,
    tableProps: {},
    showPagination: true,
    paginationTotal: -1,
    showSearch: true,
    searchOptions: [],
    searchRealTime: true,
    loading: false,
    onChange: noop,
    errorMessage: ''
  };

  constructor(props) {
    super(props);
    this.onTableChange = this.onTableChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFetchData = this.onFetchData.bind(this);
    this.resetLocalSettings = this.resetLocalSettings.bind(this);
  }

  state = {
    useLocal: false,
    columns: [],
    fullColumns: [],
    filterColumns: [],
    localColumns: [],
    pagination: false,
    searchOpts: [],
    searchQuery: [],
    realTime: true,
    localConfigs: {}
  };

  componentWillMount() {
    this.onInitWithoutLocal();
  }

  componentDidMount() {
    this.onInitLocal();
  }

  componentWillReceiveProps() {
    const { columns, fullColumns } = this.state;
    console.log(columns, fullColumns);
  }

  onInitWithoutLocal() {
    const {
      columns, showPagination, paginationTotal,
      showSearch, searchOptions, searchRealTime
    } = this.props;

    const { fullColumns, filterColumns, localColumns } = generateStateOfColumns(columns);
    const { pagination } = generateStateOfPagination(showPagination, paginationTotal);
    const { searchOpts, searchQuery, realTime } = generateStateOfSearch(showSearch, searchOptions, searchRealTime);
    const localConfigs = { ...defaultLocalConfigs };

    this.setState({
      columns,
      fullColumns,
      filterColumns,
      localColumns,
      pagination,
      searchOpts,
      searchQuery,
      realTime,
      localConfigs
    });
  }

  onInitLocal() {
    const {
      name, columns, showPagination, paginationTotal,
      showSearch, searchOptions, searchRealTime
    } = this.props;
    this.storageService = new LocalStorage();
    const useLocal = Boolean(this.storageService.get(`tablex-${name}`));
    this.dbOfColumns = new LocalForage('antd_tablex_columns_storage');
    this.dbOfConfigs = new LocalForage('antd_tablex_configs_storage');
    if (useLocal) {
      Promise.all([
        this.dbOfColumns.get(name),
        this.dbOfConfigs.get(name)
      ])
        .then(([preLocalColumns, preLocalConfigs]) => {
          const { fullColumns, filterColumns, localColumns } = generateStateOfColumns(columns, preLocalColumns);
          const { pagination } = generateStateOfPagination(showPagination, paginationTotal, preLocalConfigs);
          const { searchOpts, searchQuery, realTime } = generateStateOfSearch(showSearch, searchOptions, searchRealTime);
          const localConfigs = preLocalConfigs || { ...defaultLocalConfigs };
          this.setState({
            useLocal,
            fullColumns,
            filterColumns,
            localColumns,
            pagination,
            searchOpts,
            searchQuery,
            realTime,
            localConfigs
          });
        });
    }
  }

  onTableChange(pagination, filters, sorter, extra) {
    console.log(pagination, filters, sorter, extra);
    const { onChange } = this.props;
    const { searchOpts } = this.state;
    this.setState({ pagination, filters, sorter, extra }, () => {
      onChange(searchOpts, pagination, filters, sorter, extra);
    });
  }

  onSearchChange() {
    const { onChange } = this.props;
    const { searchQuery, pagination: oldPagination } = this.state;
    const pagination = {
      pageSize: 1,
      ...oldPagination
    };
    this.setState({ pagination}, () => {
      onChange(searchQuery, pagination);
    });
  }

  onFetchData() {
    const { onChange } = this.props;
    const { searchQuery, pagination, filters, sorter, extra } = this.state;
    onChange(searchQuery, pagination, filters, sorter, extra);
  }

  toggleLocalSwitch() {
    const { useLocal } = this.state;
    this.setState({ useLocal: !useLocal });
  }

  resetLocalSettings(type, values, useLocal) {
    const { columns, name } = this.props;
    switch (type) {
      case 'all': {
        const { fullColumns, filterColumns, localColumns } = generateStateOfColumns(columns);
        this.setState({
          useLocal,
          fullColumns,
          filterColumns,
          localColumns,
          localConfigs: {...defaultLocalConfigs}
        }, () => {
          if (useLocal) {
            this.storageService.set(`tablex-${name}`, 'true');
          } else {
            this.dbOfConfigs.remove(name);
            this.dbOfColumns.remove(name);
            this.storageService.remove(`tablex-${name}`);
          }
        });
        break;
      }
      case 'configs':
        this.setState({
          realTime: values.realTime,
          localConfigs: values
        }, () => {
          this.dbOfConfigs.set(name, values);
        });
        break;
      case 'columns': {
        const { fullColumns, filterColumns, localColumns } = generateStateOfColumns(columns, values);
        this.setState({
          fullColumns,
          filterColumns,
          localColumns
        }, () => {
          this.dbOfColumns.set(name, localColumns);
        });
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      dataSource, tableRowKey, tableTitle, tableProps: tableOtherProps,
      showSearch, loading, errorMessage
    } = this.props;
    const {
      useLocal, filterColumns, localColumns, pagination, localConfigs,
      searchOpts, searchQuery, realTime
    } = this.state;

    const { bordered, size } = localConfigs;
    const rowKey = (tableRowKey === noop) ? (t => (t[filterColumns[0].dataIndex])) : tableRowKey;

    const manager = (
      <div>
        <ManageRefresh
          iconType="reload"
          handleClick={this.onFetchData}
        />
        <ManageSettings
          iconType="setting"
          useLocal={useLocal}
          showSearch={showSearch}
          localConfigs={localConfigs}
          localColumns={localColumns}
          resetLocalSettings={this.resetLocalSettings}
        />
      </div>
    );

    return (
      <div className="ant-table-x">
        {showSearch && (
          <TablexSearch
            realTime={realTime}
            searchOptions={searchOpts}
            searchQuery={searchQuery}
            onChange={this.onSearchChange}
          />
        )}
        <TablexError
          errorMessage={errorMessage}
          handleClick={this.onFetchData}
        />
        <Card
          title={tableTitle}
          extra={manager}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            dataSource={dataSource}
            columns={filterColumns}
            pagination={pagination}
            loading={loading}
            rowKey={rowKey}
            onChange={this.onTableChange}
            bordered={bordered}
            size={size}
            {...tableOtherProps}
          />
        </Card>
      </div>
    );
  }
}
