import LoadingScreen from "components/LoadingScreen";
import ServerError from "components/ServerError";
import { Modal, Table } from "flowbite-react";
import { ErrorMessage, Formik } from "formik";
import { useApi } from "hooks/useApi";
import { useCrud } from "hooks/useCrud";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Heading from "shared/Heading/Heading";
import Input from "shared/Input/Input";
import Pagination from "shared/Pagination/Pagination";
import Textarea from "shared/Textarea/Textarea";

const Subscribers: React.FC = () => {
  const api = useApi();
  const { fetch, loading, data, errors, meta } = useCrud(`/subscribers`);
  const [page, setPage] = useState<number>(1);
  const [toggleModel, setToggleModel] = useState<boolean>(false);

  useEffect(() => {
    fetch();
  }, [page]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (errors) {
    return <ServerError />;
  }

  return (
    <div>
      <Heading desc="all subscribers users">Subscribers</Heading>

      <div className="flex justify-end my-8">
        <ButtonPrimary onClick={() => setToggleModel(true)}>
          send email
        </ButtonPrimary>
      </div>
      <Table>
        <Table.Head>
          {["id", "email"].map((item, index) => (
            <Table.HeadCell key={index} className="whitespace-nowrap">
              {item}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((user: UserData, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {[user.id, user.email].map((item, index) => (
                <Table.Cell
                  key={index}
                  className="font-medium text-gray-800 whitespace-nowrap dark:text-white"
                >
                  <span>{item}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {meta && <Pagination setPage={(page) => setPage(page)} meta={meta} />}

      <Modal show={toggleModel} onClose={() => setToggleModel(false)}>
        <Formik
          initialValues={{ subject: "", message: "" }}
          onSubmit={async (values) => {
            try {
              const response = await api.post(
                `/subscribers/send-email`,
                values
              );
              console.log(response);
              toast.success("email sent successfully");
              setToggleModel(false);
            } catch (error: any) {
              toast.error(
                error?.response?.data?.message || "something went wrong"
              );
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            handleReset,
            handleBlur,
            isSubmitting,
          }) => (
            <>
              <Modal.Header>
                <h1>Send email</h1>
              </Modal.Header>

              <Modal.Body>
                <div className="my-5">
                  <label className="font-medium text-lg" htmlFor="subject">
                    subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange("subject")}
                    onBlur={handleBlur("subject")}
                    pattern="^[a-zA-Z0-9_ ]*$"
                    required
                    placeholder="new offer"
                  />
                  <ErrorMessage
                    name="subject"
                    component="p"
                    className="text-red-500"
                  />
                </div>
                <div className="my-5">
                  <label className="font-medium text-lg" htmlFor="message">
                    message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onBlur={handleBlur("message")}
                    onChange={handleChange("message")}
                    placeholder="..."
                    required
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500"
                  />
                </div>
              </Modal.Body>

              <Modal.Footer>
                <ButtonPrimary loading={isSubmitting} onClick={handleSubmit}>
                  send
                </ButtonPrimary>
                <ButtonSecondary
                  onClick={() => {
                    handleReset();
                    setToggleModel(false);
                  }}
                >
                  {" "}
                  cancel
                </ButtonSecondary>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Subscribers;