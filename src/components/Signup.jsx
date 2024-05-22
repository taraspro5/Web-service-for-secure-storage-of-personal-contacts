import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";
import { useNavigate } from "react-router-dom";
import { clearError } from "../redux/auth/authSlice";

const SignupSchema = Yup.object().shape({
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

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    const result = await dispatch(register(values));
    console.log(result);
    if (result.error && result.payload.message === "Email in use") {
      setFieldError("email", "Email jest zajety");
    } else if (!result.error) {
      resetForm();
      navigate("/");
    }

    setSubmitting(false);
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
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldError }) => (
          <Form style={{ width: "100%", maxWidth: 360 }}>
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
              color="primary"
              disabled={isSubmitting}
            >
              Rejestracja
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
