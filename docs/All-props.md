---
order: 1
title: all props
---

#### [English](./All-props.md) | [简体中文](./All-props.zhCN.md)

## API
### TableX

|Property|Description|Type|Default|
|---|---|---|---|
|name|Unique key of this Tablex, Unique key to save local configuration|string|'TableX'|
|columns|Columns of table, same as [columns of table](https://ant.design/components/table/#API)|ColumnProps[\]|[]|
|dataSource|Data record array to be displayed, same as [dataSource of table](https://ant.design/components/table/#API)|	any[]|[]
|tableRowKey|Row's unique key, [rowKey of table](https://ant.design/components/table/#API), Default first column's dataIndex|string|Function(record):string|(r => (r[columns[0].dataIndex])|
|tableTitle|Tablex' title, [title of card](https://ant.design/components/card/#API)|string|ReactNode|-|
|tableProps|Other table props except columns, dataSource, rowKey pagination, loading and onChange, other props same as [API of table](https://ant.design/components/table/#API)|object|{}|
|showPagination|Whether to show table pagination|boolean|true|
|paginationTotal|Total number of data items, same as [total of pagination](https://ant.design/components/pagination/#API)|number|0|
|showSearch|Whether to show table search|boolean|true|
|searchOptions|Search options|[SearchProps](#search)[\]|[]|searchRealTime|Whether to search real-time, if is false, a search button will be displayed|boolean|true|
|loading|Loading status of table, same as [loading of table](https://ant.design/components/table/#API)|boolean|false|
|onChange|Callback executed when search, pagination, filters or sorter is changed, here is [details](#onChange)|Function(searchQuery, pagination, filters, sorter, extra: { currentDataSource: [] })||
|errorMessage|Show error message when get a bad request|string|''|
|locale|Language of this table, values: 'enUS' 'zhCN'|string|'enUS'|

***
### search

|Property|Description|Type|Default|
|---|---|---|---|
|title|Search item's Label text, registered with title of columns|string||
|type|Search item's type, values: 'text', 'textArea', 'number', 'select', 'date'|string|'text'|
|keyword|Search key of this item, will be used in searchQuery at [onChange of Tablex](#onChange)|string||
|predicates|Select predicates of this item, type as [sequelize's Op](http://docs.sequelizejs.com/manual/tutorial/querying.html)|array||
|defaultPredicate|Default predicate of this item|string||
|customProps|If type is select, you can add selectOptions in this property, if type is date, you can also add showTime props in this property|object||
|defaultValue|Default value of this item|string||

***
### onChange

when search, pagination, filters or sorter is changed, you can use onChange to control data.

arguments includes searchQuery, pagination, filter, sorter, extra.

searchQuery is a array like
```javascript
[
    {
        keyword: 'xxx',
        preducate: '$eq',
        value: 'xxx'
    }
]
```
pagination, filters, sorter and extra as same like [onChange of table](#https://ant.design/components/table/#API)

