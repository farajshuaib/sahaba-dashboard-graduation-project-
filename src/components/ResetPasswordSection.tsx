import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";

import { toast } from "react-toastify";
import { useCrud } from "hooks/useCrud";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { resetPasswordSchema } from "services/validations";
import { useAppSelector } from "app/hooks";
import { useApi } from "hooks/useApi";
import { useTranslation } from "react-i18next";

const ResetPasswordSection: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<string>("password");
  const userData = useAppSelector((state) => state.account.userData);
  const api = useApi();
  const { t, i18n } = useTranslation();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray800 font-medium">
          {t("update-password")}
        </h1>
      </div>
      <Formik
        initialValues={{ password: "", password_confirmation: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.put("update-password", {
              new_password: values.password,
            });
            setSubmitting(false);
            toast.success(t("password-updated-successfully"));
          } catch (error: any) {
            toast.error(
              error?.response?.data?.message ||
                t("something-went-wrong-please-try-again-later")
            );
            setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="my-5">
                <label htmlFor="password">{t("new-password")}</label>
                <div className="flex items-center">
                  <Input
                    type={passwordVisible}
                    placeholder="*********"
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
                    className={`text-gray300 text-lg transform -translate-x-8 bx ${
                      passwordVisible === "password" ? "bx-show " : "bx-hide"
                    }`}
                  ></i>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="my-5">
                <label htmlFor="password_confirmation">
                  {t("rewrite-password")}
                </label>
                <Input
                  type="password"
                  placeholder="*********"
                  name="password_confirmation"
                  id="password_confirmation"
                  autoComplete="new-password"
                  value={values.password_confirmation}
                  onChange={handleChange("password_confirmation")}
                  onBlur={handleBlur("password_confirmation")}
                />
                <ErrorMessage
                  component="p"
                  className="text-red-500"
                  name="password_confirmation"
                />
              </div>
            </div>
            <ButtonPrimary onClick={handleSubmit} loading={isSubmitting}>
              Update Password
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordSection;
