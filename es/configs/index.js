const localDefaultConfigs = {
  configsStorageName: 'antd_tablex_configs_storage',
  columnsStorageName: 'antd_tablex_columns_storage'
};

const tableDefaultProps = {
  bordered: false,
  size: 'default'
};

const paginationDefaultProps = {
  current: 1,
  pageSize: 20,
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条` //todo
};

export {
  localDefaultConfigs,
  tableDefaultProps,
  paginationDefaultProps
};
