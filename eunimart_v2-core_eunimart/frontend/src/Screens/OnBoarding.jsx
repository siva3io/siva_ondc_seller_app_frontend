import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSTDCodes,
  loadcompanyTypeData,
  savekycDetails,
  saveondckycDetails,
  loadUserTypeData,
  checkAadharValidation,
  loadLocationstypeData,
  loadContactPropertiesData,
  sendSelectedType,
  load_dashboard_type,
  createNewLocation,
} from "../redux/action";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typography, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./OnBoarding.css";
import Index from "../Components/onBoarding/Index";
import UserSide from "../Components/onBoarding/UserSide";
import ApplicationSide from "../Components/onBoarding/ApplicationSide";
import { useHistory } from "react-router-dom";

export default function Ondc() {
  const history = useHistory();
  let dispatch = useDispatch();
  const {
    stdCodesData,
    companyTypeData,
    tokenData,
    tokenOndcData,
    userTypeData,
    locationTypes,
    contactPropertiesData,
  } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadSTDCodes());
    dispatch(loadcompanyTypeData());
    dispatch(loadUserTypeData());
    dispatch(loadLocationstypeData());
    dispatch(loadContactPropertiesData());
  }, []);
  const [ondcCon1, setOndcCon1] = useState(0);
  const [ondcCon2, setOndcCon2] = useState(0);

  const [UserSelected, SetUserSelected] = useState(true);
  const [ApplicationSelected, SetApplicationSelected] = useState(true);

  const [userSideFormSelected, SetuserSideFormSelected] = useState(false);

  const [isFormSelected, setisFormSelected] = useState(false);

  const [moveToApplication, setmoveToApplication] = useState(false);

  const [SerViceArea, setSerViceArea] = useState(null);

  const [otherdetails, setotherdetails] = useState([
    {
      label: "GST Number",
      type: "input",
      key: "gst_number",
      uploadbutton: "true",
      errorMessage: "Enter valid GST Number",
      minLength: 3,
      maxLength: 15,
      regex: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
      acceptType: "image/*,application/pdf",
    },
    JSON.parse(localStorage.getItem("user_data"))?.email?.length>0 ?
    {
      label: "Phone Number",
      type: "input",
      key: "mobile_number",
      regex:/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
      errorMessage: "Enter valid phone Number",
      minLength: 10,
      // maxLength: 14,
      maxLength: 10,
    } : {
      label: "Email ID",
      type: "input",
      key: "email",
      regex: /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9.]+\.)+[a-zA-Z]+$/,
      errorMessage: "Enter valid Email ID",
      minLength: 6,
      // maxLength: 14,
      maxLength: 40,
    },
    {
      label: "Business Name",
      type: "input",
      key: "business_name",
    },
    {
      label: "PAN Number",
      type: "input",
      key: "pan_number",
      uploadbutton: "true",
      regex: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
      errorMessage: "Enter valid PAN ",
      minLength: 10,
      maxLength: 10,
      acceptType: "image/*,application/pdf",
    },
    {
      label: "Name of the Authorised Signatory",
      type: "input",
      key: "authorised_signatory",
    },
    {
      label: "STD Code of your locality",
      type: "select",
      key: "std_code",
    },
    {
      label: "Address of Authorised Signatory",
      type: "input",
      key: "authorised_signatory_address",
    },
    {
      label: "Business Address",
      type: "input",
      key: "business_address",
      rows: 5,
    },
    {
      label: "Aadhar Number Verification",
      type: "input",
      key: "aadhar_number",
      validatebutton: "true",
      textfieldBottomText: "Please enter 12 digit aadhar",
    },
  ]);

  const [buyerSideForm, setbuyerSideForm] = useState([
    {
      label: "Name",
      type: "input",
      key: "1",
    },
    {
      label: "Email ID/Phone Number",
      type: "input",
      key: "2",
    },
    {
      label: "STD Code of your locality",
      type: "select",
      key: "3",
    },
    {
      label: "Address",
      type: "textarea",
      key: "4",
      rows: 5,
    },
    {
      label: "Aadhar Number Verification",
      type: "input",
      key: "5",
    },
  ]);

  const [sellerSideForm, setsellerSideForm] = useState([
    {
      label: "GST Number",
      type: "input",
      key: "gst_number",
      uploadbutton: "true",
    },
    {
      label: "Email ID/Phone Number",
      type: "input",
      key: "email",
    },
    {
      label: "Business Name / Company Name",
      type: "input",
      key: "business_name",
    },
    {
      label: "PAN Number",
      type: "input",
      key: "pan_number",
      uploadbutton: "true",
    },
    {
      label: "STD Code of your locality",
      type: "select",
      key: "std_code",
    },
    {
      label: "Business Address",
      type: "input",
      key: "business_address",
      // rows: 5,
    },
    {
      label: "Aadhar Number Verification",
      type: "input",
      key: "aadhar_number",
      validatebutton: "true",
      textfieldBottomText: "Please enter 12 digit aadhar",
    },
  ]);

  const [mainData, setMainData] = useState({});
  const [gstDoc, setgstDoc] = useState("");
  const [panDoc, setpanDoc] = useState("");

  const [isValidated, setisValidated] = useState(false);

  const [contactInformation, setContactInformation] = useState(true);
  const [locationInformation, setLocationInformation] = useState(true);

  const formValidation = () => {
    // let gstRegTest =
    //   /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(
    //     mainData?.gst_number
    //   );
    if (
      mainData?.gst_number != null &&
      mainData?.gst_number.length == 15 &&
      mainData?.email != null &&
      mainData?.email.length >= 3 &&
      mainData?.business_name != null &&
      mainData?.business_name.length >= 3 &&
      mainData?.pan_number != null &&
      mainData?.pan_number.length >= 3 &&
      mainData?.std_code != null &&
      mainData?.business_address.length >= 3 &&
      mainData?.aadhar_number != null &&
      mainData?.aadhar_number.length >= 3
    ) {
      setisValidated(true);
      console.log("isValidated", isValidated);
    } else {
      console.log("isValidated", isValidated);
      setisValidated(false);
    }

    console.log("mainData", mainData)

    if (mainData?.phone_number &&
      mainData?.website &&
      mainData?.email &&
      mainData?.business_name &&
      mainData?.category?.id) {
      setContactInformation(false)
    }

    if (mainData?.street_address &&
      mainData?.street_address_line_2 &&
      mainData?.city &&
      mainData?.pincode &&
      mainData?.state?.id && mainData?.range) {
      setLocationInformation(false)
    }
  };

  const handelInputChange = (key, value) => {
    console.log("key", key, "value", value);
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
    formValidation();
  };

  const handleButtonClick = (key,ondc) => {
    // console.log(
    //   "temppppppppppppppppppppp",
    //   contactPropertiesData.filter((o) => o.lookup_code == "APPLICATION")
    // );
    if (key == "applicationSelected") {
      let temp = {
        user_types: [
          {
            id: contactPropertiesData.filter(
              (o) => o.lookup_code == "APPLICATION"
            )[0]?.id,
            name: contactPropertiesData.filter(
              (o) => o.lookup_code == "APPLICATION"
            )[0]?.display_name,
          },
        ],
        role_id: 1,
        access_ids: [11],
      };
      dispatch(sendSelectedType(temp));
    } else if (key == "buyerSelected") {
      console.log("283")
      let temp = {
        user_types: [
          {
            id: contactPropertiesData.filter((o) => o.lookup_code == "BUYER")[0]
              ?.id,
            name: contactPropertiesData.filter(
              (o) => o.lookup_code == "BUYER"
            )[0]?.display_name,
          },
        ],
        role_id: 1,
      };
      dispatch(sendSelectedType(temp));
      history.push("/storeFront");
    } else if (key == "sellerSelected") {
      let temp = {
        user_types: [
          {
            id: contactPropertiesData.filter(
              (o) => o.lookup_code == "SELLER"
            )[0]?.id,
            name: contactPropertiesData.filter(
              (o) => o.lookup_code == "SELLER"
            )[0]?.display_name,
          },
        ],
        role_id: 1,
        // access_ids: [2],
      };
      dispatch(sendSelectedType(temp));
    } else {
      mainData["gstin"] = gstDoc;
      mainData["pan"] = panDoc;
      mainData["type"] = key;
      console.log("handleButtonClickmainData", mainData);
      // var payload = {
      //   kyc_documents: [
      //     {
      //       aadhar_number: mainData?.aadhar_number,
      //       gst_number: mainData?.gst_number,
      //       pan_number: mainData?.pan_number,
      //       country_id: 1,
      //       documents: {
      //         gstin: mainData?.gstin,
      //         pan: mainData?.pan,
      //       },
      //     },
      //   ],
      //   type: mainData?.type,
      //   std_code_id: mainData?.std_code?.id,
      //   email: mainData?.email,
      //   phone: mainData?.email,
      //   authorised_signatory: mainData?.authorised_signatory,
      //   authorised_signatory_address: mainData?.authorised_signatory_address,
      //   business_name: mainData?.business_name,
      //   business_address: mainData?.business_address,
      // };
      
      var payload = {
        type: mainData?.type,
        company_details:{
          authorised_signatory: mainData?.authorised_signatory,
        authorised_signatory_address: mainData?.authorised_signatory_address,
        business_name: mainData?.business_name,
        business_address: mainData?.business_address,
        std_code_id: mainData?.std_code?.id,
        domain_id: mainData?.category?.id,
        email: mainData.email,
        mobile_number:mainData?.mobile_number,
        kyc_documents: [
            {
              gstin: mainData?.gstin,
              pan: mainData?.pan,
            },
        ],
        }        
      };
      console.log("handleButtonCLickPayload", payload);


      if(ondc)
      {
        dispatch(saveondckycDetails(payload))
      }else{
        dispatch(savekycDetails( payload));
      }
    }
  };

  const checkValidation = (callback) => {
    let id = {
      aadhar_number: mainData?.aadhar_number,
    };
    dispatch(
      checkAadharValidation(id, function (resp) {
        callback(resp);
      })
    );
  };

  const updateCompany = () => {
    console.log("mainData while Company Update", mainData);
    const payload = {
      company_details: {
        store_name: mainData?.business_name,
        store_description: mainData?.description,
        domain_id: mainData?.category?.id,
      },
      email: mainData?.email,
      website: mainData?.website,
      phone: mainData?.phone_number,
      type: 630,
    };
    console.log(payload, "payload for Update Company");
    dispatch(savekycDetails(payload));
  };
  const updateStoreTimings = (key) => {
    console.log("Update Store Timings ->", mainData);
    const payload = {
      company_details: {
        store_timings:
          key == 1
            ? mainData?.openingTimings?.map((day) => {
              return {
                day: day.label,
                is_open: day?.isClosed,
                time: day?.value?.map((time) => {
                  return {
                    opening_time: time[0].value,
                    closing_time: time[1].value,
                  };
                }),
              };
            })
            : {
              day: "",
              is_open: true,
              time: [
                {
                  opening_time: mainData?.openingTimings[0].value,
                  closing_time: mainData?.openingTimings[1].value,
                },
              ],
            },
      },
    };
    console.log("Update Timings Payload ->", payload);
    dispatch(savekycDetails(payload));
  };
  const updateSellerApps = () => {
    console.log("Updated Seller Apps -> ", mainData);
    const payload = {
      company_details: {
        seller_apps: mainData.sellerApps,
      },
    };
    
    
    const payload1={
      access_ids: [mainData?.sellerApps?.find(o=>o=="Eunimart BPP")?.length > 0 ? 2 : 16]
    }
    console.log(payload1, "payload1");
    dispatch(savekycDetails(payload));
    dispatch(sendSelectedType(payload1))
  };

  const createCompanyLocation = () => {
    console.log("mainData ->", mainData);
    console.log("temp", SerViceArea);
    const payload = {
      location_type_id: locationTypes?.find((o) => (o.lookup_code == "OFFICE")).id,
      company_id: JSON.parse(localStorage.getItem("user_data"))?.company_id,
      address: {
        address_line_1: mainData?.street_address,
        address_line_2: mainData?.street_address_line_2,
        land_mark: "Near Railway Station",
        pin_code: mainData?.pincode,
        city:mainData?.city,
        state: {
          id: mainData?.state?.id,
          name: mainData?.state?.label,
        },
        country: {
          id: 1,
          name: "INDIA",
        },
      },
      latitude: SerViceArea != null && SerViceArea[0]?.lat,
      longitude: SerViceArea != null && SerViceArea[0]?.lng,
      serviceable_area_ids: [
        {
          latitude: SerViceArea != null && SerViceArea[0]?.lat,
          longitude: SerViceArea != null && SerViceArea[0]?.lng,
          city: "",
          radius: mainData?.range ? parseInt(mainData?.range) : 10,
        },
      ],
    };

    var servicePayload = {
      company_details:{

        serviceable_areas: [
          {
            latitude: SerViceArea != null && SerViceArea[0]?.lat,
            longitude: SerViceArea != null && SerViceArea[0]?.lng,
            city: "",
            radius: mainData?.range ? parseInt(mainData?.range) : 10,
          },
        ],
      }
    }

    console.log("payload", payload);
    dispatch(createNewLocation(payload));
    dispatch(savekycDetails( payload));
    dispatch(savekycDetails(servicePayload))
  };

  const submitData = () => {
    const payload = {
      company_details: {
        authorised_signatory: "Rupa Kodali",
        authorised_signatory_address: "authorised_signatory_address",
        business_address: "business_address",
        business_name: "rupa-business_name",
        store_name: "store_name",
        store_description: "store_description",
        std_code_id: 632,
        domain_id: 665,
        store_timings: [
          {
            day: "Monday",
            is_open: true,
            time: [
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
            ],
          },
          {
            time: [
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
            ],
            is_open: true,
            day: "Tuesday",
          },
          {
            time: [
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
            ],
            is_open: true,
            day: "Wednesday",
          },
          {
            time: [
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
              {
                opening_time: "0001-01-01T00:00:00Z",
                closing_time: "0001-01-01T00:00:00Z",
              },
            ],
            is_open: true,
            day: "Thursday",
          },
        ],
        servicable_areas: [
          {
            name: "Salem",
            latitude: 11.280292,
            longitude: 22.379383,
            radius: 10,
          },
          {
            name: "Hyderabad",
            latitude: 11.280292,
            longitude: 22.379383,
            radius: 10,
          },
        ],
      },
      email: "rupa.kodali@eunimart.com",
      website: "www.eunimart.com",
      phone: "7675914863",
      addresses: [
        {
          address_line_1: "Sanali Spazio",
          address_line_2: "Madhapur",
          address_line_3: "Hyderabad",
          land_mark: "Near Inorbit Mall",
          pin_code: "500081",
          state: {
            id: 2,
            name: "Telangana",
          },
          country: {
            id: 1,
            name: "INDIA",
          },
          latitude: 11.280292,
          longitude: 22.379383,
        },
      ],
      type: 630,
      business_type_id: 602,
    };
  };

  return (
    <>
      {!moveToApplication && (
        <div className="ondc_root">
          <div
            className={
              ondcCon1 == 0
                ? "ondc_con1 ondc_con"
                : ondcCon1 == 1
                  ? "ondc_con1_expanded"
                  : "ondc_con1_closed"
            }
            style={isFormSelected ? { backgroundColor: "white" } : {}}
          >
            {/* <img
              src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
              style={{
                height: "50px",
                width: "100px",
                position: "absolute",
                marginLeft: "40px",
                marginTop: "30px",
                scale: "1.5",
              }}
              alt="siva"
            /> */}

            <ApplicationSide
              // buyerSideForm={buyerSideForm}
              userTypeData={userTypeData}
              sellerSideForm={sellerSideForm}
              ApplicationSelected={ApplicationSelected}
              setOndcCon2={setOndcCon2}
              setOndcCon1={setOndcCon1}
              SetUserSelected={SetUserSelected}
              isFormSelected={isFormSelected}
              setisFormSelected={setisFormSelected}
              SetuserSideFormSelected={SetuserSideFormSelected}
              userSideFormSelected={userSideFormSelected}
              moveToApplication={moveToApplication}
              setmoveToApplication={setmoveToApplication}
              stdCodesData={stdCodesData}
              companyTypeData={companyTypeData}
              handleButtonClick={handleButtonClick}
              handelInputChange={handelInputChange}
              setgstDoc={setgstDoc}
              setpanDoc={setpanDoc}
              isValidated={isValidated}
              tokenOndcData={tokenOndcData}
              checkValidation={checkValidation}
              mainData={mainData}
              setMainData={setMainData}
              updateCompany={updateCompany}
              updateStoreTimings={updateStoreTimings}
              updateSellerApps={updateSellerApps}
              createCompanyLocation={createCompanyLocation}
              setSerViceArea={setSerViceArea}
              contactInformation={contactInformation}
              locationInformation={locationInformation}
            />
          </div>
          <div
            className={
              ondcCon2 == 0
                ? "ondc_con2 ondc_con"
                : ondcCon2 == 1
                  ? "ondc_con2_expanded"
                  : "ondc_con2_closed"
            }
          >
            {!isFormSelected && (
              <UserSide
                UserSelected={UserSelected}
                otherdetails={otherdetails}
                stdCodesData={stdCodesData}
                setOndcCon2={setOndcCon2}
                setOndcCon1={setOndcCon1}
                SetApplicationSelected={SetApplicationSelected}
                setisFormSelected={setisFormSelected}
                handelInputChange={handelInputChange}
                handleButtonClick={handleButtonClick}
                setgstDoc={setgstDoc}
                setpanDoc={setpanDoc}
                checkValidation={checkValidation}
              />
            )}

            {isFormSelected && <div className="sideImage"></div>}
          </div>
        </div>
      )}
      {moveToApplication && <Index />}
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