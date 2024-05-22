import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/auth/authOperations";
import { useNavigate } from "react-router-dom";
import { clearError } from "../redux/auth/authSlice";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Nieprawidłowy adres e-mail"
    )
    .required("Pole obowiązkowe"),
  password: Yup.string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .required("Pole obowiązkowe"),
});

export const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const initialValues = { email: "", password: "" };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    const result = await dispatch(logIn(values));
    console.log(result.payload.message);
    setSubmitting(false);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SigninSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form style={{ width: "100%", maxWidth: 360 }}>
            {error === "Rejected" && (
              <Typography color="error" variant="body2">
                Email or password invalid
              </Typography>
            )}
            <Field
              as={TextField}
              name="email"
              type="email"
              label="Email*"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              margin="normal"
            />
            <Field
              as={TextField}
              name="password"
              type="password"
              label="Hasło*"
              fullWidth
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
            >
              Logowanie
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
