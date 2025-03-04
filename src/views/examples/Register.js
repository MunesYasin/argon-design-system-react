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
} from "reactstrap";

import { auth, provider, firebaseConfig } from "../../assets/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import SignInUpForm from "../../components/singInUpForm/signInUpForm";

import githubImage from "assets/img/icons/common/github.svg";
import googleImage from "assets/img/icons/common/google.svg";
import Modal from "../IndexSections/Modals";
import VerifyComponent from "./Verify";
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
      showVerifyComponent: false,
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

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
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
    // Send email
    this.sendVefiricationEmail(userCredential);

    // show verify component
    this.setState({ showVerifyComponent: true });

    // logout the user because he is not verified
    this.logOut();
  };

  sendVefiricationEmail = (userCredential) => {
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Send the email verification to the user's email
    let appUrl = firebaseConfig.authDomain;
    const actionCodeSettings = {
      url: `https://${appUrl}/${user.email}`, // Replace with your app's verification URL
      handleCodeInApp: true,
    };
    sendEmailVerification(user, actionCodeSettings);
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
  logOut = async () => {
    try {
      // Sign the user out using the signOut() method
      signOut(auth).then(() => {});
      // The user is now signed out. The onAuthStateChanged listener will trigger, and currentUser will be set to null in the state.
    } catch (error) {
      // Handle any sign-out errors
      console.error("Sign-out error:", error);
      this.handleError(error);
    }
  };
  render() {
    const {
      error,
      showFaildModal,
      success,
      showSuccessModal,
      showVerifyComponent,
    } = this.state;

    return (
      <>
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            {!showVerifyComponent ? (
              <>
                <SignInUpForm
                  formTitle={"Sign up with"}
                  subTitle={"Or sign up with credentials"}
                  buttonText={"Sign up"}
                  buttonCallback={this.handleSignUpByEmailAndPassword}
                  inputLabel={"I agree with the Privacy Policy"}
                  inputs={this.inputs}
                  thirdPartySign={this.thirdPartySign}
                />
                {showFaildModal && (
                  <Modal
                    modalType={"notificationModal"}
                    description={error.message}
                    title={"Error"}
                    showCloseButton={true}
                    closeModal={this.closeFailedModal}
                  />
                )}
                {showSuccessModal && (
                  <Modal
                    modalType={"primary"}
                    description={success.message}
                    title={"Success"}
                    closeModal={this.closeSuccessModal}
                    onClick={success.onClick}
                    buttonText={success.buttonText}
                  />
                )}
              </>
            ) : (
              <VerifyComponent onResend={this.sendVefiricationEmail}/>
            )}
          </section>
        </main>
      </>
    );
  }
}

export default Register; // Wrap the component with withRouter
