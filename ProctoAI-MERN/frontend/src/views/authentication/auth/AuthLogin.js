import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import AuthFormField from './AuthFormField';
import AuthAPI from './AuthAPI';

const AuthLogin = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <AuthFormField
          id="username"
          name="email"
          type="email"
          label="Username"
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
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember this Device" />
          </FormGroup>
          <Typography
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;