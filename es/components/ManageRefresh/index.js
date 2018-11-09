import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ManageRefresh = ({ iconType, handleClick }) => (
  <span style={{ marginLeft: 12 }}>
    <Button
      size="small"
      shape="circle"
      icon={iconType}
      onClick={handleClick}
    />
  </span>
);

ManageRefresh.propTypes = {
  iconType: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default ManageRefresh;
