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
import { Button } from "reactstrap";
import PlansCard from "components/plansCard/PlansCard";
import axios from "../../assets/config/axios";
import Modal from "../IndexSections/Modals";

const tiers = [
  {
    id: 1,
    title: "Daily",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Subscribe",
    buttonColor: "secondary",
  },
  {
    id: 2,

    title: "Monthly",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Subscribe",
    buttonColor: "primary",
  },
  {
    id: 3,

    title: "Yearly",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Subscribe",
    buttonColor: "secondary",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const [error, setError] = useState(null);
  const [showFaildModal, setShowFaildModal] = useState(false);
  const [subscriptions , setSubscriptions] = useState([])
  useEffect(() => {
    axios
      .get("/getAllSubscriptions")
      .then((res) => {
        setSubscriptions(res.data)
      })
      .catch((error) => {
        setShowFaildModal(true);
        setError(error);
      });
  }, []);
  const selectSubscription = (title) => {
    // Store the title in session storage
    sessionStorage.setItem("subscriptionType", title);

    window.location.href = `/subscriptions`;
  };

 const  closeFailedModal = () => {
  setShowFaildModal(false)
  };
  return (
    <>
      {/* <main> */}

      <section className="section-plans-cover section-shaped my-0">
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
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <CssBaseline />

          {/* End hero unit */}
          <Container
            maxWidth="md"
            component="main"
            className="plans-card-section"
          >
            <Grid container spacing={5} alignItems="flex-end">
              {subscriptions.map((subscription) => (
                <PlansCard
                  tier={subscription}
                  onClickButton={() => selectSubscription(subscription.title)}
                />
              ))}
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
      {showFaildModal && (
        <Modal
          modalType={"notificationModal"}
          description={error.message}
          title={"Error"}
          showCloseButton={true}
          closeModal={closeFailedModal}
        />
      )}
    </>
  );
}
