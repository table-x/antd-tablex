import pick from 'lodash/pick';
import merge from 'lodash/merge';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';
import { defaultPagination, localColumnExtends } from '../constants';

// generate columns
export const generateFullColumns = (columnsProps, localColumns) => {
  if (!isArray(localColumns) || localColumns.length <= 0) {
    return columnsProps.map(item => (merge({ ...item }, localColumnExtends)));
  }
  return columnsProps.map((item) => {
    const filterLocalItem = filter(localColumns, i => (i.title === item.title))[0] || {};
    return merge({ ...item }, localColumnExtends, filterLocalItem);
  });
};

export const generateFilterColumnsByFull = fullColumns => (
  fullColumns.filter(item => (item.show))
);

export const generateLocalColumnsByFull = (fullColumns) => (
  fullColumns.map(item => (pick(item, ['title', 'show', 'align'])))
);

// generate search
export const generateSearchQuery = searchOpts => (
  searchOpts.map(option => ({
    keyword: option.keyword,
    predicate: option.defaultPredicate,
    value: option.defaultValue
  }))
);

// generate state
export const generateStateOfColumns = (columns, preLocalColumns) => {
  const fullColumns = generateFullColumns(columns, preLocalColumns);
  const filterColumns = generateFilterColumnsByFull(fullColumns);
  const localColumns = generateLocalColumnsByFull(fullColumns);

  return {
    columns,
    fullColumns,
    filterColumns,
    localColumns
  };
};

export const generateStateOfPagination = (showPagination, paginationTotal, preLocalConfigs) => {
  let pagination;
  if (showPagination) {
    let defaultPageSizeObj = {};
    if (preLocalConfigs && preLocalConfigs.pageSize) {
      defaultPageSizeObj = {
        pageSize: preLocalConfigs.pageSize
      };
    }
    pagination = merge({ ...defaultPagination }, {
      total: paginationTotal > 0 ? paginationTotal : undefined
    }, defaultPageSizeObj);
  } else {
    pagination = false;
  }
  return {
    pagination
  };
};

export const generateStateOfSearch = (showSearch, searchOptions, searchRealTime, preLocalConfigs) => {
  const searchOpts = cloneDeep(searchOptions);
  let realTime = true;
  let searchQuery = [];
  if (showSearch) {
    if (preLocalConfigs && preLocalConfigs.realTime === 'false') {
      realTime = false;
    } else {
      realTime = searchRealTime;
    }
    searchQuery = generateSearchQuery(searchOpts);
  }
  return {
    searchOpts,
    searchQuery,
    realTime
  };
};




