import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
import ErrorBoundary from "../../ErrorBoundary";
import { loadAdminSettingsDataById, loadStateDataById, update_settings } from "../../redux/action";
import MatSelect from "Remote/MatDropDown"
import SingleFileUpload from "Remote/SingleFileUpload"
import "./AccountDetails.css";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const BankDetailsTab = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(true);
  const [saveEnable, setSaveEnable] = useState(false);
  const [variant, setVariant] = useState();
  const [prevVariant, setPrevVariant] = useState();
  const [mainData, setMainData] = useState({});

  const [file, setFile] = useState(null)

  const sendData = () => {
    const payload = {
      bank_details: {
        bank_name: mainData?.bank_name,
        holder_name: mainData?.bank_account_holder_name,
        account_number: mainData?.bank_account_number,
        ifsc_code: mainData?.bank_ifsc_code,
        bank_statement: "bank_statement",
        state: mainData?.bank_state?.label,
        city: mainData?.bank_city,
        penny_transfer_verification: mainData?.bank_penny_verification,
        upi_address: mainData?.bank_upi_address,
        branch_name: mainData?.bank_branch_name,
        canceled_cheque: mainData?.bank_add_canceled_cheque,
      },
    };
    dispatch(update_settings(payload));
    dispatch(loadAdminSettingsDataById());

  };

  const [BankDetails, setBankDetails] = useState();
  useEffect(() => {
    dispatch(loadStateDataById(100));
    dispatch(loadAdminSettingsDataById());

  }, []);

  const { Statedata ,adminSettingsView } = useSelector((state) => state.data);
  useEffect(() => {
    console.log(Statedata, "Statedata");
  }, [Statedata]);

  useEffect(()=>{
    setBankDetails([
      {
        key: "bank_account_number",
        label: "Account Number",
        type: "text",
        value: adminSettingsView?.bank_details?.account_number,
      },
      {
        key: "bank_ifsc_code",
        label: "IFSC Code",
        type: "text",
        value: adminSettingsView?.bank_details?.ifsc_code,
      },
      {
        key: "bank_account_holder_name",
        label: "Account Holder's Name",
        type: "text",
        value: adminSettingsView?.bank_details?.holder_name,
      },
      {
        key: "bank_name",
        label: "Bank Name",
        type: "text",
        value: adminSettingsView?.bank_details?.bank_name,
      },
      {
        key: "bank_state",
        label: "State",
        type: "select",
        value: adminSettingsView?.bank_details?.state,
      },
      {
        key: "bank_city",
        label: "City",
        type: "text",
        value: adminSettingsView?.bank_details?.city,
      },
      {
        key: "bank_add_canceled_cheque",
        label: "Add Canceled cheque",
        type: "single_file_upload",
        value: adminSettingsView?.bank_details?.cancelled_cheque,
      },
      {
        key: "bank_penny_verification",
        label: "Penny Transfer Verification",
        type: "text",
        disable: true,
        value: adminSettingsView?.bank_details?.penny_transfer_verification,
      },
      {
        key: "bank_upi_address",
        label: "UPI Address",
        type: "text",
        value: adminSettingsView?.bank_details?.upi_address,
      },
      {
        key: "bank_branch_name",
        label: "Branch Name",
        type: "text",
        value: adminSettingsView?.bank_details?.branch_name,
      },
    ])
  },[adminSettingsView])

  const handelSelectonChangeDetails = (key, value) => {
    console.log(key, value, "key, value , index")
    if (key.includes("bank_state")) {
      setBankDetails((BankDetails) => { return BankDetails.map((o) => { if (o?.key == key) { o["text"] = value.label } return o }) })
    }
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    console.log(newMainData, "newMainData")
    setSaveEnable(true);

  };

  const handelInputChange = (key, value) => {
    console.log("key", key, "value", value);
    let temp = BankDetails;
    if (key.includes("bank_")) {
      setBankDetails((temp) => { return temp.map((o) => { if (o?.key == key) { o["value"] = value } return o }) })
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    console.log(newMainData, "newMainData")
    setSaveEnable(true);

    // setBankDetails(temp)
    // setMainData(temp);
  };

  const handleFileUpload = (key, value) => {
    console.log("key : ", key, "value : ", value);
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
    console.log(newMainData, "maindata")

  }
  return (
    <>
      {/* Bank Details */}
      <Box className="adminSettings_DetailsView">
        <Box className="adminSettings_DetailsOrderHeader">
          <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>Bank Details</h3>
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

        <Box style={{ width: "100%" }}>
          {/* {variant && ( */}
          <Box className="adminSettings_details_card_grid">
            {BankDetails?.map((o) => {
              return o.type != "single_file_upload" ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={o?.label}
                      text={o?.value ? o?.value : "--"}
                      disabled_y={o.disable ? o.disable : query}
                      name={o?.key}
                      type={o?.type ? o.type : "text"}
                      data={Statedata?.map((o) => { return ({ label: o?.name, id: o?.id }) })}
                      value={o?.type == "select" ? mainData?.bank_state : ""}
                      onInputChange={handelInputChange}
                      onSelectChange={handelSelectonChangeDetails}
                      sx={{ width: "100%" }}

                    />
                  </RemoteWrapper>
                </Suspense>
              ) : o.type == "single_file_upload" ? (<>
              {query ?(
                 <Suspense fallback={<div>Loading... </div>}>
                 <RemoteWrapper>
                   <RemoteViewTextField
                     card
                     label={o?.label}
                     text={o?.value ? o?.value : "--"}
                     name={o?.key}
                     value={o?.value}
                     type={o?.type ? o.type : "text"}
                     disabled_y={true}
                   />
                 </RemoteWrapper>
               </Suspense>
              ):(<>
              <SingleFileUpload
                  required={o?.required}
                  label={o?.label}
                  name={o?.key}
                  value={o?.value}
                  id={o?.id}
                  buttonLabel={o?.buttonLabel}
                  setfileUpload={setFile}  
                />
              </>)}
              </>) : (<></>);
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BankDetailsTab;


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