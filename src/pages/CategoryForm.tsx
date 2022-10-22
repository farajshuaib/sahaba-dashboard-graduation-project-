import LoadingScreen from "components/LoadingScreen";
import ServerError from "components/ServerError";
import { ErrorMessage, Formik } from "formik";
import { useCrud } from "hooks/useCrud";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Heading from "shared/Heading/Heading";
import Input from "shared/Input/Input";

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { fetchById, loading, errors, update, create, setLoading } =
    useCrud("/categories");
  const [initFormState, setInitFormState] = useState({
    name: "",
    icon: "",
  });
  const [categoryIcon, setCategoryIcon] = useState("");

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetchById(params.id)
        .then((data: any) => {
          setInitFormState({
            name: data.name,
            icon: "",
          });
          setCategoryIcon(data.icon);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <div>
      <Heading desc="">
        {params.id ? "update category" : "create category"}
      </Heading>
      <div className="p-8 m-5 border border-gray-200 rounded-lg bg-gray-50">
        <Formik
          initialValues={initFormState}
          enableReinitialize
          onSubmit={async (values) => {
            const form = new FormData();
            form.append("name", values.name);
            form.append("icon", values.icon);
            if (params.id) {
              form.append("_method", "PUT");
              await update({
                id: params.id,
                payload: form,
                headers: { "Content-Type": "multipart/form-data" },
              }).then(() => {
                toast("category updated successfully");
                navigate("/categories");
              });
            } else {
              await create(form, {
                "Content-Type": "multipart/form-data",
              }).then(() => {
                toast("category created successfully");
                navigate("/categories");
              });
            }
          }}
        >
          {({
            values,
            errors,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <div>
              <div className="my-5">
                <label className="block text-sm font-medium text-gray-700">
                  name
                </label>
                <Input
                  name="name"
                  type={"text"}
                  value={values.name}
                  onChange={handleChange("name")}
                />
                <ErrorMessage name="name" />
              </div>
              <div className="flex items-center gap-4 my-5">
                <Avatar sizeClass="w-16 h-16" imgUrl={categoryIcon} />
                <div className="">
                  <label className="block text-sm font-medium text-gray-700">
                    icon
                  </label>
                  <Input
                    name="icon"
                    type={"file"}
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setFieldValue("icon", e.target.files[0]);
                      setCategoryIcon(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <ErrorMessage name="icon" />
                </div>
              </div>
              <div>
                <ButtonPrimary onClick={handleSubmit} loading={isSubmitting}>
                  {params.id ? "update category" : "create category"}
                </ButtonPrimary>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CategoryForm;
