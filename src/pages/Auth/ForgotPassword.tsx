import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "hooks/useApi";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Alert } from "shared/Alert/Alert";
import { forgotPasswordSchema } from "services/validations";
import Logo from "shared/Logo/Logo";
import { useTranslation } from "react-i18next";

const ForgetPassword: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { t, i18n } = useTranslation();

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          try {
            const { data } = await api.post("/forgot-password", values);
            setSubmitting(false);
            toast.success(
              t('we-have-sent-you-an-email-with-a-link-to-reset-your-password')
            );
            // navigate("/");
          } catch (err: any) {
            if (err.response.data.error) {
              setError(err.response.data.error);
            } else {
              setError(t('something-went-wrong-please-try-again-later') as string);
            }
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
          <div className="flex items-center md:h-3/4 w-11/12 md:w-1/3 bg-gray100 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full mx-auto p-5 sm:p-8 md:p-10 lg:p-12">
              <Logo />

              <Form onSubmit={handleSubmit}>
                <h1 className="text-2xl text-gray800 my-5">{t('reset-password')}</h1>
                <div className="my-5">
                  <label htmlFor="email" className="input-lable">
                    {t('email')}
                  </label>
                  <Input
                    required
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    className={`my-1 ${
                      errors.email && touched.email && "border-red-600"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="error-text">{errors.email}</p>
                  )}
                </div>

                {!!error && <Alert type="error">{error}</Alert>}

                <ButtonPrimary
                  onClick={() => handleSubmit()}
                  className="btn-primary bg-success"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {t('submit')}
                </ButtonPrimary>
              </Form>
              <div className="mt-8 flex items-center text-center justify-center text-gray700 text-sm">
                <p>{t('remember-password')}</p>
                <button
                  type="button"
                  className="font-bold underline mx-1"
                  onClick={() => navigate("/login")}
                >
                  {t('login')}
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
