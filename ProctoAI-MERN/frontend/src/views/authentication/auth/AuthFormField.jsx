import React from 'react';
import { TextField, Checkbox, Select, MenuItem } from '@mui/material';

const AuthFormField = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
  fullWidth,
  ...props
}) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <TextField
          id={id}
          name={name}
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          required={required}
          fullWidth={fullWidth}
          {...props}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          required={required}
          fullWidth={fullWidth}
          {...props}
        />
      );
    case 'select':
      return (
        <Select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          required={required}
          fullWidth={fullWidth}
          {...props}
        >
          {props.children}
        </Select>
      );
    default:
      return null;
  }
};

export default AuthFormField;