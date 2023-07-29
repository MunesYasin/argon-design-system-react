import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function FormWithInputs(props) {
  const {
    formTitle,
    subTitle,
    buttonText,
    buttonCallback,
    inputLabel,
    inputs,
    thirdPartySign,
    signIn,
  } = props;
  const [inputsValue, setInputsValue] = useState({});
  const inputValue = (e, inputId) => {
    setInputsValue({ ...inputsValue, [inputId]: e.target.value });
  };

  const redirectUserToSignUp = () => {
    window.location.href = "/register-page";
  };
  return (
    <>
      <Container className="pt-lg-7">
        <Row className="justify-content-center">
          <Col lg="5">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white pb-5">
                <div className="text-muted text-center mb-3">
                  <div className="signinup-formTitle">{formTitle}</div>
                </div>
                <div className="btn-wrapper text-center">
                  {thirdPartySign.map((thirdParty) => {
                    let imgSrc = thirdParty.img;
                    console.log(thirdParty.img, "dfdfdfdfdfd");
                    return (
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={thirdParty.callback}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img alt="..." src={thirdParty.img} />
                        </span>
                        <span className="btn-inner--text">
                          {thirdParty.text}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <div className="signinup-with-credentials">{subTitle}</div>
                </div>
                <Form role="form">
                  {inputs.map((input) => {
                    return (
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className={input.icon} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={input.placeholder}
                            type={input.type}
                            autoComplete={input.autoComplete}
                            onChange={(e) => inputValue(e, input.id)}
                          />
                        </InputGroup>
                      </FormGroup>
                    );
                  })}

                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label signinup-input-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span>{inputLabel}</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4 signinup-button"
                      color="primary"
                      type="button"
                      onClick={() => buttonCallback(inputsValue)}
                    >
                      {buttonText}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>

            {signIn && (
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="signin-forgot-password">
                      Forgot password?
                    </div>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={redirectUserToSignUp}
                  >
                    <div className="signin-create-new-account">
                      Create new account
                    </div>
                  </a>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
