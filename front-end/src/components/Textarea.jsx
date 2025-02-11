import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ name, placeholder, rows, value, onChange }) => {
  return (
    <div className="form-group">
      <textarea
        className="form-control"
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  placeholder: '',
  rows: 3,
};

export default Textarea;