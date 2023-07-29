import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import axios from "../../assets/config/axios";
import Modal from "../IndexSections/Modals";
import FormWithInputs from "components/formWithInputs/formWithInputs";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFaildModal, setShowFaildModal] = useState(false);
  const [error, setError] = useState({});
  const inputs = [
    {
      id: "Password",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open",
    },

    {
      id: "343",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open",
    },

    {
      id: "4545",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open",
    },

    {
      id: "6767",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open",
    },
  ];
  const handleGnerate = (inputsValue) => {
    console.log(inputsValue, "inputsValue");
    axios
      .get("/generateFood")
      .then((res) => {
        console.log(res, "res");
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log(error.message, "error");

        setError(error);
        setShowFaildModal(true);
      });
  };

  const redirectUser = () => {
    window.location.href = `/${error.redirectUserTo}`;
  };

  const closeFailedModal = () => {
    setShowFaildModal(false);
  };

  const closeSuccessdModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      {/* <main> */}

      <section className="section-subscription-cover section-shaped my-0">
        {/* Circles background */}
        <div className="shape shape-style-1 shape-default alpha-4">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        {/* SVG separator */}
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <FormWithInputs
            formTitle={"Generate Food"}
            inputs={inputs}
            buttonText={"Generate"}
            buttonCallback={handleGnerate}
            containerClass={"generate-card-section"}
          />
        </Container>
      </ThemeProvider>
      {showSuccessModal && (
        <Modal
          modalType={"defaultModal"}
          title={"Generated Food"}
          buttonText={"Close"}
          onClick={closeSuccessdModal}
          closeModal={closeSuccessdModal}
        />
      )}
      {showFaildModal && (
        <Modal
          modalType={"notificationModal"}
          description={error.message}
          title={"Generate Food Faild"}
          showCloseButton={true}
          closeModal={closeFailedModal}
          showFirstButton={error.redirectUserTo}
          onClick={redirectUser}
          buttonText={error.redirectButtonText}
        />
      )}
    </>
  );
}
