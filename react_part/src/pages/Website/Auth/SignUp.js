
//////////////////
import React from "react";
import Form from "../../../Component/Forms/Form";
import { Route } from "react-router-dom";
import Header from "../../../Component/Header";

export default function SignUp() {
  return (
    <div>
      <Header />
      <div
        className="parent"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Form
          button="Register"
          endpoint="register"
          navigate='/dashboard' 
          styleregister={true}
          hasLocalStorage={true}
          buttonstyle={true}

        />
      </div>
    </div>
  );
}
///////////////////////////////////////




