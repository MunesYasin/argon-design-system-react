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
// nodejs library that concatenates classes
import classnames from "classnames";
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
  Modal,
  Row,
  Col,
} from "reactstrap";

class Modals extends React.Component {
  state = {};
  // toggleModal = (state) => {
  //   this.setState({
  //     [state]: !this.state[state],
  //   });
  // };

  componentDidMount() {
    this.setState({ [this.props.modalType]: true });
  }
  render() {
    let {
      title,
      description,
      buttonText,
      onClick,
      showCloseButton,
      showFirstButton,
      closeModal
    } = this.props;
    return (
      <>
        {/* <h2 className="mt-lg mb-5">
          <span>Javascript Components</span>
        </h2>
        <h3 className="h4 text-success font-weight-bold mb-4">Modals</h3> */}
        <Row>
          <Col md="4">
            {/* <Button
              block
              className="mb-3"
              color="primary"
              type="button"
              onClick={() => this.toggleModal("defaultModal")}
            >
              Default
            </Button> */}
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => {
                // this.toggleModal("defaultModal");
                closeModal();
              }}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  {title}
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => {
                    // this.toggleModal("defaultModal");
                    closeModal();
                  }}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{description}</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <Button
                  color="primary"
                  type="button"
                  onClick={() => {
                    // this.toggleModal("defaultModal");
                    onClick();
                  }}
                >
                  {buttonText}
                </Button>
              </div>
            </Modal>
          </Col>
          <Col md="4">
            {/* <Button
              block
              className="mb-3"
              color="warning"
              type="button"
              onClick={() => this.toggleModal("notificationModal")}
            >
              Notification
            </Button> */}
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={this.state.notificationModal}
              toggle={() => {
                // this.toggleModal("notificationModal");
                closeModal();
              }}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  {title}
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => {
                    // this.toggleModal("notificationModal");
                    closeModal();
                  }}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />

                  <p>{description}</p>
                </div>
              </div>
              <div className="modal-footer ">
                {showFirstButton && (
                  <Button
                    className="btn-white"
                    color="default"
                    type="button"
                    onClick={() => onClick()}
                  >
                    {buttonText}
                  </Button>
                )}
                {showCloseButton && (
                  <Button
                    className="text-white ml-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => {
                      // this.toggleModal("notificationModal")
                      closeModal()
                    }}
                  >
                    Close
                  </Button>
                )}
              </div>
            </Modal>
          </Col>
          <Col md="4">
            {/* <Button
              block
              color="default"
              type="button"
              onClick={() => this.toggleModal("formModal")}
            >
              Form
            </Button> */}
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={this.state.formModal}
              toggle={() => closeModal()}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-icon mt-2 mb-2"
                        color="neutral"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-icon mt-2 mb-2 ml-1"
                        color="neutral"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/google.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup
                        className={classnames("mb-3", {
                          focused: this.state.emailFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onFocus={(e) =>
                              this.setState({ emailFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ emailFocused: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.passwordFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            onFocus={(e) =>
                              this.setState({ passwordFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ passwordFocused: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button">
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Modals;
