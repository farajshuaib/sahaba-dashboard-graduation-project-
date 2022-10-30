/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "../../services/validations";
import { useApi } from "hooks/useApi";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Alert } from "shared/Alert/Alert";

const ResetPassword: React.FC = () => {
  const api = useApi();
  const [error, setError] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<string>("password");

  const navigate = useNavigate();
  const params = useParams();
  const [search] = useSearchParams();

  useEffect(() => {
    if (!params.token || !search.has("email")) {
      navigate("/");
    }
  }, []);

  return (
    <div
      data-testid="ResetPassword"
      className="flex items-center justify-center h-screen"
    >
      <Formik
        initialValues={{ password: "", password_confirmation: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          let email = search.get("email");
          if (!params.token || !email) return;
          try {
            const { data } = await api.post(`reset-password`, {
              ...values,
              token: params.token,
              email,
            });
            if (data) {
              setSubmitting(false);
              toast.success("Password reset successfully");
              navigate("/login");
            }
          } catch (err: any) {
            if (err.response.data.error) {
              setError(err.response.data.error);
            } else {
              setError("something went wrong please try again later");
            }
            setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="flex items-center md:h-3/4 w-11/12 md:w-1/3 bg-gray100 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full mx-auto p-5 sm:p-8 md:p-10 lg:p-12">
              <img
                src={logo}
                alt=""
                loading="lazy"
                decoding="async"
                className="object-cover md:w-3/4 mx-auto"
              />
              <Form onSubmit={handleSubmit}>
                <h1 className="text-2xl text-gray800 my-5">
                  create new password
                </h1>
                <div className="my-5">
                  <label htmlFor="password">new password</label>
                  <div className="flex items-center">
                    <Input
                      type={passwordVisible}
                      className="input"
                      placeholder=""
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <i
                      onClick={() => {
                        setPasswordVisible(
                          passwordVisible === "password" ? "text" : "password"
                        );
                      }}
                      className={`text-gray300 text-lg transform translate-x-8 bx ${
                        passwordVisible === "password" ? "bx-show " : "bx-hide"
                      }`}
                    ></i>
                  </div>

                  {!!touched.password && !!errors.password && (
                    <p className="error-text">{`${errors.password}`}</p>
                  )}
                </div>
                <div className="my-5">
                  <label htmlFor="password_confirmation">
                    rewrite password
                  </label>
                  <Input
                    type="password"
                    className="input"
                    placeholder=""
                    name="password_confirmation"
                    id="password_confirmation"
                    autoComplete="new-password"
                    value={values.password_confirmation}
                    onChange={handleChange("password_confirmation")}
                    onBlur={handleBlur("password_confirmation")}
                  />
                  {!!touched.password_confirmation &&
                    !!errors.password_confirmation && (
                      <p className="error-text">
                        {`${errors.password_confirmation}`}
                      </p>
                    )}
                </div>

                {!!error && <Alert type="error">{error}</Alert>}

                <ButtonPrimary onClick={handleSubmit} loading={isSubmitting}>
                  Submit
                </ButtonPrimary>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
