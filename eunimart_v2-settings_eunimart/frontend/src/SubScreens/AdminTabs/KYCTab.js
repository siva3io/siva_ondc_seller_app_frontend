import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AddForm from "Remote/AddForm"
import { Button } from "@mui/material";
import ErrorBoundary from "../../ErrorBoundary";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
import { loadAdminSettingsDataById, loadStateDataById, update_settings } from "../../redux/action";
import { Box } from "@mui/system";
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
const KYCTab = ({ user_data }) => {
    const [mainData, setMainData] = useState({});
    const [fileUpload, setfileUpload] = useState({});
    const [query, setQuery] = useState(true);
    const [saveEnable, setSaveEnable] = useState(false);
    const [variant, setVariant] = useState();
    const [prevVariant, setPrevVariant] = useState();
    const [KYCDocDetails, setKYCDocDetails] = useState([]);

    useEffect(() => { console.log("mainData", mainData) }, [mainData])

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStateDataById(1));
        dispatch(loadAdminSettingsDataById())
    }, [])

    const { Statedata,adminSettingsView } = useSelector(
        (state) => state.data
    );

    useEffect(()=>{
        
        console.log(adminSettingsView)

        setKYCDocDetails([
        {
            label: "Aadhar Card",
            type: "file_upload",
            key: "aadhar_card",
            buttonLabel: "Upload",
            value: adminSettingsView?.KYC_documents?.aadhar_card
        },
        {
            label: "GSTIN",
            type: "file_upload",
            key: "gst",
            buttonLabel: "Upload",
            value: adminSettingsView?.KYC_documents?.gst

        },
        {
            label: "Passport",
            type: "file_upload",
            key: "passport",
            buttonLabel: "Upload",
            value: adminSettingsView?.KYC_documents?.passport

        },
        {
            label: "Pan Card",
            type: "file_upload",
            key: "pan_card",
            buttonLabel: "Upload",
            value: adminSettingsView?.KYC_documents?.pan

        },
        {
            label: "IEC",
            type: "file_upload",
            key: "iec",
            buttonLabel: "Upload",
            value: adminSettingsView?.KYC_documents?.iec

        },
        {
            label: "Voter ID",
            type: "file_upload",
            key: "voter_id",
            buttonLabel: "Upload",
            value: adminSettingsView?.KYC_documents?.voter_id

        },

    ])},[adminSettingsView])



    const handelSelectonChangeDetails = (key, value) => {
        console.log("key, value", key, value);

        var newMainData = mainData;
        newMainData[key] = value;
        setMainData(newMainData);
    };

    const handelInputChange = (key, value) => {
        var newMainData = mainData;
        newMainData[key] = value;
        setMainData(newMainData);
        console.log(newMainData, "maindata")
    }

    const handleFileUpload = (key, value) => {
        console.log("key : ", key, "value : ", value);
        var newMainData = mainData;
        newMainData[key] = value;
        setMainData(newMainData);
        console.log(newMainData, "maindata")

    }
    const handleUpdate = () => {
        console.log(mainData, "mainData")

        var payload = {
            kyc_documents: mainData,
        }
        dispatch(update_settings(payload))
        dispatch(loadAdminSettingsDataById())
        dispatch(loadAdminSettingsDataById())

    }


    return (
        <>
        {
            adminSettingsView && 
        
            <Box style={{ background: "#fff", display: "flex", flexDirection: "column", padding: "2%" }}>


                <Box className="adminSettings_DetailsOrderHeader">
                    <h3 style={{ fontWeight: 500, fontSize: "1.3em" }}>KYC Documents</h3>
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
                                    // disabled={!saveEnable}
                                    variant="contained"
                                    style={{
                                        textTransform: "none",
                                        marginLeft: "10px",
                                        background: "#416BFF",
                                        color: "#FFFFFF",
                                    }}
                                    onClick={() => {
                                            setQuery((prev) => !prev);
                                            setPrevVariant(variant);
                                            handleUpdate()
                                            
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>


                {query ? (
                    <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>

                            <div style={{display:"flex",flexWrap:"wrap"}}>

                            {
                                KYCDocDetails?.map((o)=>{

                                  return  <RemoteViewTextField
                                card
                                label={o?.label}
                                text={o?.value ? o?.value : "--"}
                                name={o?.key}
                                type={o?.type ? o.type : "text"}
                                value={o?.type == "select" ? mainData?.bank_state : ""}
                                onInputChange={handelInputChange}
                                onSelectChange={handelSelectonChangeDetails}
                                setfileUpload={setfileUpload}
                                handleFileUpload={handleFileUpload}
                                sx={{ width: "50%" }}
                                isDownload={true}

                            />
                                })
                            }
                            </div>

                            
                        </RemoteWrapper>
                    </Suspense>
                ) : (
                    <>
                        {/* <AddForm
                            // header={"KYC Documents"}
                            data={KYCDocDetails}
                            handelSelectonChange={handelSelectonChangeDetails}
                            handelInputChange={handelInputChange}
                            setfileUpload={setfileUpload}
                            handleFileUpload={handleFileUpload}

                        /> */}

<div style={{display:"flex",flexWrap:"wrap"}}>
                        
{
                                KYCDocDetails?.map((o)=>{

                                  return  <RemoteViewTextField
                                card
                                label={o?.label}
                                text={o?.value ? o?.value : "--"}
                                disabled_y={o.disable ? o.disable : query}
                                name={o?.key}
                                type={o?.type ? o.type : "text"}
                                value={o?.type == "select" ? mainData?.bank_state : ""}
                                onInputChange={handelInputChange}
                                onSelectChange={handelSelectonChangeDetails}
                                setfileUpload={setfileUpload}
                                handleFileUpload={handleFileUpload}
                                sx={{ width: "50%" }}

                            />
                                })
                            }
                            </div>

                    </>)
                }


            </Box>
}
        </>
    );
}

export default KYCTab;

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