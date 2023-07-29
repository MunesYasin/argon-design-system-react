import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "../../assets/config/axios";
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import Modal from "../IndexSections/Modals";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import FormWithInputs from "components/formWithInputs/formWithInputs";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  let title = sessionStorage.getItem("subscriptionType");

  useEffect(() => {
    if (!title) {
      window.location.href = `/plans-page`;
    }
    // Function to remove the subscriptionType from session storage
    const removeSubscriptionType = () => {
      sessionStorage.removeItem("subscriptionType");
    };

    // Add a beforeunload event listener to call the cleanup function
    window.addEventListener("beforeunload", removeSubscriptionType);

    // Cleanup function executed when the component unmounts
    return () => {
      // Remove the beforeunload event listener
      window.removeEventListener("beforeunload", removeSubscriptionType);
      // Remove the subscriptionType from session storage
      removeSubscriptionType();
    };
  }, []);

  const inputs = [
    {
      id:"Password",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open" ,
    },

    {
      id:"343",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open" ,
    },

    {
      id:"4545",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open" ,
    },

    {
      id:"6767",
      placeholder: "Password",
      type: "password",
      autoComplete: "off",
      icon: "ni ni-lock-circle-open" ,
    },
  ];
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFaildModal, setShowFaildModal] = useState(false);
  const [error, setError] = useState({});
  const handleSubscribe = (inputsValue) => {

    console.log(inputsValue,"inputsValue")
    let body = {
      subscription_type: title,
    };

    axios
      .post("/addSubscription", body)
      .then((res) => {
        console.log(res, "res");
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log(error.message, "error");
        setShowFaildModal(true);
        setError(error);
      });
  };

  const redirectToHomePage = () => {
    window.location.href = "/home-page";
  };

  const closeFailedModal = () => {
    setShowFaildModal(false);
  };

  const closeSuccessdModal = () => {
    setShowSuccessModal(false);
  };

  const redirectUser = () => {
    window.location.href = `/${error.redirectUserTo}`;
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
            formTitle={title}
            inputs={inputs}
            buttonText={"Pay Now"}
            buttonCallback={handleSubscribe}
            containerClass={"subscription-card-section"}
          />

        </Container>
      </ThemeProvider>
      {showSuccessModal && (
        <Modal
          modalType={"defaultModal"}
          title={"Subscription Successed"}
          buttonText={"Finish"}
          onClick={redirectToHomePage}
          closeModal={closeSuccessdModal}
        />
      )}
      {showFaildModal && (
        <Modal
          modalType={"notificationModal"}
          description={error.message}
          title={"Subscription Faild"}
          showCloseButton={true}
          closeModal={closeFailedModal}
          onClick={redirectUser}
          buttonText={error.redirectButtonText}
          showFirstButton={error.redirectUserTo}
        />
      )}
    </>
  );
}
