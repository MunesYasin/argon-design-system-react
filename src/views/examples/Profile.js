/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

import { auth } from "../../assets/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "../../assets/config/axios";
import Modal from "../IndexSections/Modals";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      showFaildModal: false,
      error: null,
    };
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User signed in:", user);

        axios
          .get("/getSubscription")
          .then((res) => {
            // add subscription detail to user object which come from firebase
            let {
              subscription_status = "No subscription",
              start_date,
              end_date,
            } = {};
            res.data.subscription_status &&
              ({ subscription_status, start_date, end_date } = res.data);
            user = { ...user, subscription_status, start_date, end_date };
            this.setState({ currentUser: user });
          })
          .catch((error) => {
            this.setState({
              showFaildModal: true,
              error: error,
            });
          });
      } else {
        // No user is signed in
        console.log("No user signed in");
        this.setState({ currentUser: null });
      }
    });
  }

  closeFailedModal = () => {
    this.setState({
      showFaildModal: false,
    });
  };

  render() {
    const { currentUser, error, showFaildModal } = this.state;
    return (
      <>
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
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
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Connect
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          Message
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5 profilePage-subscription-details ">
                    <div className="profilePage-userName">
                      {currentUser?.displayName}{" "}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </div>
                    <div className="  mt-4">
                          <i className="ni location_pin mr-2" />
                          Subscription : <span className="font-weight-500"> {currentUser?.subscription_status}</span> 
                        </div>
                    {currentUser?.start_date && (
                      <>
                        
                        <div>
                          <i className="ni business_briefcase-24 mr-2" />
                          Start date : {currentUser?.start_date}
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          End date : {currentUser?.end_date}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          An artist of considerable range, Ryan — the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy —
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Show more
                        </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        {showFaildModal && (
          <Modal
            modalType={"notificationModal"}
            description={error.message}
            title={"Error"}
            showCloseButton={true}
            closeModal={this.closeFailedModal}
          />
        )}
      </>
    );
  }
}

export default Profile;
