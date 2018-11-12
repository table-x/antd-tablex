export const defaultLocalLangKey = 'tablexLanguage';

export const defaultColumnsKeyOfDB = 'antd_tablex_columns_storage';

export const defaultConfigsKeyOfDB = 'antd_tablex_configs_storage';

export const defaultLocalConfigs = {
  pageSize: 50,
  realTime: true,
  bordered: false,
  size: 'default'
};

export const defaultPagination = {
  current: 1,
  pageSize: 50,
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `Total ${total}  ` // todo... language
};

export const localColumnExtends = {
  show: true,
  align: 'left'
};

export const localColumnKeys = ['title', 'show', 'align'];

export const localConfigOfTableKeys = ['bordered', 'size'];

export const localConfigOfSearchKeys = ['realTime'];
