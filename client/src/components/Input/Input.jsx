import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

export const Input = ({
  onChange = () => {},
  value,
  label,
  placeholder,
  classNames = {},
  field,
  question,
  ...props
}) => {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className={[styles.root, classNames.root].join(' ')}>
      <label
        htmlFor="input"
        className={[styles.label, classNames.label, question ? styles.question: ''].join(' ')}
        data-testid="test-label"
      >
        {label}
      </label>
      <input
        name="input"
        type="text"
        placeholder={placeholder}
        className={[styles.input, classNames.input].join(' ')}
        value={value}
        onChange={handleChange}
        {...props}
        {...field}
      />
    </div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  question: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classNames: PropTypes.exact({
    root: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string,
  }),
  field: PropTypes.any,
};

Input.defaultProps = {
  onChange: () => {},
  question: false,
  value: '',
  label: '',
  placeholder: '',
  classNames: {
    root: '',
    label: '',
    input: '',
  },
  field: null,
};
