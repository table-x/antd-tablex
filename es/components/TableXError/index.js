import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';


const TableXError = ({ errors, handleClick }) => {
  const { message } = errors;
  if (!message) {
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
        message={message}
      />
    </div>
  );
};

TableXError.propTypes = {
  errors: PropTypes.shape({
    message: PropTypes.string
  }),
  handleClick: PropTypes.func.isRequired
};

TableXError.defaultProps = {
  errors: {
    message: ''
  }
};

export default TableXError;
