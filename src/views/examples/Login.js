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

import { auth, provider } from "../../assets/config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import SignInUpForm from "../../components/singInUpForm/signInUpForm";
import Modal from "../IndexSections/Modals";

import githubImage from "assets/img/icons/common/github.svg";
import googleImage from "assets/img/icons/common/google.svg";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showFaildModal: false,
      error: null,
      isEmailVerified : false
    };

    this.inputs = [
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
        callback: this.handleLoginByGithub,
        text: "Github",
      },
      {
        img: googleImage,
        callback: this.handleLoginByGoogle,
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

  handleLoginByGithub = () => {};

  handleLoginByGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // call after sign in proccess
        this.afterSignInProccess(userCredential);
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  handleSignUpByEmailAndPassword = async (inputsValue) => {
    const { email, password } = inputsValue;
    console.log(inputsValue, "inputsValue");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // call after sign in proccess
        this.afterSignInProccess(userCredential);
      })
      .catch((error) => {
        this.handleError(error);
      });
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

  afterSignInProccess = (userCredential) => {
    // User signed up successfully
    const user = userCredential.user;
    console.log("User signed in:", user);

    if(!user.emailVerified){
      this.handleError({message:"Your account is not verified , please verifiy it"})
       this.logOut()
    }else{
    // Redirect the user to the profile page after successful sign-up
    this.redirectToProfilePage();
    }


  };

  logOut = async () => {
    try {
      // Sign the user out using the signOut() method
      signOut(auth).then(() => {
      });
      // The user is now signed out. The onAuthStateChanged listener will trigger, and currentUser will be set to null in the state.
    } catch (error) {
      // Handle any sign-out errors
      console.error("Sign-out error:", error);
      this.handleError(error)
    }
  };

  handleError = (error) => {
    // Handle sign-up errors
    this.setState({
      showFaildModal: true,
      error: error,
    });
  };
  render() {
    const { error, showFaildModal } = this.state;

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

            <SignInUpForm
              formTitle={"Sign in with"}
              subTitle={"Or sign in with credentials"}
              buttonText={"Sign in"}
              buttonCallback={this.handleSignUpByEmailAndPassword}
              inputLabel={"Remember me"}
              inputs={this.inputs}
              thirdPartySign={this.thirdPartySign}
              signIn={true}
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
          </section>
        </main>
      </>
    );
  }
}

export default Login;
