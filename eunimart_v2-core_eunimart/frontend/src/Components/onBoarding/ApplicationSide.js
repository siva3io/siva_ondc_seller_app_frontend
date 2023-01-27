import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import InputOnboarding from "./InputOnboarding";
import TokenCard from "./TokenCard";
import "../../Screens/OnBoarding.css";
import Radio2 from "./Radio2";
import ScheduleTimings from "./ScheduleTimings";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  loadcompanyTypeDomain,
  loadSellersList,
  loadStates,
  load_dashboard_type,
  load_dashboard_type2,
} from "../../redux/action";
import { useHistory } from "react-router-dom";

import ModalViewV2 from "./ModalViewV2";
import Map from "./Map";

function ApplicationSide({
  ApplicationSelected,
  setOndcCon2,
  setOndcCon1,
  SetUserSelected,
  setisFormSelected,
  SetuserSideFormSelected,
  isFormSelected,
  userSideFormSelected,
  moveToApplication,
  setmoveToApplication,
  handelInputChange,
  userTypeData,
  setgstDoc,
  setpanDoc,
  companyTypeData,
  handleButtonClick,
  isValidated,
  tokenData,
  tokenOndcData,
  updateCompany,
  updateStoreTimings,
  updateSellerApps,
  createCompanyLocation,
  mainData,
  setSerViceArea,
  setMainData,
  errorMessage,
  contactInformation,
  locationInformation,
}) {
  const navigate = useHistory();
  const [isClicked, setisClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [activateBuyer, setActivateBuyer] = useState(false);
  const [activateSeller, setActivateSeller] = useState(false);
  const [openHoursInformation, setOpenHoursInformation] = useState(true);

  // const [formCells, setformCells] = useState(buyerSideForm);
  const [show, setShow] = useState(false);
  const [sellerStep, setSellerStep] = useState(0);
  const [buyerStep, setBuyerStep] = useState(0);
  const [isCustomTime, setCustomTime] = useState(0);

  //location Card
  const [showLocationCard, setshowLocationCard] = useState(false);
  // const [SerViceArea, setSerViceArea] = useState(null);

  const [dummy, setDummy] = useState(0);

  const dispatch = useDispatch();

  const { dashboardTypeData , dashboardTypeData2 } = useSelector((state) => state.data);


  // useEffect(() => {
  //   console.log("dashboardTypeData", dashboardTypeData);
  //   if (dashboardTypeData?.token) {
  //     localStorage.setItem("token", dashboardTypeData?.token);
  //   }
  // }, [dashboardTypeData]);

  useEffect(() => {
    console.log("dashboardTypeData", dashboardTypeData2);
    if (dashboardTypeData2?.token) {
      localStorage.setItem("token", dashboardTypeData2?.token);
      setTimeout(()=>{
        navigate.push("/home");
      },2000)
    }
  }, [dashboardTypeData2]);

  useEffect(() => {
    dispatch(loadcompanyTypeDomain());
    dispatch(loadSellersList());
    dispatch(loadStates());
  }, []);

  const { domainTypeData, sellerApp, indianStates } = useSelector(
    (state) => state.data
  
  );

  const handelDateChange = (value, key) => {
    console.log("key", key, "value in Date Change", value);
    if (key == "opening_date") {
      set_about_your_business(
        about_your_business.map((o) => {
          if (o.key == key) {
            o = { ...o, value: value };
          }
          return o;
        })
      );
    }
    // set_about_your_business()
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handelRadioBtn = (key, value) => {
    console.log("key", key, "value", value);
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
    console.log(mainData, "mainDataAfterInput");
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    // setOpen(true);
    navigate.push("/pricing");
  };

  const closeOnBoarding = () => {
    dispatch(load_dashboard_type2());
  };

  // useEffect(()=>{if(dashboardTypeData1?.token){ 
  //   navigate.push("/home");
  //  } },[dashboardTypeData1])


  const handleClose = (param) => {
    if (param == "locationCard") {
      setshowLocationCard(false);
    } else {
      setOpen(false);
    }
  };

  const handelTimeChange = (key, value) => {
    var temp = openingTimings1;

    if (key == "open") {
      // temp[0]["value"] = new Date(value).toISOString();
      temp[0]["value"] = new Date(value);
    } else if (key == "close") {
      // temp[1]["value"] = new Date(value).toISOString();
      temp[1]["value"] = new Date(value);
    }
    console.log("temp", temp);
    setOpeningTimings1(temp);
    setDummy((dummy) => {
      return dummy + 1;
    });

    if (temp.length > 1) {
      if (temp[0].value != "" && temp[1].value != "") {
        setOpenHoursInformation(false);
      }
    }
  };

  const [openingTimings, setOpeningTimings] = useState([
    {
      label: "Monday",
      key: "monday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
    {
      label: "Tuesday",
      key: "tuesday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
    {
      label: "Wednesday",
      key: "wednesday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
    {
      label: "Thursday",
      key: "thursday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
    {
      label: "Friday",
      key: "friday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
    {
      label: "Saturday",
      key: "saturday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
    {
      label: "Sunday",
      key: "sunday",
      isClosed: true,
      value: [
        [
          {
            label: "Opens at",
            type: "time",
            key: "open_at",
            value: "",
          },
          {
            label: "Closes at",
            type: "time",
            key: "close_at",
            value: "",
          },
        ],
      ],
    },
  ]);

  const [openingTimings1, setOpeningTimings1] = useState([
    {
      label: "Opens at",
      type: "time",
      key: "open_at",
      value: "",
    },
    {
      label: "Closes at",
      type: "time",
      key: "close_at",
      value: "",
    },
  ]);

  const [Buyer_info, setBuyer_info] = useState([
    {
      label: "Name",
      type: "input",
      key: "Buyer_Name",
      placeholder: "Enter Buyer Name",
    },
    {
      label: "Whatsapp Phone Number",
      type: "input",
      key: "Whatsapp_Phone_Number",
      placeholder: "Enter Whatsapp Phone Number",
    },
  ]);

  const [about_your_business, set_about_your_business] = useState([
    {
      label: "Store Name",
      type: "input",
      key: "business_name",
      required: true,
    },
    {
      label: "Domain/ category",
      type: "select",
      // required: true,
      key: "category",
      options: [{ label: "sample" }, { label: "dample" }],
      required: true,
    },
    {
      label: "Store Description",
      type: "input",
      key: "description",
    },
    {
      label: "Established date",
      type: "date",
      key: "opening_date",
    },
  ]);
  const [contact_info, set_contact_info] = useState([
    {
      label: "Phone Number",
      type: "input",
      key: "phone_number",
      regex: /^[0-9\b]+$/,
      required: true,
      minLength: 10,
      maxLength: 10,
      errorMessage: "Enter Phone Number",
    },
    {
      key: "website",
      label: "Website",
      type: "input",
      regex:
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      errorMessage: "Enter valid url",
      minLength: 7,
      required: true,
      maxLength: 300,
    },
    {
      key: "email",
      label: "Email address",
      type: "input",
      required: true,
      regex: /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9.]+\.)+[a-zA-Z]+$/,
      errorMessage: "Enter valid Email",
      minLength: 5,
      maxLength: 100,
    },
  ]);

  const [location_areas, set_location_areas] = useState([
    {
      label: "Street address",
      type: "input",
      key: "street_address",
      required: true,
    },
    {
      label: "Street address line 2",
      type: "input",
      key: "street_address_line_2",
      required: true,
    },
    {
      label: "Town/City",
      type: "input",
      key: "city",
      required: true,
    },
    {
      label: "Pincode ",
      type: "input",
      key: "pincode",
      required: true,
      regex: /^(\d{4}|\d{6})$/,
      maxLength: 6,
      minLength: 6,
      errorMessage: "Enter valid Pincode",
    },
    {
      label: "State",
      type: "select",
      key: "state",
      required: true,
    },
    {
      label: "",
      type: "",
      key: "",
    },
    // {
    //   label: "Service area",
    //   type: "select",
    //   key: "service_area",
    // },
    // {
    //   label: "Service area",
    //   type: "input",
    //   key: "service_area",
    // },
    // {
    //   label: "Service radius",
    //   type: "input",
    //   key: "service_radius",
    //   placeholder: "Enter in Kms",
    // },
  ]);

  const [range, setRange] = useState([
    {
      label: "Range",
      type: "number",
      key: "range",
      required: true,
    },
  ]);

  const openHours = [
    {
      value: "1",
      label: "Open with main hours",
      liner: "Show when your business is open",
    },
    {
      value: "2",
      label: "Open with no main hours",
      liner: "Show when your business is open",
    },
    {
      value: "3",
      label: "Temporarily closed",
      liner: "Show that your business will open again in the future",
    },
    {
      value: "4",
      label: "Permanently closed",
      liner: "Show that your business no longer exists",
    },
  ];

  const [selectedPlatform, setSelectedPlatform] = useState([]);

  const [platform, setPlatform] = useState([
    {
      id: "1",
      imageUrl:
        "https://st1.bgr.in/wp-content/uploads/2018/08/Flipkart-805px.jpg",
      selected:
        selectedPlatform?.filter((o) => o == 1).length > 0 ? true : false,
      title: "Flipkart",
    },
    {
      id: "2",
      imageUrl:
        "https://cdn.wccftech.com/wp-content/uploads/2014/11/td-amazon-smile-logo-01-large.jpg",
      selected:
        selectedPlatform?.filter((o) => o == 2).length > 0 ? true : false,
      title: "Amazon",
    },
    {
      id: "3",
      imageUrl: "https://aartisto.com/wp-content/uploads/2020/11/myntra.png",
      selected:
        selectedPlatform?.filter((o) => o == 3).length > 0 ? true : false,
      title: "Myntra",
    },
  ]);

  const [selectedApps, setSelectedApps] = useState([]);

  useEffect(() => {
    console.log("sample11", selectedApps);
  }, [selectedApps]);

  useEffect(() => {
    console.log(openingTimings, "openingTimings");
  }, [openingTimings]);

  return (
    <>
      {!isFormSelected && (
        <>
          {ApplicationSelected && (
            <>
              <div
                style={{
                  position: "absolute",
                  width: "50%",
                  zIndex: "1",
                }}
              >
                <img
                  src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                  style={{
                    // height: "100px",
                    width: "150px",
                    padding: "20px",
                  }}
                  alt="siva"
                />
              </div>
              <div className="center" style={{ lineHeight: "1.5" }}>
                <div
                  style={{
                    color: "#001661",
                    fontSize: 50,
                    fontWeight: "bold",
                    padding: 5,
                    margin: 5,
                    textAlign: "center",
                    marginBottom: "4%",
                  }}
                >
                  I am an <br />
                  Application
                </div>
                <div
                  style={{
                    color: "#001661",
                    width: "25vw",
                    padding: 5,
                    margin: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "4%",
                  }}
                >
                  You want to be a buyer or seller application that offers a
                  unified buying experience to the customers by connecting them
                  with thousands of sellers and service providers.
                </div>
                <button
                  disabled={isClicked}
                  style={{
                    padding: "7px 15px",
                    borderRadius: 5,
                    opacity: isClicked && "0%",
                    transition: "0.5s",
                    cursor: !isClicked && "pointer",
                    borderColor: "white",
                    backgroundColor: isHover ? "#CDCCCC" : "white",
                    // scale: isHover ? "1.1" : "1"
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  type="submit"
                  onClick={() => {
                    setOndcCon1(1);
                    setOndcCon2(0);
                    setOndcCon2(2);
                    SetUserSelected(false);
                    setisClicked(true);
                    handleButtonClick("applicationSelected");
                  }}
                  className="btn btn-primary"
                >
                  Get started
                </button>
              </div>
            </>
          )}

          {!ApplicationSelected && (
            <div className="center">
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "50%",
                  zIndex: "1",
                }}
              >
                <img
                  src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                  style={{
                    // height: "100px",
                    width: "150px",
                    padding: "20px",
                  }}
                  alt="siva"
                />
              </div>
              <div
                className="cardOnBoarding"
                // style={{ fontWeight: "bold" }}
                // href="https://frontend.eunimart.com/storeFront"
                // target="_blank"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    // setisFormSelected(true);
                    // SetuserSideFormSelected(true);
                    // setActivateBuyer(true);
                    // setformCells(sellerSideForm);
                    handleButtonClick("buyerSelected");
                  }}
                >
                  <div>
                    {/* Buyer
                    <br /> */}
                    <a style={{ fontWeight: "bold" }}>
                      Buyer
                      <br />
                    </a>
                    <a>Eunimart ”BAP” buyer</a>
                    {/* <ArrowForwardIcon className="arrowIcon" /> */}
                  </div>
                  <ArrowForwardIcon className="arrowIcon" />
                </div>
              </div>
              <div
                className="cardOnBoarding"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onClick={() => {
                  setisFormSelected(true);
                  SetuserSideFormSelected(true);
                  setActivateSeller(true);
                  // setformCells(sellerSideForm);
                  handleButtonClick("sellerSelected");
                }}
              >
                <div>
                  <a style={{ fontWeight: "bold" }}>
                    Seller
                    <br />
                  </a>
                  <a>Eunimart ”BPP” seller</a>
                  {/* <ArrowForwardIcon className="arrowIcon" /> */}
                </div>
                <ArrowForwardIcon className="arrowIcon" />
              </div>
            </div>
          )}
        </>
      )}

      {isFormSelected && !userSideFormSelected && (
        <>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "50%",
              zIndex: "1",
            }}
          >
            <img
              src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
              style={{
                // height: "100px",
                width: "150px",
                padding: "20px",
              }}
              alt="siva"
            />
          </div>
          <TokenCard
            show={show}
            setShow={setShow}
            moveToApplication={moveToApplication}
            setmoveToApplication={setmoveToApplication}
            tokenOndcData={tokenOndcData}
          />
          <Typography
            style={{
              color: "rgba(0, 22, 97, 0.9)",
              fontWeight: "bold",
              fontSize: "33px",
              textAlign: "center",
              marginTop: "125px",
              lineHeight: "0",
              letterSpacing: "0",
            }}
          >
            What kind of application?
          </Typography>
          <div className="centerCards" style={{ scale: "0.9" }}>
            <div
              className="cardOnBoarding"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={() => {
                let temp = companyTypeData.find(
                  (o) => o.lookup_code === "BAP"
                ).id;
                handleButtonClick(temp);
                setisFormSelected(true);
                setOndcCon2(1);
                setOndcCon1(0);
                setOndcCon1(2);
                setShow(true);
              }}
            >
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Application Provider ”BAP”
                  <br />
                </a>
                <a>Create a Buyer Application to buy goods & services </a>
                {/* <ArrowForwardIcon className="arrowIcon" /> */}
              </div>
              <ArrowForwardIcon className="arrowIcon" />
            </div>
            <div
              className="cardOnBoarding"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={() => {
                let temp = companyTypeData.find((o) => o.lookup_code === "BPP").id;
                console.log(temp,"temp");
                handleButtonClick(temp,true);

                setisFormSelected(true);
                setOndcCon2(1);
                setOndcCon1(0);
                setOndcCon1(2);
                setShow(true);
              }}
            >
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Platfrom Provider “BPP”
                  <br />
                </a>
                <a>Create a Seller Application to Sell goods & services</a>
                {/* <ArrowForwardIcon className="arrowIcon" /> */}
              </div>
              <ArrowForwardIcon className="arrowIcon" />
            </div>
            <div
              className="cardOnBoarding"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={() => {
                let temp = companyTypeData.find(
                  (o) => o.lookup_code === "BG"
                ).id;
                handleButtonClick(temp);
                setisFormSelected(true);
                setOndcCon2(1);
                setOndcCon1(0);
                setOndcCon1(2);
                setShow(true);
              }}
            >
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Gateway Provider “BG”
                  <br />
                </a>
                <a>
                  Create a Buyer & Seller Application to buy & sell goods or
                  services
                </a>
                {/* <ArrowForwardIcon className="arrowIcon" /> */}
              </div>
              <ArrowForwardIcon className="arrowIcon" />
            </div>
            <div
              className="cardOnBoarding"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={() => {
                let temp = companyTypeData.find(
                  (o) => o.lookup_code === "LSP"
                ).id;
                handleButtonClick(temp);
                setisFormSelected(true);
                setOndcCon2(1);
                setOndcCon1(0);
                setOndcCon1(2);
                setShow(true);
              }}
            >
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Logistics Provider “LSP”
                  <br />
                </a>
                <a>Create a application for Logistics services for sellers</a>
                {/* <ArrowForwardIcon className="arrowIcon" /> */}
              </div>
              <ArrowForwardIcon className="arrowIcon" />
            </div>
            <div
              className="cardOnBoarding"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={() => {
                let temp = companyTypeData.find(
                  (o) => o.lookup_code === "RSP"
                ).id;
                handleButtonClick(temp);
                setisFormSelected(true);
                setOndcCon2(1);
                setOndcCon1(0);
                setOndcCon1(2);
                setShow(true);
              }}
            >
              <div>
                <a style={{ fontWeight: "bold" }}>
                  Reconciliation and settlement service provider “RSP”
                  <br />
                </a>
                <a>Create a Payment & settlement application as a service</a>
                {/* <ArrowForwardIcon className="arrowIcon" /> */}
              </div>
              <ArrowForwardIcon className="arrowIcon" />
            </div>
          </div>
        </>
      )}

      {isFormSelected &&
        userSideFormSelected &&
        activateBuyer &&
        buyerStep === 0 && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "5vh",
            }}
          >
            <div
              style={{
                width: "50%",
                zIndex: "1",
                background: "white",
                alignSelf: "flex-start",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <img
                src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                style={{
                  // height: "100px",
                  width: "150px",
                  padding: "20px",
                }}
                alt="siva"
              />
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "85%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    color: "rgba(0, 22, 97, 0.9)",
                    fontWeight: "bold",
                    fontSize: "33px",
                  }}
                >
                  Buy on Siva
                </Typography>
                <div
                  // className="form"
                  style={
                    {
                      // margin: "50px",
                      // scale: "0.9",
                    }
                  }
                >
                  {Buyer_info.map((field) => {
                    return (
                      <InputOnboarding
                        labelcolor="black"
                        key={field.key}
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        value={field.value}
                        placeholder={
                          field?.placeholder
                            ? field?.placeholder
                            : `Enter ${field.label}`
                        }
                        onChange={(e, value) => {
                          console.log(value, "value");
                          handelInputChange(
                            field.key,
                            field.type == "select" ? value : e.target.value
                          );
                        }}
                        width="40vw"
                        liner={field?.liner}
                      />
                    );
                  })}
                </div>

                <Button
                  style={{
                    textTransform: "none",
                    alignSelf: "start",
                  }}
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={handleClickOpen}
                >
                  Submit
                </Button>
              </div>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                style={{
                  fontWeight: "900",
                  fontFamily: "Poppins",
                }}
                id="alert-dialog-title"
              >
                {"Successfully Registered!!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You will recieve a message from siva in whatsapp.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        )}

      {isFormSelected &&
        userSideFormSelected &&
        activateSeller &&
        sellerStep === 0 && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "white",
                alignSelf: "flex-start",
              }}
            >
              <img
                src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                style={{
                  // height: "100px",
                  width: "150px",
                  padding: "20px",
                }}
                alt="siva"
              />
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2vh",
              }}
            >
              <div style={{ width: "85%" }}>
                <Typography
                  style={{
                    color: "rgba(0, 22, 97, 0.9)",
                    fontWeight: "bold",
                    fontSize: "33px",
                    // lineHeight: "0",
                    // marginTop: "4vh",
                  }}
                >
                  Contact Information
                </Typography>
                <div className="form">
                  {contact_info.map((field) => {
                    return (
                      <>
                        <InputOnboarding
                          // data={field?.datax}
                          minLength={field.minLength ? field.minLength : ""}
                          maxLength={field.maxLength ? field.maxLength : ""}
                          errorMessage={
                            field.errorMessage ? field.errorMessage : ""
                          }
                          regex={field.regex ? field.regex : ""}
                          labelcolor="black"
                          required={field?.required}
                          key={field.key}
                          type={field.type}
                          label={field.label}
                          name={field.label}
                          value={field.value}
                          placeholder={`Enter ${field.label}`}
                          onChange={(e, value) => {
                            handelInputChange(
                              field.key,
                              field.type == "select" ? value : e.target.value
                            );
                          }}
                          setgstDoc={setgstDoc}
                          setpanDoc={setpanDoc}
                        />
                      </>
                    );
                  })}
                </div>
              </div>

              <div style={{ width: "85%" }}>
                <Typography
                  style={{
                    color: "rgba(0, 22, 97, 0.9)",
                    fontWeight: "bold",
                    fontSize: "33px",
                  }}
                >
                  Store Details
                </Typography>
                <div className="form">
                  {about_your_business.map((field) => {
                    return (
                      <>
                        <InputOnboarding
                          // data={field?.datax}
                          minLength={field.minLength ? field.minLength : ""}
                          maxLength={field.maxLength ? field.maxLength : ""}
                          errorMessage={
                            field.errorMessage ? field.errorMessage : ""
                          }
                          regex={field.regex ? field.regex : ""}
                          labelcolor="black"
                          required={field?.required}
                          key={field.key}
                          type={field.type}
                          label={field.label}
                          name={field.label}
                          value={field.value}
                          placeholder={`Enter ${field.label}`}
                          data={
                            field.key == "category"
                              ? domainTypeData.map((item) => {
                                  return {
                                    label: item.display_name,
                                    id: item.id,
                                  };
                                })
                              : []
                          }
                          onChange={(e, value) => {
                            if (field.type == "date") {
                              handelDateChange(e, field.key);
                            } else {
                              handelInputChange(
                                field.key,
                                field.type == "select" ? value : e.target.value
                              );
                            }
                          }}
                          setgstDoc={setgstDoc}
                          setpanDoc={setpanDoc}
                        />
                      </>
                    );
                  })}
                </div>

                <Button
                  style={{
                    // color: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                    // borderColor: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                    textTransform: "none",
                    top: "2vh",
                    marginBottom: "4vh",
                    alignSelf: "flex-start",
                  }}
                  disabled={contactInformation}
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() => {
                    setSellerStep(1);
                    updateCompany();
                    // dispatch(load_dashboard_type());
                  }}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        )}

      {isFormSelected &&
        userSideFormSelected &&
        activateSeller &&
        sellerStep === 1 && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "scroll",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "white",
                alignSelf: "flex-start",
                // position: "absolute",
                // top: "0",
                // left: "0",
              }}
            >
              <img
                src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                style={{
                  // height: "100px",
                  width: "150px",
                  padding: "20px",
                }}
                alt="siva"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2vh",
                // marginTop: "50px",
              }}
            >
              <div style={{ width: "85%", height: "100%" }}>
                <Typography
                  style={{
                    color: "rgba(0, 22, 97, 0.9)",
                    fontWeight: "bold",
                    fontSize: "33px",
                  }}
                >
                  Location and areas
                </Typography>
                <div className="form">
                  {location_areas.map((field) => {
                    return (
                      <>
                        <InputOnboarding
                          // data={field?.datax}
                          minLength={field.minLength ? field.minLength : ""}
                          maxLength={field.maxLength ? field.maxLength : ""}
                          errorMessage={
                            field.errorMessage ? field.errorMessage : ""
                          }
                          regex={field.regex ? field.regex : ""}
                          labelcolor="black"
                          required={field?.required}
                          key={field.key}
                          type={field.type}
                          label={field.label}
                          name={field.label}
                          value={field.value}
                          placeholder={
                            field?.placeholder
                              ? field?.placeholder
                              : `Enter ${field.label}`
                          }
                          data={
                            field.key == "service_area"
                              ? sellerApp
                              : field.key == "state"
                              ? indianStates.map((state) => {
                                  return { label: state?.name, id: state?.id };
                                })
                              : []
                          }
                          onChange={(e, value) => {
                            handelInputChange(
                              field.key,
                              field.type == "select" ? value : e.target.value
                            );
                          }}
                          setgstDoc={setgstDoc}
                          setpanDoc={setpanDoc}
                        />
                      </>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "40px",
                      paddingBottom: "30px",
                      paddingTop: "55px",
                    }}
                  >
                    <Typography>Service Area</Typography>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setshowLocationCard(true);
                      }}
                    >
                      Service Areas
                    </Button>
                  </div>
                  {range.map((field) => {
                    return (
                      <>
                        <InputOnboarding
                          // data={field?.datax}
                          labelcolor="black"
                          required={field?.required}
                          key={field.key}
                          type={field.type}
                          label={field.label}
                          name={field.label}
                          value={field.value}
                          placeholder={
                            field?.placeholder
                              ? field?.placeholder
                              : `Enter ${field.label}`
                          }
                          onChange={(e, value) => {
                            handelInputChange(
                              field.key,
                              field.type == "select" ? value : e.target.value
                            );
                          }}
                        />
                      </>
                    );
                  })}
                  {showLocationCard && (
                    <ModalViewV2
                      modalTitle={"Add Service Areas"}
                      handleConfirm={() => {
                        handleClose("locationCard");
                      }}
                      handleModalClose={() => {
                        handleClose("locationCard");
                      }}
                      modalOpen={showLocationCard}
                      actionBtns={["Cancel", "Confirm"]}
                      component={"editAddress"}
                    >
                      {/* <Typography>HELLO</Typography> */}
                      <Map setSerViceArea={setSerViceArea} />
                    </ModalViewV2>
                  )}
                </div>

                <Button
                  style={{
                    // color: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                    // borderColor: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                    textTransform: "none",
                    top: "2vh",
                    marginBottom: "4vh",
                    alignSelf: "flex-start",
                  }}
                  disabled={false}
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() => {
                    setSellerStep(2);
                    createCompanyLocation();
                  }}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        )}

      {isFormSelected &&
        userSideFormSelected &&
        activateSeller &&
        sellerStep === 2 &&
        !isCustomTime && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "5vh",
              overflow: "scroll",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "50%",
                zIndex: "1",
                background: "white",
              }}
            >
              <img
                src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                style={{
                  // height: "100px",
                  width: "150px",
                  padding: "20px",
                }}
                alt="siva"
              />
            </div>
            <div
              style={{ width: "90%", display: "flex", flexDirection: "column" }}
            >
              <div
                className="form"
                style={{
                  // margin: "50px",
                  // scale: "0.9",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5vh",
                }}
              >
                <Typography
                  style={{
                    color: "rgba(0, 22, 97, 0.9)",
                    fontWeight: "bold",
                    fontSize: "33px",
                    // lineHeight: "0",
                    // marginTop: "108px",
                    letterSpacing: "0",
                    position: "relative",
                  }}
                >
                  Open hours
                </Typography>

                <div>
                  <div style={{ display: "flex", gap: "3vw" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div>
                        Opening time
                        <span className="product_required_mark">*</span>
                      </div>
                      <span style={{ marginRight: 20 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label=""
                            value={openingTimings1[0].value}
                            onChange={(newValue) => {
                              handelTimeChange("open", newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div>
                        Closing time
                        <span className="product_required_mark">*</span>
                      </div>
                      <span style={{ marginRight: 20 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label=""
                            value={openingTimings1[1].value}
                            onChange={(newValue) => {
                              handelTimeChange("close", newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer", marginTop: "2vh" }}
                    onClick={() => {
                      setCustomTime(1);
                    }}
                  >
                    Click here to customize the timings
                  </div>
                </div>

                {/* _____ */}
              </div>
              <Button
                style={{
                  // color: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                  // borderColor: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                  textTransform: "none",
                  top: "80px",
                  width: "200px",
                }}
                variant="contained"
                color="primary"
                disabled={openHoursInformation}
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => {
                  setSellerStep(3);
                  var temp = mainData;
                  temp["openingTimings"] = openingTimings1;
                  setMainData(temp);
                  updateStoreTimings(0);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}

      {isFormSelected &&
        userSideFormSelected &&
        activateSeller &&
        sellerStep === 2 &&
        isCustomTime && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              overflowY: "scroll",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "white",
                alignSelf: "flex-start",
              }}
            >
              <img
                src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                style={{
                  // height: "100px",
                  width: "150px",
                  padding: "20px",
                }}
                alt="siva"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "2vh",
                // marginTop: "30px",
              }}
            >
              <div style={{ width: "85%" }}>
                <div
                  className="form"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5vh",
                  }}
                >
                  <Typography
                    style={{
                      color: "rgba(0, 22, 97, 0.9)",
                      fontWeight: "bold",
                      fontSize: "33px",
                    }}
                  >
                    Customize timings
                  </Typography>
                  {/* <Radio2
                name={"open_hrs"}
                options={openHours}
                handelRadioBtn={handelRadioBtn}
              /> */}
                  <div
                    style={{ borderTop: "2px solid grey", width: "100%" }}
                  ></div>

                  <ScheduleTimings
                    data1={openingTimings}
                    setData={setOpeningTimings}
                  />

                  {/* _____ */}
                </div>
                <div
                  style={{
                    textTransform: "none",
                    background: "#416BFF",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: "4px",
                    width: "213px",
                    padding: "5px",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "16px",
                    margin: "20px 0 20px 0",
                  }}
                  onClick={() => {
                    setSellerStep(3);
                    var temp = mainData;
                    temp["openingTimings"] = openingTimings;
                    setMainData(temp);
                    updateStoreTimings(1);
                  }}
                >
                  Save and Continue <ArrowForwardIosIcon />
                </div>
              </div>
            </div>
          </div>
        )}

      {isFormSelected &&
        userSideFormSelected &&
        activateSeller &&
        sellerStep === 44 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                flexDirection: "column",
                gap: "5vh",
                // overflow: "scroll",
              }}
            >
              <div
                style={{
                  // position: "absolute",
                  top: "0",
                  left: "0",
                  width: "50%",
                  zIndex: "1",
                  // background: "red",
                }}
              >
                <img
                  src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                  style={{
                    // height: "100px",
                    width: "150px",
                    padding: "20px",
                  }}
                  alt="siva"
                />
              </div>
              <div style={{ height: "100%", width: "100%" }}>
                <div
                  className="form"
                  style={{
                    // margin: "50px",
                    scale: "0.9",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5vh",
                  }}
                >
                  <Typography
                    style={{
                      color: "rgba(0, 22, 97, 0.9)",
                      fontWeight: "bold",
                      fontSize: "33px",
                      // lineHeight: "0",
                      marginTop: "4vh",
                      letterSpacing: "0",
                      position: "relative",
                    }}
                  >
                    What are the different apps you would sell on
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    {platform.map((o) => {
                      return (
                        <div
                          style={{
                            height: "100px",
                            width: "100px",
                            boxShadow: o.selected
                              ? "0px 4px 4px rgba(0, 0, 255, 0.5)"
                              : "0px 4px 4px rgba(0, 0, 0, 0.1)",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            setPlatform(
                              platform.map((items) => {
                                if (items.id == o.id) {
                                  return {
                                    ...items,
                                    selected: !items.selected,
                                  };
                                }
                                return items;
                              })
                            );
                            const x =
                              selectedPlatform.filter((x) => x == o.id).length >
                              0
                                ? o.id
                                : null;
                            console.log("xVal", x);
                            if (x) {
                              console.log(
                                selectedPlatform.filter((x) => x != o.id),
                                "listed Data"
                              );
                              setSelectedPlatform(
                                selectedPlatform.filter((x) => x != o.id)
                              );
                            } else {
                              console.log(
                                [...selectedPlatform, o.id],
                                "listedadded Data"
                              );
                              setSelectedPlatform([...selectedPlatform, o.id]);
                            }
                          }}
                        >
                          <img style={{ width: "100px" }} src={o.imageUrl} />
                        </div>
                      );
                    })}
                  </div>

                  {/* _____ */}
                </div>
                <Button
                  style={{
                    // color: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                    // borderColor: isValidated ? "rgba(0, 22, 97, 1)" : "grey",
                    textTransform: "none",
                    // top: "80px",
                    left: "157px",
                  }}
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() => {
                    setSellerStep(1);
                    var temp = mainData;
                    temp[""];
                  }}
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </>
        )}

      {isFormSelected &&
        userSideFormSelected &&
        activateSeller &&
        sellerStep === 3 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                flexDirection: "column",
                gap: "5vh",
                // overflow: "scroll",
              }}
            >
              <div
                style={{
                  // position: "absolute",
                  top: "0",
                  left: "0",
                  width: "50%",
                  zIndex: "1",
                  // background: "red",
                }}
              >
                <img
                  src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                  style={{
                    // height: "100px",
                    width: "150px",
                    padding: "20px",
                  }}
                  alt="siva"
                />
              </div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "85%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "2vh",
                  }}
                >
                  <div
                    className="form"
                    style={{
                      // margin: "50px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5vh",
                    }}
                  >
                    <Typography
                      style={{
                        color: "rgba(0, 22, 97, 0.9)",
                        fontWeight: "bold",
                        fontSize: "33px",
                        // lineHeight: "0",
                        marginTop: "4vh",
                        letterSpacing: "0",
                        position: "relative",
                      }}
                    >
                      What are the different apps you would sell on
                    </Typography>

                    <Stack spacing={3} sx={{ width: 550 }}>
                      <Autocomplete
                        disableCloseOnSelect
                        multiple
                        id="tags-outlined"
                        options={sellerApp}
                        getOptionLabel={(option) => option}
                        // defaultValue={[top100Films[1]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Seller App"
                            placeholder=""
                          />
                        )}
                        onChange={(e, option) => {
                          console.log("eeeeeeeeee", e, option);

                          setSelectedApps((selectedApps) => {
                            return option;
                          });
                        }}
                      />
                    </Stack>
                    {/* _____ */}
                    <Button
                      style={{
                        alignSelf: "start",
                        textTransform: "none",
                        // left: "157px",
                      }}
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => {
                        var newMainData = mainData;
                        newMainData["sellerApps"] = selectedApps;
                        setMainData(newMainData);
                        updateSellerApps();
                        closeOnBoarding();
                        // setSellerStep(1);
                      }}
                    >
                      Save and Continue
                    </Button>
                  </div>
                  {/* <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                      width: "80%",
                      alignSelf: "center",
                    }}
                  >
                    {selectedApps.map((o) => {
                      return (
                        <div
                          style={{
                            height: "75px",
                            width: "75px",
                            boxShadow: o.selected
                              ? "0px 4px 4px rgba(0, 0, 255, 0.5)"
                              : "0px 4px 4px rgba(0, 0, 0, 0.1)",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >

                          <img
                            style={{ width: "75px" }}
                            src={platform.find((e) => e?.title == o)?.imageUrl ? platform.find((e) => e?.title == o)?.imageUrl : ""}
                          />
                        </div>
                      );
                    })}
                  </div> */}
                  {/* <Button
                    style={{
                      alignSelf: "start",
                      textTransform: "none",
                      // left: "157px",
                    }}
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={() => {
                      var newMainData = mainData;
                      newMainData["sellerApps"] = selectedApps;
                      setMainData(newMainData);
                      updateSellerApps();
                      closeOnBoarding();
                      // setSellerStep(1);
                    }}
                  >
                    Save and Continue
                  </Button> */}
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default ApplicationSide;


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