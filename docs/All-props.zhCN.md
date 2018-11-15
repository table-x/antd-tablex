---
order: 2
title: all props
---

#### [English](./All-props.md) | [简体中文](./All-props.zhCN.md)
## API


### TableX

|参数|说明|	类型|默认值|
|---|---|---|---|
|name|该 Tablex 的唯一 key 值，本地设置时会用这个将设置保存到本地|string|'TableX'|
|columns|表格列的配置描述，格式与 [antd 的 table colomns](https://ant.design/components/table-cn/#Column) 一致|ColumnProps[\]|[]|
|dataSource|数据数组，格式与[ antd 的 table dataSource](https://ant.design/components/table-cn/#API) 一致|	any[]|[]
|tableRowKey|表格行 key 的取值，可以是字符串或一个函数，格式与 [antd 的 table rowKey](https://ant.design/components/table-cn/#API) 一致， 默认为 columns 的第一列的 dataIndex|string|Function(record):string|(r => (r[columns[0].dataIndex])|
|tableTitle|Tablex 的title，格式与 [title of card](https://ant.design/components/card-cn/#API) 一致|string|ReactNode|-|
|tableProps|表格的其他属性，不包括 columns、dataSource、rowKey、pagination、loading and onChange，与 [API of table](https://ant.design/components/table-cn/#API) 一致|object|{}|
|showPagination|是否显示分页|boolean|true|
|paginationTotal|数据总数，与 [total of pagination](https://ant.design/components/pagination-cn/#API) 一致|number|0|
|showSearch|是否显示搜索项|boolean|true|
|searchOptions|搜索项，详情见[search options](#search)|[SearchProps](#search)[\]|[]|
|searchRealTime|是否即时搜索，如果为 false，会显示搜索按钮|boolean|true|
|loading|表格loading状态，与 [loading of table](https://ant.design/components/table-cn/#API) 一致|boolean|false|
|onChange|搜索、分页、排序、筛选变化时触发，[详情](#onChange)如下|Function(searchQuery、pagination、filters、sorter、 extra: { currentDataSource: [] })||
|errorMessage|如果异步请求失败，显示报错信息，点击会刷新页面|string|''|
|locale|语言选择，可选'enUS' 'zhCN'|string|'enUS'|

***
### search

API
|参数|说明|	类型|默认值|
|---|---|---|---|
|title|搜索项的 label 值，与表格列的 title 对应|string||
|type|搜索项类型，可选：'text'、'textArea'、'number'、'select'、'date'|string|'text'|
|keyword|搜索项的关键词，将作为 searchQuery 的一部分在 [onChange](#onChange) 回调时传出|string||
|predicates|可以对比的符号，格式按照 [sequelize 的 Op](http://docs.sequelizejs.com/manual/tutorial/querying.html)|array||
|defaultPredicate|默认显示的符号|||
|customProps|如果搜索项为select，可以在此配置 selectOptions ，如果是 date，可以配置 showTime 等属性。|||
|defaultValue|搜索项默认值|||

***
### onChange

当搜索搜索、分页、排序、筛选变化时，可以用此函数进行数据处理。

参数包含了 searchQuery、pagination、filter、sorter、extra。

searchQuery 是一个类似下面示例的数组
```javascript
[
    {
        keyword: 'xxx',
        preducate: '$eq',
        value: 'xxx'
    }
]
```
pagination、filters、sorter 和 extra 与 antd table 的 [onChange](#https://ant.design/components/table-cn/#API) 回调函数一致。

