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
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Plans from "views/examples/Plans.js";
import DemoNavbar from "components/Navbars/DemoNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";

import Subscription from "views/examples/Subscription.js";
import Home from "views/examples/Home.js";
import Verify from "views/examples/Verify.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <DemoNavbar />
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route path="/landing-page" exact element={<Landing />} />
      <Route path="/login-page" exact element={<Login />} />
      <Route path="/profile-page" exact element={<Profile />} />
      <Route path="/plans-page" exact element={<Plans />} />
      <Route path="/subscriptions" exact element={<Subscription />} />
      <Route path="/home-page" exact element={<Home />} />
      
      <Route path="/verify-page" exact element={<Verify />} />

      <Route path="/register-page" exact element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <SimpleFooter />
  </BrowserRouter>
);
