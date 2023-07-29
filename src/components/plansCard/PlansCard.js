import * as React from "react";
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PlansCard(props) {

    const {tier , onClickButton}=props
  return (
    <>
      {/* Enterprise card is full width at sm breakpoint */}
      <Grid
        item
        key={tier.title}
        xs={12}
        sm={tier.title === "Enterprise" ? 12 : 6}
        md={4}
      >
        <Card>
          <CardHeader
            title={tier.title}
            subheader={tier.subheader}
            action={tier.title === "Pro" ? <StarIcon /> : null}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
            subheaderTypographyProps={{
              align: "center",
              className: "plans-card-subtitle", // Apply custom class for subheader
            }}
            titleTypographyProps={{
              align: "center",
              className: "plans-card-title", // Apply custom class for title
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 2,
              }}
            >
              <Typography
                component="h2"
                variant="h3"
                color="text.primary"
                class="plans-card-price"
              >
                ${tier.price}
              </Typography>
            </Box>
            <ul>
              {tier.description.map((line) => (
                <Typography
                  component="li"
                  variant="subtitle1"
                  align="center"
                  key={line}
                  class="plans-card-description"
                >
                  {line}
                </Typography>
              ))}
            </ul>
          </CardContent>

          <div className="text-center">
            <Button
              className="my-4 plans-card-button"
              color={tier.buttonColor}
              type="button"
              onClick={onClickButton}
            >
              {tier.buttonText}
            </Button>
          </div>

        </Card>
      </Grid>
    </>
  );
}
