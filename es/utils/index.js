import qs from 'qs';
import pick from 'lodash/pick';
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import {
  MANAGE_COLUMN_PROPS_DEFAULT,
  MANAGE_COLUMN_PROPS,
  MANAGE_PAGINATION_PROPS,
  MANAGE_OTHER_TABLE_PROPS
} from '../constants';
// generate query
export const generatePageQuery = (pagination) => {
  const { current, pageSize } = pagination;
  if (current && pageSize) {
    return {
      limit: pageSize,
      offset: (current - 1) * pageSize
    };
  }
  return null;
};

// generate global state
export const generateFullColumns = (columnsProps, localColumns) => {
  if (!isArray(localColumns) || localColumns.length <= 0) {
    return columnsProps.map(item => (merge({ ...item }, MANAGE_COLUMN_PROPS_DEFAULT)));
  }
  return columnsProps.map((item) => {
    const filterLocalItem = filter(localColumns, i => (i.title === item.title))[0] || {};
    return merge({ ...item }, MANAGE_COLUMN_PROPS_DEFAULT, filterLocalItem);
  });
};

export const generateLocalColumns = fullColumns => (
  fullColumns.map(item => (pick(item, MANAGE_COLUMN_PROPS)))
);

export const generateColumns = fullColumns => (fullColumns.filter(item => (item.show)));

export const generatePagination = (paginationDefaultProps, paginationProps, localConfigs) => {
  const paginationLocalConfigs = pick(localConfigs, MANAGE_PAGINATION_PROPS);
  return merge({ ...paginationDefaultProps }, paginationProps, paginationLocalConfigs);
};

export const generateOtherTableProps = (tableDefaultProps, tableProps, localConfigs) => {
  const tableLocalProps = pick(localConfigs, MANAGE_OTHER_TABLE_PROPS);
  return merge({ ...tableDefaultProps }, tableProps, tableLocalProps);
};

export const generateLocalConfigs = (pagination, otherTableProps) => {
  const pagiLocalConfigs = pick(pagination, MANAGE_PAGINATION_PROPS);
  const tableLocalConfigs = pick(otherTableProps, MANAGE_OTHER_TABLE_PROPS);
  return merge(pagiLocalConfigs, tableLocalConfigs);
};

export const generateSearchOptions = () => ([]); // todo...

export const generateQueryString = (query, formatQueryString) => {
  if (isFunction(formatQueryString)) {
    return formatQueryString(query);
  }
  const { pagination/*, filters, sorter, searchOptions*/ } = query;
  const useFullQuery = generatePageQuery(pagination);
  return `?${qs.stringify(useFullQuery)}`;
};

/* eslint-disable */
// 生成 uuid
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const compareDiff = () => {};

export const generateRealColumns = () => {};
