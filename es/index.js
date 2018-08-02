import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';
import {
  localDefaultConfigs,
  tableDefaultProps,
  paginationDefaultProps
} from './configs';
import {
  LocalforageService
} from './services';
import {
  generateFullColumns,
  generateLocalColumns,
  generateColumns,
  generatePagination,
  generateOtherTableProps,
  generateLocalConfigs,
  generateSearchFullQuery,
  generateSearchQuery,
  generateQueryString
} from './utils';
import TableXSearch from './components/TableXSearch';
import TableXError from './components/TableXError';
// import TableXCore from './components/TableXCore';
import ManageSettings from './components/ManageSettings';
import ManageRefresh from './components/ManageRefresh';

export default class TableX extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    loading: PropTypes.bool,
    manage: PropTypes.any,
    data: PropTypes.array,
    pagination: PropTypes.any,
    tableProps: PropTypes.any,
    columns: PropTypes.array,
    formatQueryString: PropTypes.any,
    onRefresh: PropTypes.func,
    errors: PropTypes.any,
    searchOptions: PropTypes.any,
    realTime: PropTypes.any
  };

  static defaultProps = {
    name: 'TableX',
    manage: { visible: true },
    loading: false,
    data: null,
    columns: [],
    pagination: {},
    tableProps: {},
    formatQueryString: null,
    onRefresh: () => {},
    errors: {},
    searchOptions: [],
    realTime: true
  };

  constructor(props) {
    super(props);
    this.resetLocalTableProps = this.resetLocalTableProps.bind(this);
    this.resetLocalColumnsProps = this.resetLocalColumnsProps.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
    this.onRefreshProxy = this.onRefreshProxy.bind(this);
  }

  state = {
    columns: [],
    pagination: {},
    otherTableProps: {},
    localConfigs: {},
    localColumns: [],
    searchFullQuery: [],
    searchQuery: [],
    query: {},
    queryString: ''
  };

  componentWillMount() {
    this.initStateData();
  }

  componentWillReceiveProps(nextProps) {
    const { pagination: paginationState } = this.state; // todo... rules
    const { pagination: paginationProps } = nextProps;
    const pagination = generatePagination(
      paginationState, paginationProps
    );
    this.setState({ pagination });
  }

  onSetLocalConfigs(localConfigs) {
    const { name } = this.props;
    this.dbOfConfigs.set(name, localConfigs);
  }

  onSetLocalColumns(localColumns) {
    const { name } = this.props;
    this.dbOfColumns.set(name, localColumns);
  }

  onTableChange(pagination, filters, sorter) {
    const { searchQuery } = this.state;
    const query = {
      pagination, filters, sorter, searchQuery
    };
    const queryString = generateQueryString(query);
    this.setState({ pagination, query, queryString }, this.onRefreshProxy);
  }

  onChangeSearchQuery(searchFullQuery) {
    const { formatQueryString } = this.props;
    const { query: queryState } = this.state;
    const searchQuery = generateSearchQuery(searchFullQuery);
    const query = { ...queryState, searchQuery };
    const queryString = generateQueryString(query, formatQueryString);
    this.setState({
      searchFullQuery,
      searchQuery,
      query,
      queryString
    }, this.onRefreshProxy);
  }

  onRefreshProxy() {
    const { onRefresh } = this.props;
    const { query, queryString } = this.state;
    console.log(query, 'query');
    console.log(queryString, 'queryString');
    onRefresh(query, queryString);
  }

  initStateData() {
    const {
      name,
      tableProps,
      columns: columnsProps,
      pagination: paginationProps,
      searchOptions,
      formatQueryString
    } = this.props;
    this.dbOfConfigs = new LocalforageService(localDefaultConfigs.configsStorageName);
    this.dbOfColumns = new LocalforageService(localDefaultConfigs.columnsStorageName);
    Promise.all([
      this.dbOfConfigs.get(name),
      this.dbOfColumns.get(name)
    ])
      .then(([preLocalConfigs, preLocalColumns]) => {
        const fullColumns = generateFullColumns(columnsProps, preLocalColumns);
        const localColumns = generateLocalColumns(fullColumns);
        const columns = generateColumns(fullColumns);
        const pagination = generatePagination(
          paginationDefaultProps, paginationProps, preLocalConfigs
        );
        const otherTableProps = generateOtherTableProps(
          tableDefaultProps, tableProps, preLocalConfigs
        );
        const localConfigs = generateLocalConfigs(pagination, otherTableProps);
        // todo...根据 searchOptions 生成 searchFullQuery, 再生成 searchQuery, 和 pageQuery 一起注入 query
        const searchFullQuery = generateSearchFullQuery(searchOptions);
        const searchQuery = generateSearchQuery(searchFullQuery);
        const query = { pagination, searchQuery };
        const queryString = generateQueryString(query, formatQueryString);
        this.setState({
          localConfigs,
          localColumns,
          columns,
          pagination,
          otherTableProps,
          searchFullQuery,
          searchQuery,
          query,
          queryString
        }, this.onRefreshProxy);
        this.onSetLocalConfigs(localConfigs);
        this.onSetLocalColumns(localColumns);
      })
      .catch((e) => {
        console.log(e); // eslint-disable-line
      });
  }

  resetLocalTableProps(preLocalConfigs) {
    const { pagination, tableProps } = this.props;
    const otherTableProps = generateOtherTableProps(
      tableDefaultProps, tableProps, preLocalConfigs
    );
    const localConfigs = generateLocalConfigs(pagination, otherTableProps);
    this.setState({
      otherTableProps, localConfigs
    });
    this.onSetLocalConfigs(localConfigs);
  }

  resetLocalColumnsProps(preLocalColumns) {
    const { columns: columnsProps } = this.props;
    const fullColumns = generateFullColumns(columnsProps, preLocalColumns);
    const localColumns = generateLocalColumns(fullColumns);
    const columns = generateColumns(fullColumns);
    this.setState({
      localColumns, columns
    });
    this.onSetLocalColumns(localColumns);
  }

  render() {
    const {
      loading, data, errors, manage, searchOptions, realTime
    } = this.props;
    const {
      columns, pagination, otherTableProps, localConfigs, localColumns,
      searchFullQuery, searchQuery
    } = this.state;
    const { visible, title, core } = manage;
    let manageTitle;
    let manageCore;
    if (visible) {
      manageTitle = title;
      manageCore = core || (
        <div>
          <ManageSettings
            iconType="setting"
            localConfigs={localConfigs}
            localColumns={localColumns}
            resetLocalTableProps={this.resetLocalTableProps}
            resetLocalColumnsProps={this.resetLocalColumnsProps}
          />
          <ManageRefresh
            iconType="reload"
            handleClick={this.onRefreshProxy}
          />
        </div>
      );
    } else {
      manageTitle = null;
      manageCore = null;
    }

    return (
      <div className="ant-table-x">
        <TableXSearch
          realTime={realTime}
          searchQuery={searchQuery}
          searchOptions={searchOptions}
          searchFullQuery={searchFullQuery}
          onChangeSearchQuery={this.onChangeSearchQuery}
        />
        <TableXError
          errors={errors}
          handleClick={this.onRefreshProxy}
        />
        <Card
          bodyStyle={{ padding: 0 }}
          title={manageTitle}
          extra={manageCore}
        >
          <Table
            dataSource={data}
            columns={columns}
            pagination={pagination}
            loading={loading}
            onChange={this.onTableChange}
            rowKey={t => t[columns[0].dataIndex]}
            {...otherTableProps}
          />
        </Card>
      </div>
    );
  }
}
