import DashCard from "./DashCard";

import React, { useEffect, useRef, useState } from "react";
import "./buildcss.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import video from "../../Assets/build_bg.png";
// import png1 from "../Assets/createApp.png"
import AddForm from "Remote/AddForm";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadFeaturelistData, Save_Features_Data } from "../../redux/action";

const styles = {
  wishes: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "24px",
    letterSpacing: "-0.5px",
    color: "#001661",
    padding: "10px",
    gap: "10px",
  },
  headlvl1: {
    marginTop: "5vh",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "46px",
    width: "100vw",
    textAlign: "center",
    letterSpacing: "-0.5px",
    color: "#ffffff",
  },
  headlvl2: {
    marginTop: "2vh",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "46px",
    width: "100vw",
    textAlign: "center",
    letterSpacing: "-0.5px",
    color: "#ffffff",
  },
  lvl1: {
    marginTop: "2vh",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "200",
    fontSize: "36px",
    width: "100vw",
    textAlign: "center",
    letterSpacing: "-0.5px",
    color: "#ffffff",
  },
  circle01: {
    position: "relative",
    width: "25vw",
    height: "25vw",
    left: "-5vw",
    top: "45vh",
    background:
      "linear-gradient(180deg, #06176F 1.02%, #565E8D 51.97%, #CDCFE1 100%)",
    boxShadow: "-4px 0px 12px rgba(7, 23, 74, 0.2)",
    borderRadius: "50%",
    display: "inline-block",
  },
  circle02: {
    position: "absolute",
    width: "5vw",
    height: "5vw",
    right: "10vw",
    top: "60vh",
    background: "linear-gradient(180deg, #654BD3 0%, #A86BE4 100%)",
    boxShadow: "-4px 0px 12px rgba(7, 23, 74, 0.2)",
    borderRadius: "50%",
    zIndex: "1",
    display: "inline-block",
  },
};
export default function NewDashBoard() {
  const history = useHistory();

  let dispatch = useDispatch();
  const { featureList } = useSelector((state) => state.data);
  const [Contactdetails, setContactdetails] = useState([]);
  const [mainData, setMainData] = useState({});
  useEffect(() => {
    var data = featureList.map((field) => {
      return {
        key: field.lookup_code,
        label: field.display_name,
        type: "checkbox",
        data: { id: field.id, name: field.display_name },
        isChecked: false,
      };
    });
    setContactdetails(data);
  }, [featureList]);

  useEffect(() => {
    dispatch(loadFeaturelistData());
  }, []);

  const handelInputChange = (key, value) => {
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };
  const handelCheckBoxonChange = (field) => {
    // if (field.key == "artificial_intelligence" || field.key == "products" || field.key == "crm" || field.key == "whatsapp_intigrations" || field.key == "order_processing" || field.key == "wms_system" || field.key == "checkbox_label") {

    var newState = Contactdetails.map((o) => {
      if (o.key == field.key) {
        o.isChecked = !o.isChecked;
      }
      return o;
    });
    setContactdetails(newState);
    // }
  };
  const handleSubmitButton = () => {
    console.log("maindata", mainData);
    var features = [];
    Contactdetails.map((o) => {
      if (o.isChecked == true) {
        features.push(o.label);
      }
    });
    console.log("features....", features);
    var body = {
      contact_person: mainData?.contact_person,
      required_features: features,
    };
    dispatch(
      Save_Features_Data(body, function (resp) {
        // toast(resp)
        setbuttonsCondition((current) => !current);
        setfinalMessageCondition((current) => !current);
      })
    );
  };

  /* var time = new Date();
  console.log(time, "timetime");
  const handelReadBtn = (id) => {
    console.log(id, "ReadMore");
  };
  const cardData = [
    {
      title: "Fermion",
      url: "https://dev-api.eunimart.com/files/images/build_with_siva.png",
      desc: "Fermion is a user-friendly commerce platform that helps businesses manage their online and offline store (channel of sales), supply chains, finances, marketing, and other commercial operations through one streamlined dashboard.",
      link: "https://siva3.io/fermion",
    },
    {
      title: "Many Worlds",
      url: "https://dev-api.eunimart.com/files/images/logistics.png",
      desc: "Data Labs is with you to help, starting from cataloging, planning your shipping, pricing, forecasting, image optimization, content management, Ecosystem Network Optimization and portfolio management to smart AI-based chatbot support.",
      link: "https://siva3.io/many-worlds",
    },
    {
      title: "Boson",
      url: "https://dev-api.eunimart.com/files/images/logistics.png",
      desc: "BOSON iPaaS/Connector is an integration platform that automates your work across 20+app integrations (marketplaces, webstores, CRMs, Warehouses, project management, etc)",
      link: "https://siva3.io/boson",
    },
  ];
  return (
    <>
      <div
        style={{
          position: "absolute",
          background:
            "linear-gradient(0deg, rgba(0, 22, 97, 0.78) 0%, #08095C 51.73%, #0F286B 100%)",
          height: "80vh",
          width: "100vw",
          top: "0",
          zIndex: "-1",
          // overflow:"hidden"
        }}
      >
        <div style={styles.circle01}></div>
      </div>
      <div style={styles.circle02}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          // background: "#001661C7",
          background: "transparent",
          padding: "2vw 0",
          gap: "15px",
          margin: 0,
          zIndex:"0"
        }}
      >
        <div
          style={{
            sdisplay: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vh",
            flexDirection: "column",
            background: "transparent",
          }}
        >
          <div>
            <div style={styles.headlvl1}>
              Siva is an Open-Source application layer for <br /> ONDC Beckn
              Protocol
            </div>

            <div style={styles.lvl1}>
              Connect to Siva and rest assured, your aplSication is ONDC
              compliant.
            </div>

            <div style={styles.headlvl2}>Siva Standard Model</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignitems: "center",
                gap: "2vh",
                marginTop: "5vh",
              }}
            >
              <Button
                variant="contained"
                style={{
                  background: "white",
                  color: "#001661",
                  fontSize: "19px",
                }}
              >
                We will build for you
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "95vw",
            display: "flex",
            justifyContent: "center",
            marginTop: "5vh",
            backkground: "red",
            gap: "15px",
            flexWrap: "wrap",
          zIndex:"0"

          }}
        >
          {cardData?.map((o) => {
            return (
              <DashCard
                title={o.title}
                url={o.url}
                desc={o.desc}
                link={o.link}
              />
            );
          })}
        </div>
      </div>
    </>
  ); */

  const [buildCondition, setbuildCondition] = useState(false);
  const [buttonsCondition, setbuttonsCondition] = useState(false);
  const [finalMessageCondition, setfinalMessageCondition] = useState(false);

  // const [Contactdetails, setContactdetails] = useState([
  //   {
  //     label: "Artificial Intelligence",
  //     type: "checkbox",
  //     key: "artificial_intelligence",
  //     isChecked: false,
  //   },
  //   {
  //     label: "Products",
  //     type: "checkbox",
  //     key: "products",
  //     isChecked: false,
  //   },
  //   {
  //     label: "CRM",
  //     type: "checkbox",
  //     key: "crm",
  //     isChecked: false,
  //   },
  //   {
  //     label: "Whatsapp Intigrations",
  //     type: "checkbox",
  //     key: "whatsapp_intigrations",
  //     isChecked: false,
  //   },
  //   {
  //     label: "Checkbox label",
  //     type: "checkbox",
  //     key: "checkbox_label",
  //     isChecked: false,
  //   },
  //   {
  //     label: "Order Processing",
  //     type: "checkbox",
  //     key: "order_processing",
  //     isChecked: false,
  //   },
  //   {
  //     label: "WMS system",
  //     type: "checkbox",
  //     key: "wms_system",
  //     isChecked: false,
  //   },
  // ]);

  // const handelCheckBoxonChange = (field) => {
  //   if (
  //     field.key == "artificial_intelligence" ||
  //     field.key == "products" ||
  //     field.key == "crm" ||
  //     field.key == "whatsapp_intigrations" ||
  //     field.key == "order_processing" ||
  //     field.key == "wms_system" ||
  //     field.key == "checkbox_label"
  //   ) {
  //     var newState = Contactdetails.map((o) => {
  //       if (o.key == field.key) {
  //         o.isChecked = !o.isChecked;
  //       }
  //       return o;
  //     });
  //     setContactdetails(newState);
  //   }
  // };

  const handleClosingButton = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="wrapper1" style={{ backgroundImage: `url(${video})` }}>
        <div className="wrapper_container">
          <div className="main_heading">
            <h1>
              Siva is an Open-Source application layer for ONDC Beckn Protocol
            </h1>
            <p>
              Connect to Siva and rest assured, your application is ONDC
              compliant.
            </p>
            {!buttonsCondition && (
              <div className="main_button_wrapper">
                {!buildCondition && (
                  <a
                    href="https://siva3.io/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="text"
                      style={{
                        color: "black",
                        width: "200px",
                        height: "50px",
                        background: "#FD7789",
                      }}
                      // onClick={() => {
                      //   handleClosingButton();
                      // }}
                    >
                      Build it yourself
                    </Button>
                  </a>
                )}

                <Button
                  variant="text"
                  style={{
                    color: "black",
                    width: "200px",
                    height: "50px",
                    background: "#0CAEDD",
                  }}
                  onClick={() => {
                    setbuildCondition((current) => !current);
                  }}
                >
                  We will build for you
                </Button>
              </div>
            )}

            {buildCondition && !buttonsCondition && (
              <div className="build_for_you_content_wrapper">
                <h2>Our executive will get in touch</h2>

                <TextField
                  className="textfield_contact"
                  id="outlined-basic"
                  label="Name of the contact person"
                  variant="outlined"
                  onChange={(e) => {
                    handelInputChange("contact_person", e.target.value);
                  }}
                />

                <p>
                  Let us know any specific features you want to add or get
                  notified for
                </p>
                <>
                  <AddForm
                    data={Contactdetails.map((field) => {
                      return field;
                    })}
                    handelCheckBoxonChange={handelCheckBoxonChange}
                  />
                </>
                <TextField
                  className="features_contact"
                  id="outlined-basic"
                  label="Other features"
                  variant="outlined"
                />
                <br></br>
                <Button
                  variant="text"
                  style={{ color: "white", background: "#416BFF", top: "10px" }}
                  onClick={() => {
                    // setbuttonsCondition((current) => !current);
                    // setfinalMessageCondition((current) => !current);
                    handleSubmitButton();
                  }}
                >
                  Submit
                </Button>
              </div>
            )}

            {finalMessageCondition && (
              <div>
                <div className="build_for_you_content_wrapper">
                  <h2>Our executive will contact you shortly</h2>
                </div>

                {/* <div className="closeOnboarding">
                  <button
                    onClick={() => {
                      handleClosingButton();
                    }}
                  >
                    Next
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/