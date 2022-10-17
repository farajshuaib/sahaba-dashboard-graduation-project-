import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { loginSchema } from "../services/validations";

// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import banner from "../assets/SAHABA.png";
import { useAppDispatch } from "../app/hooks";
import { login } from "../app/account/actions";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Input from "../shared/Input/Input";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  return (
    <div
      data-testid="loginComponent"
      className="flex items-center justify-center h-screen w-full"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          try {
            await dispatch(login(values));
            setSubmitting(false);
            navigate("/");
          } catch (err: any) {
            setError(
              err.response?.data?.message ||
                "something went wrong please try again later"
            );

            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="flex items-center md:h-3/4 w-11/12 md:w-3/4 bg-gray100 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 lg:p-16 ">
              
              <Form>
                <div className="my-5 w-full">
                  <label htmlFor="email" className="input-lable">
                    Email
                  </label>
                  <Input
                    required
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    className={`input my-1 ${
                      errors.email && touched.email && "border-red-600"
                    }`}
                  />
                  <ErrorMessage
                    component={"p"}
                    className="error-text"
                    name="email"
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="password" className="input-lable">
                    Password
                  </label>
                  <Input
                    required
                    name="password"
                    type="password"
                    id="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    autoComplete="current-password"
                    className={`input my-1 ${
                      errors.password && touched.password && "border-red-600"
                    }`}
                  />
                  <ErrorMessage
                    component={"p"}
                    className="error-text"
                    name="password"
                  />
                </div>

                {!!error && <p className="error-alert">{error}</p>}
                <ButtonPrimary
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </ButtonPrimary>
              </Form>
              <div className="mt-8 flex items-center text-center justify-center text-gray700 text-sm">
                <p>forgot your password ?</p>
                <button
                  type="button"
                  className="font-bold mx-1 underline"
                  onClick={() => navigate("/forget-password")}
                >
                  click here
                </button>
              </div>
            </div>
            <img
              alt=""
              src={banner}
              loading="lazy"
              decoding="async"
              className="hidden md:block w-1/2 h-full object-cover"
            />
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
