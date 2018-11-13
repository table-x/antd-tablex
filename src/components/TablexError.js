import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const TablexError = ({ errorMessage, handleClick }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div
      role="button"
      tabIndex={-1}
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      onKeyDown={() => {}}
    >
      <Alert
        type="error"
        showIcon
        message={errorMessage}
      />
    </div>
  );
};

TablexError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default TablexError;
