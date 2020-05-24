import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import classNames from '../../helpers/classNames';

export const Button = ({
  variant,
  value,
  onClick,
  size,
  className,
  children,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick && onClick();
  };

  const styleClasses = () => (
    classNames(
      styles.root,
      styles[size],
      className || styles[variant],
    )
  );

  return (
    <button
      className={styleClasses()}
      onClick={handleClick}
      type="submit"
    >
      { children || value }
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.any,

};

Button.defaultProps = {
  onClick: () => {},
  size: 'medium',
  variant: 'primary',
  className: '',
  loading: false,
  children: null,
};
