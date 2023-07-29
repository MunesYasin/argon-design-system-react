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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Badge,

} from "reactstrap";

import { auth, provider, firebaseConfig } from "../../assets/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import SignInUpForm from "../../components/singInUpForm/signInUpForm";

import githubImage from "assets/img/icons/common/github.svg";
import googleImage from "assets/img/icons/common/google.svg";
import Modal from "../IndexSections/Modals";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      showFaildModal: false,
      showSuccessModal: false,
      error: null,
      success: null, // success object for any success response
    };

    this.inputs = [
      {
        id: "name",
        placeholder: "Name",
        type: "text",
        autoComplete: "off",
        icon: "ni ni-hat-3",
      },
      {
        id: "email",
        placeholder: "Email",
        type: "email",
        autoComplete: "off",
        icon: "ni ni-email-83",
      },
      {
        id: "password",
        placeholder: "Password",
        type: "password",
        autoComplete: "off",
        icon: "ni ni-lock-circle-open",
      },
    ];
    this.thirdPartySign = [
      {
        img: githubImage,
        callback: this.handleSignUpByGithub,
        text: "Github",
      },
      {
        img: googleImage,
        callback: this.handleSignupWithGoogle,
        text: "Google",
      },
    ];
  }



  redirectToProfilePage = () => {
    // Your redirection logic here
    window.location.href = "/profile-page";
  };
  handleSignUpByGithub = () => {};

  handleSignupWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // call after sign up proccess
        this.afterSignUpProccess(userCredential);
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  handleSignUpByEmailAndPassword = async (inputsValue) => {
    const { email, password } = inputsValue;
    console.log(inputsValue, "inputsValue");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // call after sign up proccess
        this.afterSignUpProccess(userCredential);
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  afterSignUpProccess = (userCredential) => {
    // User signed up successfully
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Send the email verification to the user's email
    let appUrl = firebaseConfig.authDomain;
    const actionCodeSettings = {
      url: `https://${appUrl}/${user.email}`, // Replace with your app's verification URL
      handleCodeInApp: true,
    };
    sendEmailVerification(user, actionCodeSettings);

    // redirect the user to verify page
    this.redirectUserToVerifyPage();
  };

  updateUserName = (e) => {
    this.setState({ userNmae: e.target.value });
  };
  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  closeFailedModal = () => {
    this.setState({
      showFaildModal: false,
    });
  };

  handleError = (error) => {
    this.setState({
      showFaildModal: true,
      error: error,
    });
  };
  handleSuccess = (success) => {
    this.setState({
      showSuccessModal: true,
      success: success,
    });
  };

  closeSuccessModal = () => {
    this.setState({
      showSuccessModal: false,
    });
  };
  redirectUserToVerifyPage = () => {
    window.location.href = "/verify-page";
  };

  resendEmail=()=>{
    // const user = userCredential.user;
    // console.log("User signed up:", user);

    // // Send the email verification to the user's email
    // let appUrl = firebaseConfig.authDomain;
    // const actionCodeSettings = {
    //   url: `https://${appUrl}/${user.email}`, // Replace with your app's verification URL
    //   handleCodeInApp: true,
    // };
    // sendEmailVerification(user, actionCodeSettings)
  }
  render() {
    const { onResend } = this.props;

    return (
      <>
       
            <Container>
              {/* <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4"> */}
                      <Card className="mt-5 shadow border-0">
                        <CardBody className="py-5">
                            <div className="d-flex justify-content-center">
                            <div className="icon icon-shape icon-shape-warning rounded-circle mb-4 ">
                            <i className="ni ni-planet" />
                          </div>
                         
                            </div>
                       
                          <p className="description mt-3 text-center">
                           To complete sign up please check your email to verify your account
                          </p>
                          <div className="d-flex justify-content-center">

                          <Button
                            className="mt-4 landpage-card-button"
                            color="warning"
                            href="#pablo"
                            onClick={onResend}
                          >
                            Resend
                          </Button>
                          </div>
                        </CardBody>
                      </Card>
                    {/* </Col>
                  </Row>
                </Col>
              </Row> */}
            </Container>
       
      </>
    );
  }
}

export default Register; // Wrap the component with withRouter
