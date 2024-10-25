import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { MenuItem } from '@mui/material';
import AuthFormField from './AuthFormField';
import AuthAPI from './AuthAPI';

const AuthRegister = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box component="form">
        <Stack mb={1}>
          <AuthFormField
            id="name"
            name="name"
            type="text"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name ? true : false}
            helperText={touched.name && errors.name ? errors.name : null}
            required
            fullWidth
          />
          <AuthFormField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? true : false}
            helperText={touched.email && errors.email ? errors.email : null}
            required
            fullWidth
          />
          <AuthFormField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? true : false}
            helperText={touched.password && errors.password ? errors.password : null}
            required
            fullWidth
          />
          <AuthFormField
            id="confirm_password"
            name="confirm_password"
            type="password"
            label="Confirm Password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirm_password && errors.confirm_password ? true : false}
            helperText={
              touched.confirm_password && errors.confirm_password ? errors.confirm_password : null
            }
            required
            fullWidth
          />
          <AuthFormField
            id="role"
            name="role"
            type="select"
            label="Role"
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.role && errors.role ? true : false}
            helperText={touched.role && errors.role ? errors.role : null}
            required
            fullWidth
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </AuthFormField>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;