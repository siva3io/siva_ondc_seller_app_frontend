import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadAdminSettingsDataById, loadDeliveryPreferencesDataById, loadDeliveryTypeDataById, loadFulfillmentTypeDataById, update_settings } from "../../redux/action";
import { Box, Button } from "@mui/material";
import LocalForm from "../../Components/LocalForm";
import "./style.css"

const ShippingTab = ({ user_data }) => {

    console.log("user_data", user_data)
    const [mainData, setMainData] = useState([]);
    useEffect(() => { console.log("mainData", mainData) }, [mainData])
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDeliveryTypeDataById());
        dispatch(loadDeliveryPreferencesDataById());
        dispatch(loadFulfillmentTypeDataById());
        dispatch(loadAdminSettingsDataById());

    }, [])
    const [query, setQuery] = useState(true);
    const [saveEnable, setSaveEnable] = useState(false);
    const [variant, setVariant] = useState();
    const [prevVariant, setPrevVariant] = useState();

    const { deliveryPreferenceList, deliveryTypeList, fulfillmentTypeList } = useSelector(
        (state) => state.data
    );
    console.log(deliveryTypeList, "deliveryTypeListdeliveryTypeList")


    const [load,setLoad] = useState(false)
    //--------------------------------------------------------

    useEffect(() => {

        if (user_data) {
            console.log("useruserdata", user_data);
            var newMainData = [];

            var newShippingDetails = ShippingDetails
                .map(o => {
                    if (o.key == "fulfillment_type") o.value = user_data?.shipping_preference?.id;
                    if (o.key == "delivery_type") o.value = user_data?.delivery_type?.display_name;
                    if (o.key == "preferences") o.value = user_data?.delivery_preferences?.display_name;
                    return o;
                })
            setShippingDetails(newShippingDetails);

            newMainData = [
                ...newShippingDetails,
            ]
    handelRadionButtononChange("fulfillment_type", user_data?.shipping_preference?.id)
        
    setLoad(o=> {return true})
        }


    }, [])
    
    //-----------------------------------------------------------


    const [ShippingDetails, setShippingDetails] = useState([


        {
            label: "Fulfillment Type",
            type: "radio",
            key: "fulfillment_type",
            required: true,
            // value: ,
            sub: [],
        },
        {
            label: "Delivery Type",
            type: "select",
            key: "delivery_type",
            data: [],
            defaultVal: {},
        },
        {
            label: "Preferences",
            type: "select",
            key: "preferences",
            data: [],
            defaultVal: {},
        },
    ]);

    const handelSelectonChangeDetails = (key, value, index) => {
        console.log(key, value, index, "key, value , index")


        var temp = ShippingDetails;
        if (key == "delivery_type") {
            temp[1]["defaultVal"] = value
            temp[1]["value"] = value.label
            setMainData(o => { return { ...mainData, delivery_type: value.id } })
        }
        else if (key == "preferences") {
            temp[2]["defaultVal"] = value
            temp[2]["value"] = value.label
            setMainData(o => { return { ...mainData, preferences: value.id } })
        }
        setShippingDetails(o => { return temp })

        console.log("temp", temp)


    };


    const handelRadionButtononChange = (key, value, index) => {
        console.log(key, value, index)
        console.log(key, value, index, "key, value , index")

        const temp=ShippingDetails
        temp[0].value=value
        setShippingDetails(o=> {return temp })
        setMainData(o => { return { ...mainData, fulfillment_type: parseInt(value) } })

    }



    const handleUpdate = () => {
        console.log(mainData, "mainData")

        var payload = {
            shipping_preference_id: mainData?.fulfillment_type,
            delivery_type_id: mainData?.delivery_type,
            delivery_preferences_id: mainData?.preferences,
        }

        dispatch(update_settings(payload))
        console.log("updated", payload)
    }



    return (
        <>

            <Box style={{ width: "100vw", background: "#f5f5f5", minHeight: "100vh", display: "flex", justifyContent: "center" }} >


                {
                    user_data && load &&

                    <Box style={{ width: "97vw", background: "#fff", borderRadius: "15px", padding: "10px", display: "flex", alignItems: "center", flexDirection: "column" }} >

                        <Box className="adminSettings_DetailsOrderHeader_btn" style={{ width: "100%" }} >
                            <div style={{ width: "100%", margin: "2vh 0" }}>
                                <div className="SAD_title" style={{ fontSize: "19px" }}>Shipping</div>

                            </div>
                            {/* {query ? (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setQuery((prev) => !prev);
                                    setSaveEnable(false);
                                }}
                                style={{ textTransform: "none", background: "#416BFF",width:"150px" }}
                            >
                                Edit Details
                            </Button>
                        ) : (
                            <Box style={{display:"flex"}}>
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
                                            sendData(3);
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        )} */}
                        </Box>
                        {/* <div style={{ width: "100%", margin: "2vh 0" }}>
                        <div className="SAD_title" style={{ fontSize: "19px" }}>Shipping</div>

                    </div> */}

                        <div style={{ display: "flex", flexDirection: "column", gap: "1vh",width:"100%" }}>

                            <LocalForm
                                data={ShippingDetails.map((field) => {
                                    switch (field.key) {
                                        case "delivery_type":
                                            field.data = deliveryTypeList.map((o) => {
                                                console.log("o", o)
                                                return { id: o?.id, label: o?.display_name };
                                            });
                                            break;
                                        case "preferences":
                                            field.data = deliveryPreferenceList.map((o) => {
                                                return { id: o?.id, label: o?.display_name };
                                            });
                                            break;
                                        case "fulfillment_type":
                                            field.sub = fulfillmentTypeList.map((o) => {
                                                return { value: o?.id, label: o?.display_name };
                                            });
                                            break;
                                    }
                                    return field;
                                })}
                                handelSelectonChange={handelSelectonChangeDetails}
                                handelRadionButtononChange={handelRadionButtononChange}
                                flexDirection={"column"}

                            />

                            <Button
                                variant="contained"
                                onClick={handleUpdate}
                                style={{ textTransform: "none", background: "#416BFF", width: "180px", alignSelf: "flex-end" }}
                            >
                                Update Details
                            </Button>

                        </div>

                    </Box>
                }
            </Box>

        </>
    );
}

export default ShippingTab;

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