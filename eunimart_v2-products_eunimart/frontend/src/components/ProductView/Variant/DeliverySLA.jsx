import React, { useEffect } from "react";
// import "../ProductDetailCard/ProductDetailCard.css";
import "./ProductDetailCard/ProductDetailCard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../redux/Action/PostEditApi";
// import { editProductVariant } from "../../../../redux/Action/PostEditApi";
//mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ErrorBoundary from "../../../ErrorBoundary";
import { lazy, Suspense } from "react";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
// import ErrorBoundary from "../../../../ErrorBoundary";
// import { searchDeliveryTime } from "../../../../redux/Action/GetDeliveryTimeAction";
import { searchDeliveryTime } from "../../../redux/Action/GetDeliveryTimeAction";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const DeliverSLA = ({ fields, edit, parentBrand, access }) => {
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState([]);
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [fieldKey, setFieldKey] = useState();
  const [saveEnable, setSaveEnable] = useState(false);
  //redux

  const productType = useSelector(
    state => state.fetchAddProductDetails.stdProductType.StdProductType
  );
  const [productTypeData, setProductTypeData] = useState([]);

  const condition = useSelector(
    state => state.fetchAddProductDetails.condition.Condition
  );
  const [conditionData, setConditionData] = useState([]);
  let editResponse = useSelector(
    state => state.editResponse.editResponse.EditResponse
  );
  useEffect(() => {
    dispatch(searchDeliveryTime());
  }, []);
  const deliverytime = useSelector(
    state => state.searchDeliveryTime.DeliveryTimeData
  );
  const [timeToShipData, setTimeToShipData] = useState([]);
  useEffect(() => {
    if (deliverytime) {
      let temp = [];
      temp = deliverytime.map(item => {
        return {
          label: item.display_name,
          value: item.id,
        };
      });
      setTimeToShipData(temp);
    }
  }, [deliverytime]);

  useEffect(() => {
    if (
      editResponse &&
      !editResponse.status &&
      editResponse.message ===
        "Available quantity should be set to zero before changing type"
    ) {
      const tempValue = {
        ...variant,
        detailed_type: prevVariant.detailed_type,
      };
      setVariant(tempValue);
      const temp1Value = {
        ...finalVariant,
        detailed_type: prevVariant.detailed_type,
      };
      setFinalVariant(temp1Value);
      console.log("editresponseee");
    }
  }, [editResponse]);

  useEffect(() => {
    setVariant(fields ? fields : []);
    setPrevVariant(fields ? fields : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  const onInputChange = (prop, value) => {
    const newVariant = { ...variant.product_critical_details };
    const newFinalVariant = { ...finalVariant };

    if (prop === "unit_per_box") {
      newVariant[prop] = Number(value);
      newFinalVariant["product_critical_details"] = { [prop]: Number(value) };
    } else {
      newVariant[prop] = value;
      newFinalVariant["product_critical_details"] = { [prop]: value };
    }

    setVariant(varb => {
      return { ...varb, product_critical_details: newVariant };
    });

    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
  };

  const onSelectionChanges = (prop, value) => {

    // const newVariant = { ...variant };
    // const newFinalVariant = { ...finalVariant };
    // if (type === "time_to_ship_id") {
    //   newVariant[type] = { id: id, value: label };
    //   newFinalVariant["product_critical_details"] = {
    //     [type]: id,
    //   };
    // }
    // setVariant(newVariant)

    // setFinalVariant(newFinalVariant);
    // setSaveEnable(true);
    // console.log("vriantdata", finalVariant);
    const temp = { ...variant };
    console.log(temp, "temp");
    if (prop === "time_to_ship_id") {
      temp["product_critical_details"].time_to_ship.display_name = value.label;
      temp["product_critical_details"].time_to_ship.id = value.value;
    }

    const newFinalVariant = { ...finalVariant };
    setVariant(temp);
    newFinalVariant["product_critical_details"] = {...newFinalVariant["time_to_ship_id"],[prop]: value?.value};
    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
  };

  const sendData = () => {
    if (fields["id"]) {
      dispatch(editProductVariant(finalVariant, fields["id"]));
    }
  };

  useEffect(() => {
    if (productType && productType.data) {
      const temp = productType.data.map(item => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setProductTypeData(temp);
    }
  }, [productType]);
  console.log("timetoship", timeToShipData, variant);
  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Product Critical Details</p>
        {access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")
          ?.ctrl_flag && (
          <Box className="companyDetailsOrderHeader_btn">
            {query ? (
              <Button
                variant="contained"
                onClick={() => {
                  setQuery(prev => !prev);
                  setSaveEnable(false);
                }}
                style={{ textTransform: "none" }}
              >
                Edit Details
              </Button>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setQuery(prev => !prev);
                    setVariant(prevVariant);
                  }}
                  style={{ textTransform: "none" }}
                >
                  Cancel
                </Button>

                <Button
                  disabled={!saveEnable}
                  variant="contained"
                  style={{ textTransform: "none", marginLeft: "10px" }}
                  onClick={() => {
                    if (saveEnable === true) {
                      setQuery(prev => !prev);
                      setPrevVariant(variant);
                      sendData(variant);
                    }
                  }}
                >
                  Save Details
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
      {variant && (
        <>
          <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Units in the box"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.product_critical_details
                        ? variant?.product_critical_details?.unit_per_box
                          ? variant?.product_critical_details?.unit_per_box
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="unit_per_box"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>

                {query ? (
                    <RemoteViewTextField
                      card
                      label={"Time to Ship"}
                     text={
                      variant?.product_critical_details
                        ? variant?.product_critical_details?.time_to_ship
                          ? variant?.product_critical_details?.time_to_ship?.display_name
                          : "--"
                        : "--"
                    }
                      disabled_y={query}
                      name="time_to_ship_id"
                    />
                  ) : (
                    <RemoteSelect
                      card
                      label={"Time to Ship"}
                      data={timeToShipData}
                      // onChange={(e, value) =>
                      //   onSelelectionChange("time_to_ship", value)
                      // }
                    
                      onChange={(e, value) => {
                        onSelectionChanges(
                          "time_to_ship_id", value
                        );
                      }}
                      value={
                        variant?.product_critical_details
                          ? variant?.product_critical_details?.time_to_ship
                            ? variant?.product_critical_details?.time_to_ship?.display_name
                            : "--"
                          : "--"
                      }
                      disabled_y={query}
                      errorMessage={""}
                    />
                  )}
                  {/* {query ? (
                    <RemoteViewTextField
                      card
                      label={"Time to Ship"}
                      // text={variant && variant?.category_code}
                      text={
                        variant &&
                        variant["time_to_ship_id"] &&
                        variant["time_to_ship_id"]?.value
                      }
                      disabled_y={query}
                      name="time_to_ship_id"
                    />
                  ) : (
                    <RemoteSelect
                      card
                      label={"Time to Ship"}
                      data={timeToShipData}
                      onChange={(e, value) => {
                        onSelectionChanges(
                          "time_to_ship_id",
                          value.value,
                          value.label
                        );
                      }}
                      value={variant["time_to_ship_id"]?.value}
                      disabled_y={query}
                      errorMessage={""}
                    />
                  )} */}
                </RemoteWrapper>
              </Suspense>
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Customer Care Number"}
                    // text={variant && variant?.fulfillment_identifier}
                    text={
                      variant?.product_critical_details
                        ? variant?.product_critical_details
                            ?.customer_care_number
                          ? variant?.product_critical_details
                              ?.customer_care_number
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="customer_care_number"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
  // }
};

export default DeliverSLA;

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
