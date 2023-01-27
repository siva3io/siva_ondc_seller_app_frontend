import {
  Button,
  TextareaAutosize,
  Switch,
  FormControl,
  FormGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import ModalViewV2 from "../../Components/ModalViewV2";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));

import ErrorBoundary from "../../ErrorBoundary";
import AddForm from "Remote/AddForm";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./AccountDetails.css";
import MatSelect from "Remote/MatDropDown";
import {
  createLocation,
  loadAdminSettingsDataById,
  loadDeliveryPreferencesDataById,
  loadDeliveryTypeDataById,
  loadOtpPreferenceList,
  loadStateDataById,
  update_settings,
  loadRegisteredCompanyAddress,
  loadFinalcialMonth,
  loadPickUpAddress,
  loadLookupCodes,
  loadPriceTypeList,
  ondcUpdate,
  loadCitiesData,
  loadCountryData,
  loadLocationTypes,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import moment from "moment";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const AccountDetails = ({ user_data }) => {
  console.log("user_data", user_data);
  const [query, setQuery] = useState(true);
  const [query1, setQuery1] = useState(true);
  const [query2, setQuery2] = useState(true);
  const [query3, setQuery3] = useState(true);
  const [query4, setQuery4] = useState(true);
  const [query5, setQuery5] = useState(true);

  const [saveEnable, setSaveEnable] = useState(false);
  const [variant, setVariant] = useState();
  const [prevVariant, setPrevVariant] = useState();
  const [mainData, setMainData] = useState({});
  const [addAddress, setAddAddress] = useState(false);
  const [newlocationData, setnewlocationData] = useState({
    Name: "",
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    email: "",
  });
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOtpPreferenceList());
    dispatch(loadAdminSettingsDataById());
    dispatch(loadFinalcialMonth());
    dispatch(loadLookupCodes());
    dispatch(loadPriceTypeList());
    dispatch(loadCountryData())
    dispatch(loadStateDataById(100));
    dispatch(loadCitiesData());
    dispatch(loadLocationTypes());
  }, []);

  useEffect(() => {
    dispatch(
      loadRegisteredCompanyAddress(
        lookupdata?.find((o) => o.lookup_code == "OFFICE")?.id
      )
    );
    dispatch(
      loadPickUpAddress(lookupdata?.find((o) => o.lookup_code == "PICKUP_LOCATION")?.id)
    );
  }, [lookupdata]);

  const {
    Statedata,
    otpPreferenceList,
    adminSettingsView,
    months,
    registeredCompanyAddress,
    lookupdata,
    pickupAddress,
    priceTypes,
    Countrydata,
    CitiesData,
    locationTypes
  } = useSelector((state) => state.data);

  useEffect(()=>{ console.log("registeredCompanyAddress : ",registeredCompanyAddress );console.log("pickupAddress: ",pickupAddress) },[registeredCompanyAddress,pickupAddress])

  console.log("details of adminSettingsView", adminSettingsView);
  const handleChange = (event) => {
    console.log(event.target.name, event.target.checked, "checkbox");
    if (event.target.name == "k1") {
      setChecked1(event.target.checked);
    }
    if (event.target.name == "k2") {
      setChecked2(event.target.checked);
    }
  };

  const onInputChange = (key, value) => {
    console.log("key", key, "value", value);

    if (key.includes("reg_")) {
      setRegisteredAdd((RegisteredAdd) => {
        return RegisteredAdd.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("info_")) {
      setDisplayInfo((DisplayInfo) => {
        return DisplayInfo.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("contact_details_")) {
      setContactDetails((ContactDetails) => {
        return ContactDetails.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("login_details_")) {
      setLoginDetails((LoginDetails) => {
        return LoginDetails.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("pickup_")) {
      setPickupAdd((PickupAdd) => {
        return PickupAdd.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("other_")) {
      setOtherDetails((otherDetails) => {
        return otherDetails.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    console.log(newMainData, "newMainData");
    setSaveEnable(true);
  };

  useEffect(() => {
    console.log("otherDetails", otherDetails);
  }, [otherDetails]);

  const onSelectChange = (key, value) => {
    console.log("key", key, "value", value);

    if (key.includes("info_")) {
      setDisplayInfo((DisplayInfo) => {
        return DisplayInfo.map((o) => {
          if (o?.key == key) {
            o["text"] = value.label;
          }
          return o;
        });
      });
    } else if (key.includes("reg_")) {
      setRegisteredAdd((RegisteredAdd) => {
        return RegisteredAdd.map((o) => {
          if (o?.key == key) {
            o["text"] = value.label;
          }
          return o;
        });
      });
    } else if (key.includes("info_")) {
      setDisplayInfo((DisplayInfo) => {
        return DisplayInfo.map((o) => {
          if (o?.key == key) {
            o["text"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("contact_details_")) {
      setContactDetails((ContactDetails) => {
        return ContactDetails.map((o) => {
          if (o?.key == key) {
            o["text"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("login_details_")) {
      setLoginDetails((LoginDetails) => {
        return LoginDetails.map((o) => {
          if (o?.key == key) {
            o["text"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("pickup_")) {
      setPickupAdd((PickupAdd) => {
        return PickupAdd.map((o) => {
          if (o?.key == key) {
            o["text"] = value;
          }
          return o;
        });
      });
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    console.log(newMainData, "newMainData");
    //---
    //---
    setSaveEnable(true);
  };

  const [addAddressMain, setAddAddressMain] = useState({});

  const handelInputChangeLocation = (key, value,index) => {
    console.log(key, value, index,"handelInputChangeLocation")
    // setnewlocationData({ ...newlocationData, [key]: value });
    try {
      var newLocationForm = LocationForm.map((o) => {
        if (o.key == key) o.value = value;
        if (o.key == "add_address_country"){
          dispatch(loadStateDataById(value?.id));
        }
        return o;
      });
      setLocationForm(newLocationForm);
    } catch (e) {}

    var newMainData = addAddressMain;
    newMainData[key] = value;
    setAddAddressMain(newMainData);
  };

  const addNewAddress = () => {
    console.log("addNewAddress", addAddressMain);

    var data = {
      location_type_id: lookupdata?.find(
        (o) => o.lookup_code == "PICKUP_LOCATION"
      )?.id, //LOCATION_TYPE -> PICKUP_LOCATION
      company_id: JSON.parse(localStorage.getItem("user_data"))?.company_id
        ? JSON.parse(localStorage.getItem("user_data"))?.company_id
        : 1,
      address: {
        address_line_1: addAddressMain?.add_address_address_line_1,
        address_line_2: addAddressMain?.add_address_address_line_2,
        address_line_3: addAddressMain?.add_address_address_line_3,
        land_mark: "Near Railway Station",
        pin_code: addAddressMain?.add_address_pincode,
        state: addAddressMain?.add_address_state,
        country: addAddressMain?.add_address_country,
        city: addAddressMain?.add_address_city,
        phone: addAddress?.add_address_phone_number,
      },
      latitude: 11.280292,
      longitude: 22.379383,
      serviceable_area_ids: [
        {
          latitude: 11.280292,
          longitude: 22.379383,
          city: "Salem",
          radius: 10,
        },
      ],
    };
    console.log("Sample");
    dispatch(createLocation(data));
  };

  const sendData = (key) => {
    console.log("mainData", mainData);
    var data = {};
    if (key == 1) {
      data = {
        company_details: {
          financial_year_start_id: mainData?.info_financial_year?.id,
          financial_year_end_id: mainData?.info_financial_year?.id,
          store_name: mainData?.info_name,
          store_description: mainData?.info_description,

        },
      };
    } else if (key == 2) {
      data = {
        name: mainData?.contact_details_name,
        phone: mainData?.contact_details_number,
        email: mainData?.contact_details_mail,
        time_slots_preferred: mainData?.contact_details_time_slots,
        language_preferred: mainData?.contact_details_language,
        working_hours_start_time: "2022-12-13T12:53:45.453Z",
        working_hours_end_time: "2022-12-13T12:53:45.453Z",
      };
    } else if (key == 3) {
      data = {
        otp_preference_id: mainData?.login_details_otp,
      };
    } else if (key == 4) {
      // data = {
      //   address: {
      //     state: {
      //       id: 2,
      //       name: "Andhra Pradesh",
      //     },
      //     country: {
      //       id: 1,
      //       name: "INDIA",
      //     },
      //     pin_code: mainData?.pickup_pincode,
      //     land_mark: "Near Railway Station",
      //     address_line_1: mainData?.pickup_address_line_1,
      //     address_line_2: mainData?.pickup_address_line_2,
      //     address_line_3: "Near Railway Station",
      //   },
      // };
      data = {
        otp_preference_id: mainData?.login_details_otp?.id,
      };
    } else if (key == 5) {
      data = {
        is_collector: mainData?.other_colletor,
        buyer_app_finder_fee_amount: mainData?.other_finder_fee,
        buyer_app_finder_fee_type: mainData?.other_price_type?.label,
      };
    } else if (key == 6) {
      var singleAdd = pickupAddress

      singleAdd = singleAdd[ pickupAddress.length-1]
      
      console.log("pickup_address",pickupAddress,registeredCompanyAddress)
      var data = {
        location_type_id: lookupdata?.find(
          (o) => o.lookup_code == "PICKUP_LOCATION"
        )?.id, //LOCATION_TYPE -> PICKUP_LOCATION
        company_id: 2,
        address: {
          address_line_1: mainData?.pickup_address_line_1 ? mainData?.pickup_address_line_1 : singleAdd?.address?.address_line_1  ,
          address_line_2: mainData?.pickup_address_line_2 ?mainData?.pickup_address_line_2 : singleAdd?.address?.address_line_2 ,
          address_line_3: mainData?.pickup_address_line_3 ?mainData?.pickup_address_line_3 : singleAdd?.address?.address_line_3 ,
          land_mark: mainData?.pickup_address_land_mark ? mainData?.pickup_address_land_mark : singleAdd?.address?.land_mark  ,
          pin_code: mainData?.pickup_pincode ? mainData?.pickup_pincode : singleAdd?.address?.pin_code,
          city: mainData?.pickup_city ? mainData?.pickup_city : singleAdd?.address?.city ,
          state: mainData?.pickup_state ? mainData?.pickup_state : singleAdd?.address?.state,
          country: singleAdd?.address?.country
        }
      };
      dispatch(createLocation(data, singleAdd?.id));
    }

    if (key == 5) {
      dispatch(ondcUpdate(data));
    } else {
      dispatch(update_settings(data));
    }
    dispatch(loadAdminSettingsDataById());
  };

  const handleClose = (param) => {
    setAddAddress(false);
  };

  const handelTimeChange = (key, value) => {
    console.log(key, value);
    var temp = ContactDetails;
    if (key == "from") temp[5].value[0].value = value;
    // temp[5].value[0].value=moment(value).format("DD-MM-YYYY")
    if (key == "to") temp[5].value[1].value = value;
    // temp[5].value[1].value=moment(value).format("DD-MM-YYYY")
    console.log();
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
    setContactDetails((o) => {
      return temp;
    });

    console.log(newMainData, "newMainData");
  };

  const [DisplayInfo, setDisplayInfo] = useState([]);
  const [ContactDetails, setContactDetails] = useState([]);
  const [RegisteredAdd, setRegisteredAdd] = useState([]);
  const [LoginDetails, setLoginDetails] = useState([]);
  const [PickupAdd, setPickupAdd] = useState([]);
  const [LocationForm, setLocationForm] = useState([]);
  const [otherDetails, setOtherDetails] = useState([]);

  const [twoStep, settwoStep] = useState([]);
  const [dummy, setDummy] = useState(1);

  useEffect(() => {
    console.log();
  }, [months]);

  useEffect(() => {
    // console.log(months?.find(o=>{ o.id == adminSettingsView?.company_details?.financial_year_start_id }), "monthData")
    setDisplayInfo([
      {
        key: "info_name",
        label: "Display Name",
        value: adminSettingsView?.company_details?.store_name,
      },
      {
        key: "info_financial_year",
        label: "Financial Year",
        type: "select",
        value:adminSettingsView?.company_details?.financial_year_start
      },
      {
        key: "info_description",
        label: " Business Description ",
        value: adminSettingsView?.company_details?.store_description,
      },
    ]);
    // Contact Details
    setContactDetails([
      {
        key: "contact_details_name",
        label: "Name",
        value: adminSettingsView?.name,
      },
      {
        key: "contact_details_number",
        label: "Mobile Number",
        value: adminSettingsView?.phone,
      },
      {
        key: "contact_details_mail",
        label: "Email Address",
        value: adminSettingsView?.email,
      },
      {
        key: "contact_details_time_slots",
        label: "Preferred Time Slots",
        value: adminSettingsView?.time_slots_preferred,
      },
      {
        key: "contact_details_language",
        label: "Preferred language",
        value: adminSettingsView?.language_preferred,
      },
      {
        label: "Working Hours Setup",
        type: "time_card",
        key: "contact_details_working_hours",
        value: [
          {
            label: "from",
            type: "time",
            key: "from",
            value: adminSettingsView?.working_hours_start_time,
          },
          {
            label: "to",
            type: "time",
            key: "to",
            value: adminSettingsView?.working_hours_end_time,
          },
        ],
      },
    ]);

    setLoginDetails([
      {
        key: "login_details_mobile",
        label: "Mobile Number",
        disable: true,
        value: adminSettingsView?.phone,
      },
      {
        key: "login_details_mail",
        label: "Email Address",
        disable: true,
        value: adminSettingsView?.email,
      },
      {
        key: "login_details_otp",
        label: "OTP Sent on",
        type: "select",
        value: adminSettingsView?.otp_preferences?.display_name,
      },
    ]);

    settwoStep([
      {
        key: "DisplayName",
        label: "Enter Recover Email Address",
        // value: rspFetchedData?.orderId,
      },
      {
        key: "Bussiness_Description",
        label: "Enter Recover Mobile Number",
        // value: rsp_view_data?.invoiceId,
      },
    ]);

    setLocationForm([
      {
        label: "Contact Person's Name",
        type: "input",
        key: "add_address_contact_person_name",
        //   required: true,
      },
      {
        label: "Location Name",
        type: "input",
        key: "add_address_location_name",
        // required: true,
      },
      {
        label: "Location Type",
        type: "select",
        key: "add_address_location_type",
        // required: true,
      },

      {
        label: "Address Line 1",
        type: "input",
        key: "add_address_address_line_1",
        //   required: true,
      },
      {
        label: "Address Line 2",
        type: "input",
        key: "add_address_address_line_2",
        //   required: true,
      },
      {
        label: "Address Line 3 (optional)",
        type: "input",
        key: "add_address_address_line_3",
      },
      {
        label: "Pincode",
        type: "input",
        key: "add_address_pincode",
      },
      {
        label: "Country",
        type: "select",
        key: "add_address_country",
        // defaultVal: {},
      },
      {
        label: "State",
        type: "select",
        key: "add_address_state",
        // defaultVal: {},
      },
      {
        label: "City/Town",
        type: "select",
        key: "add_address_city",
      },

      {
        label: "Contact Person's Number",
        type: "input",
        key: "add_address_phone_number",
        // required: true,
        // defaultVal: {},
      },
    ]);

    setOtherDetails([
      {
        key: "other_price_type",
        label: "Price Type",
        type: "select",
        value: adminSettingsView?.ondc_details?.buyer_app_finder_fee_type,
      },
      {
        label: "Mark as collector",
        type: "checkbox",
        key: "other_colletor",
        value: true,
        handleCheckBox: handleCheckBox,
        value: adminSettingsView?.ondc_details?.is_collector,
      },
      {
        label: "Buyer finder fee",
        type: "text",
        key: "other_finder_fee",
        //   required: true,
        value: adminSettingsView?.ondc_details?.buyer_app_finder_fee_amount,
      },
    ]);
  }, [adminSettingsView, months, priceTypes]);

  useEffect(() => {
    var temp = registeredCompanyAddress;
    temp = temp[0];

    setRegisteredAdd([
      {
        key: "reg_address_line_1",
        label: "Address Line 1",
        value: temp?.address?.address_line_1,
      },
      {
        key: "reg_address_line_2",
        label: "Address Line 2",
        value: temp?.address?.address_line_2,
      },
      {
        key: "reg_pin_code",
        label: "Pincode",
        value: temp?.address?.address_line_3,
      },
      {
        key: "reg_city",
        label: "City",
        value: user_data?.address?.city,
      },
      {
        key: "reg_state",
        label: "State",
        type: "select",
        value: temp?.address?.state,
      },
    ]);
  }, [registeredCompanyAddress]);

  useEffect(() => {
    var temp = pickupAddress;
    temp = temp[0];
    setPickupAdd([
      {
        key: "pickup_address_line_1",
        label: "Address Line 1",
        type: "text",
        value: temp?.address?.address_line_1,
      },
      {
        key: "pickup_address_line_2",
        label: "Address Line 2",
        type: "text",
        value: temp?.address?.address_line_2,
      },
      {
        key: "pickup_pincode",
        label: "Pincode",
        type: "text",
        value: temp?.address?.pin_code,
      },
      {
        key: "pickup_city",
        label: "City",
        type: "select",
        value: temp?.address?.city,
        data: CitiesData?.map((o) => {return { label: o?.City, id: o?.Code };}),

        // value: rsp_view_data?.invoiceId,
      },
      {
        key: "pickup_state",
        label: "State",
        type: "select",
        value: temp?.address?.state,
        data: Statedata?.map((o) => {return { label: o?.name, id: o?.id };}),
      },
    ]);
  }, [pickupAddress]);
  // console.log("otherdetails........", otherDetails);
  const handleCheckBox = (key, value) => {
    console.log("temo prev here", otherDetails);
    console.log("box", key, value, typeof value);
    var temp = "";
    if (key == "other_colletor") {
      temp = otherDetails;
      temp[1]["value"] = value;
      // temp[1]["type"] = "text";
      console.log("temo here", temp);
    }
    console.log("temp", temp);
    setOtherDetails(temp);
    setDummy(dummy + 1);
    console.log(otherDetails, "otherDetails");
  };

  const handelSelectonChangeDetails = (key, value) => {
    console.log(key, value, "key, value , index");

    if (key.includes("login_details_otp")) {
      setLoginDetails((temp) => {
        return temp.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    } else if (key.includes("pickup_state")) {
      setPickupAdd((temp) => {
        return temp.map((o) => {
          if (o?.key == key) {
            o["value"] = value;
          }
          return o;
        });
      });
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    console.log(newMainData, "newMainData");
    setSaveEnable(true);
  };

  useEffect(() => {
    console.log(ContactDetails, "ContactDetails");
  }, [ContactDetails]);

  const userData = JSON.parse(localStorage.getItem("user_data"));
  const userTypeValue =
    userData?.user_types.length > 0 &&
    userData?.user_types[0]?.name.toUpperCase().includes("ADMIN")
      ? true
      : false;
  return (
    <>
      { registeredCompanyAddress && (
        <>
          {/* display info */}
          <Box className="adminSettings_DetailsView">
            <Box className="adminSettings_DetailsOrderHeader">
              <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>
                Display Information
              </h3>
              <Box className="adminSettings_DetailsOrderHeader_btn">
                {query ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuery((prev) => !prev);
                      setSaveEnable(false);
                    }}
                    style={{ textTransform: "none", background: "#416BFF" }}
                  >
                    Edit Details
                  </Button>
                ) : (
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setQuery((prev) => !prev);
                        setVariant(prevVariant);
                      }}
                      style={{ textTransform: "none", color: "#416BFF" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={!saveEnable}
                      variant="contained"
                      style={{
                        textTransform: "none",
                        marginLeft: "10px",
                        background: "#416BFF",
                        color: "#FFFFFF",
                      }}
                      onClick={() => {
                        if (saveEnable === true) {
                          setQuery((prev) => !prev);
                          setPrevVariant(variant);
                          sendData(1);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            <Box style={{ width: "100%" }}>
              {/* {variant && ( */}
              <Box className="adminSettings_details_card_grid">
                {DisplayInfo.map((o) => {
                  return (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteViewTextField
                          card
                          label={o?.label}
                          disabled_y={query}
                          name={o?.key}
                          text={o?.value ? o?.value : "--"}
                          type={o?.type ? o.type : "text"}
                          data={months?.map((o) => {
                            return { label: o?.display_name, id: o?.id };
                          })}
                          onInputChange={onInputChange}
                          onSelectChange={onSelectChange}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* contact Details */}
          <Box className="adminSettings_DetailsView">
            <Box className="adminSettings_DetailsOrderHeader">
              <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>
                Contact Details
              </h3>
              <Box className="adminSettings_DetailsOrderHeader_btn">
                {query1 ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuery1((prev) => !prev);
                      setSaveEnable(false);
                    }}
                    style={{ textTransform: "none", background: "#416BFF" }}
                  >
                    Edit Details
                  </Button>
                ) : (
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setQuery1((prev) => !prev);
                        setVariant(prevVariant);
                      }}
                      style={{ textTransform: "none", color: "#416BFF" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={!saveEnable}
                      variant="contained"
                      style={{
                        textTransform: "none",
                        marginLeft: "10px",
                        background: "#416BFF",
                        color: "#FFFFFF",
                      }}
                      onClick={() => {
                        if (saveEnable === true) {
                          setQuery1((prev) => !prev);
                          setPrevVariant(variant);
                          sendData(2);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            <Box style={{ width: "100%" }}>
              {/* {variant && ( */}
              <Box className="adminSettings_details_card_grid">
                {ContactDetails?.map((o) => {
                  return (
                    <Suspense fallback={<div>Loading... </div>}>
                      {/* <RemoteWrapper> */}
                      <RemoteViewTextField
                        card
                        label={o?.label}
                        disabled_y={query1}
                        name={o?.key}
                        text={o?.value ? o?.value : "--"}
                        type={o?.type ? o?.type : "text"}
                        onInputChange={onInputChange}
                        handelTimeChange={handelTimeChange}
                      />
                      {/* </RemoteWrapper> */}
                    </Suspense>
                  );
                })}
              </Box>
              {/* )} */}
            </Box>
          </Box>
          {/* Registered Address */}
          <Box className="adminSettings_DetailsView">
            <Box className="adminSettings_DetailsOrderHeader">
              <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>
                Registered Address
              </h3>
              {/* <Box className="adminSettings_DetailsOrderHeader_btn">
                        {query2 ? (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setQuery2((prev) => !prev);
                                    setSaveEnable(false);
                                }}
                                style={{ textTransform: "none", background: "#416BFF" }}
                            >
                                Edit Details
                            </Button>
                        ) : (
                            <Box>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setQuery2((prev) => !prev);
                                        setVariant(prevVariant);
                                    }}
                                    style={{ textTransform: "none", color: "#416BFF" }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    disabled={!saveEnable}
                                    variant="contained"
                                    style={{ textTransform: "none", marginLeft: "10px", background: "#416BFF", color: "#FFFFFF" }}
                                    onClick={() => {
                                        if (saveEnable === true) {
                                            setQuery2((prev) => !prev);
                                            setPrevVariant(variant);
                                            sendData(3);
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        )}
                    </Box> */}
            </Box>

            <Box style={{ width: "100%" }}>
              {/* {variant && ( */}
              <Box className="adminSettings_details_card_grid">
                {RegisteredAdd.map((o) => {
                  return (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteViewTextField
                          card
                          label={o?.label}
                          disabled_y={query2}
                          name={o?.key}
                          text={o?.value ? o?.value : "--"}
                          type={o?.type ? o.type : "text"}
                          data={Statedata?.map((o) => {
                            return { label: o?.name, id: o?.id };
                          })}
                          // value={o?.type == "select" ? mainData?.pickup_state : ""}
                          onInputChange={onInputChange}
                          onSelectChange={onSelectChange}
                          sx={{ width: "100%" }}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  );
                })}
              </Box>
              {/* )} */}
            </Box>
          </Box>
          {/* Login Details */}
          <Box className="adminSettings_DetailsView">
            <Box className="adminSettings_DetailsOrderHeader">
              <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>
                Login Details
              </h3>
              <Box className="adminSettings_DetailsOrderHeader_btn">
                {query3 ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuery3((prev) => !prev);
                      setSaveEnable(false);
                    }}
                    style={{ textTransform: "none", background: "#416BFF" }}
                  >
                    Edit Details
                  </Button>
                ) : (
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setQuery3((prev) => !prev);
                        setVariant(prevVariant);
                      }}
                      style={{ textTransform: "none", color: "#416BFF" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={!saveEnable}
                      variant="contained"
                      style={{
                        textTransform: "none",
                        marginLeft: "10px",
                        background: "#416BFF",
                        color: "#FFFFFF",
                      }}
                      onClick={() => {
                        if (saveEnable === true) {
                          setQuery3((prev) => !prev);
                          setPrevVariant(variant);
                          sendData(4);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            <Box style={{ width: "100%" }}>
              {/* {variant && ( */}
              <Box className="adminSettings_details_card_grid">
                {LoginDetails.map((o) => {
                  return (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteViewTextField
                          card
                          label={o?.label}
                          disabled_y={o.disable ? o.disable : query3}
                          name={o?.key}
                          text={o?.value ? o?.value : "--"}
                          type={o?.type ? o?.type : "text"}
                          data={otpPreferenceList.map((o) => {
                            return { id: o?.id, label: o?.display_name };
                          })}
                          value={
                            o?.type == "select"
                              ? mainData?.login_details_otp
                              : ""
                          }
                          onInputChange={onInputChange}
                          onSelectChange={onSelectChange}
                          sx={{ width: "100%" }}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  );
                })}
              </Box>
              {/* )} */}
            </Box>
          </Box>
          {/* Pickup Address */}
          <Box className="adminSettings_DetailsView">
            <Box className="adminSettings_DetailsOrderHeader">
              <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>
                Pickup Address
              </h3>
              <Box className="adminSettings_DetailsOrderHeader_btn">
                {query4 ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuery4((prev) => !prev);
                      setSaveEnable(false);
                    }}
                    style={{ textTransform: "none", background: "#416BFF" }}
                  >
                    Edit Details
                  </Button>
                ) : (
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setQuery4((prev) => !prev);
                        setVariant(prevVariant);
                      }}
                      style={{ textTransform: "none", color: "#416BFF" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={!saveEnable}
                      variant="contained"
                      style={{
                        textTransform: "none",
                        marginLeft: "10px",
                        background: "#416BFF",
                        color: "#FFFFFF",
                      }}
                      onClick={() => {
                        if (saveEnable === true) {
                          setQuery4((prev) => !prev);
                          setPrevVariant(variant);
                          sendData(6);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
                <Button
                  variant="contained"
                  onClick={() => {
                    setAddAddress(true);
                    addNewAddress();
                  }}
                  style={{
                    textTransform: "none",
                    background: "#416BFF",
                    marginLeft: "10px",
                  }}
                >
                  Add New Address
                </Button>
              </Box>
            </Box>

            <Box style={{ width: "100%" }}>
              {/* {variant && ( */}
              <Box className="adminSettings_details_card_grid">
                {PickupAdd.map((o) => {
                  return (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteViewTextField
                          card
                          label={o?.label ? o?.label : "--"}
                          disabled_y={query4}
                          name={o?.key}
                          text={o?.value ? o?.value : "--"}
                          type={o?.type ? o.type : "text"}
                          data={o?.data ? o?.data : ""}
                          value={
                            o?.type == "select"
                              ? mainData?.pickup_state
                              : o?.text
                          }
                          onInputChange={onInputChange}
                          onSelectChange={onSelectChange}
                          sx={{ width: "100%" }}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  );
                })}
              </Box>
              {/* )} */}
            </Box>
          </Box>
          {/* Other Details */}

          {userTypeValue && (
            <Box className="adminSettings_DetailsView">
              <Box className="adminSettings_DetailsOrderHeader">
                <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>
                  Other Details
                </h3>
                <Box className="adminSettings_DetailsOrderHeader_btn">
                  {query5 ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setQuery5((prev) => !prev);
                        setSaveEnable(false);
                      }}
                      style={{ textTransform: "none", background: "#416BFF" }}
                    >
                      Edit Details
                    </Button>
                  ) : (
                    <Box>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setQuery5((prev) => !prev);
                          setVariant(prevVariant);
                        }}
                        style={{ textTransform: "none", color: "#416BFF" }}
                      >
                        Cancel
                      </Button>

                      <Button
                        disabled={!saveEnable}
                        variant="contained"
                        style={{
                          textTransform: "none",
                          marginLeft: "10px",
                          background: "#416BFF",
                          color: "#FFFFFF",
                        }}
                        onClick={() => {
                          if (saveEnable === true) {
                            setQuery5((prev) => !prev);
                            setPrevVariant(variant);
                            sendData(5);
                          }
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box style={{ width: "100%" }}>
                {/* {variant && ( */}
                <Box className="adminSettings_details_card_grid">
                  {otherDetails?.map((o) => {
                    return (
                      <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>
                          <RemoteViewTextField
                            card
                            label={o?.label}
                            disabled_y={o.disable ? o.disable : query5}
                            name={o?.key}
                            text={o?.value}
                            type={o?.type ? o?.type : "text"}
                            data={priceTypes.map((o) => {
                              return { id: o?.id, label: o?.display_name };
                            })}
                            onInputChange={onInputChange}
                            onSelectChange={onSelectChange}
                            handleCheckBox={handleCheckBox}
                            sx={{ width: "100%" }}
                          />
                        </RemoteWrapper>
                      </Suspense>
                    );
                  })}
                </Box>
                {/* )} */}
              </Box>
            </Box>
          )}

          {/* 2-Step Login*/}
          {/* <Box className="adminSettings_DetailsView">
                <Box className="adminSettings_DetailsOrderHeader">
                    <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>2-Step Login</h3>

                    <Box className="adminSettings_DetailsOrderHeader_btn">
                        {query ? (
                            <Button
                                variant="contained"

                                onClick={() => {
                                    setQuery((prev) => !prev);
                                    setSaveEnable(false);
                                }}
                                style={{ textTransform: "none", background: "#416BFF" }}
                            >
                                Edit Details
                            </Button>
                        ) : (
                            <Box>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setQuery((prev) => !prev);
                                        setVariant(prevVariant);
                                    }}
                                    style={{ textTransform: "none", color: "#416BFF" }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    disabled={!saveEnable}
                                    variant="contained"
                                    style={{ textTransform: "none", marginLeft: "10px", background: "#416BFF", color: "#FFFFFF" }}
                                    onClick={() => {
                                        if (saveEnable === true) {
                                            setQuery((prev) => !prev);
                                            setPrevVariant(variant);
                                            sendData();
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
                <div style={{ fontSize: "1em" }}>Secure your account with 2-Step Login. You will have to enter your password and OTP each time you log in to your account. (This is for web login only. You'll always need OTP to login on your mobile app.)</div>

                <Box style={{ width: "100%" }}>
                    {variant && (
                    <Box className="adminSettings_details_card_grid">
                        {twoStep.map((o) => {
                            return (
                                <Suspense fallback={<div>Loading... </div>}>
                                    <RemoteWrapper>
                                        <RemoteViewTextField
                                            card
                                            label={o?.label}
                                            //   text={o?.value ? o?.value : "--"}
                                            disabled_y={query}
                                            name={o?.key}
                                            type={"text"}
                                            value={o?.value}
                                            onInputChange={onInputChange}
                                        />
                                    </RemoteWrapper>
                                </Suspense>
                            );
                        })}
                    </Box>
                    
                         )} 
                    
                </Box>
            </Box> */}

          {/* <Box className="adminSettings_DetailsView">
                <Box className="adminSettings_DetailsOrderHeader">
                    <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>Delete Account</h3>
                    <Box className="adminSettings_DetailsOrderHeader_btn">
                        <Button
                            variant="contained"
                            onClick={() => {
                                setQuery((prev) => !prev);
                                setSaveEnable(false);
                            }}
                            style={{ textTransform: "none", background: "#DC0320" }}
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Box>
                <h4 style={{ fontWeight: 500, fontSize: "1.1em" }}>Account can be deleted only when:</h4>
                <ul className="delete_account">
                    <li>There are no actively pending orders (Forward and return) </li>
                    <li>There are no pending settlements</li>
                </ul>



            </Box> */}
          <Box className="adminSettings_DetailsView">
            <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>Notification</h3>
            <Box className="adminSettings_DetailsOrderHeader">
              <FormControl component="fieldset">
                <FormGroup
                  aria-label="position"
                  style={{ alignItems: "flex-start" }}
                >
                  <FormControlLabel
                    style={{ color: "#000" }}
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={checked1}
                        onChange={handleChange}
                        name="k1"
                      />
                    }
                    label={"Get notification reminder on Email"}
                  />
                  <FormControlLabel
                    style={{ color: "#000" }}
                    label={"Get notification reminder on Phone Via SMS"}
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={checked2}
                        onChange={handleChange}
                        name="k2"
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </Box>

          {addAddress && (
            <>
              <ModalViewV2
                modalTitle={"Add Address"}
                handleConfirm={() => {
                  handleClose();
                  addNewAddress();
                }}
                handleModalClose={() => {
                  handleClose();
                }}
                modalOpen={addAddress}
                actionBtns={["Cancel", "Confirm"]}
              >
                <AddForm
                  header={"Location Details"}
                  data={LocationForm.map((field) => {
                    switch (field.key) {
                      case "add_address_state": {
                        field.data = Statedata?.map((o) => {
                          return { label: o?.name, id: o?.id };
                        });
                        return field
                      }
                      case "add_address_country": {
                        field.data = Countrydata?.map((o) => {
                          return { label: o?.name, id: o?.id };
                        });
                        return field
                      }
                      case "add_address_city": {
                        field.data = CitiesData?.map((o) => {
                          return { label: o?.City, id: o?.Code };
                        });
                        return field
                      }


                      case "add_address_location_type": {
                        field.data = locationTypes?.map((o) => {
                          return { label: o?.display_name, id: o?.id };
                        });
                        return field
                      }
                      

                      default:
                        return field;
                    }
                  })}
                  handelInputChange={handelInputChangeLocation}
                  handelSelectonChange={handelInputChangeLocation}
                />
              </ModalViewV2>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AccountDetails;


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