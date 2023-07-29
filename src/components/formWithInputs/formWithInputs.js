import React, { useState } from "react";
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
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function FormWithInputs(props) {
  const { formTitle, inputs, buttonText, buttonCallback, containerClass } =
    props;
  const [inputsValue, setInputsValue] = useState({});
  const inputValue = (e, inputId) => {
    setInputsValue({ ...inputsValue, [inputId]: e.target.value });
  };
  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container
        maxWidth="md"
        component="main"
        className={containerClass}
        // className="subscription-card-section"
      >
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item key={formTitle} xs={12} sm={12}>
            <Card>
              <CardHeader
                title={formTitle}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
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
                            onChange={(e)=>inputValue(e,input.id)}
                          />
                        </InputGroup>
                      </FormGroup>
                    );
                  })}
                </Form>
              </CardContent>
              <div className="text-center">
                <Button
                  className="my-4 subscription-card-button "
                  color="primary"
                  type="button"
                  onClick={()=>buttonCallback(inputsValue)}
                >
                  {buttonText}
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
