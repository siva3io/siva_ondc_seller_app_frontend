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
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ManufacturerDetailsCard = ({ fields, edit, parentBrand, access }) => {
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState({});
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [fieldKey, setFieldKey] = useState();
  const [saveEnable, setSaveEnable] = useState(false);
  //redux

  const productType = useSelector(
    (state) => state.fetchAddProductDetails.stdProductType.StdProductType
  );
  const [productTypeData, setProductTypeData] = useState([]);

  const condition = useSelector(
    (state) => state.fetchAddProductDetails.condition.Condition
  );
  const [conditionData, setConditionData] = useState([]);
  let editResponse = useSelector(
    (state) => state.editResponse.editResponse.EditResponse
  );

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
    console.log(prop, value);
    const newVariant = { ...variant.manufacturer_details };
    const newFinalVariant = { ...finalVariant };

    if (prop == "net_quantity") {
      newVariant[prop] = Number(value);
      newFinalVariant["manufacturer_details"] = {...newFinalVariant["manufacturer_details"],[prop]:Number(value) };
    } else {
      newVariant[prop] = value;
      newFinalVariant["manufacturer_details"] = {...newFinalVariant["manufacturer_details"],[prop]:value };
    }

    console.log(newVariant, "newVariant");

    setVariant((varb) => {
      return { ...varb, manufacturer_details: newVariant };
    });
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
      const temp = productType.data.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setProductTypeData(temp);
    }
  }, [productType]);

  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Manufacturer details</p>
        {access
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "UPDATE")
          ?.ctrl_flag && (
          <Box className="companyDetailsOrderHeader_btn">
            {query ? (
              <Button
                variant="contained"
                onClick={() => {
                  setQuery((prev) => !prev);
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
                    setQuery((prev) => !prev);
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
                      setQuery((prev) => !prev);
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
                    label={"Manufacturer Name"}
                    // text={variant && variant?.pincode}
                    text={
                      variant?.manufacturer_details
                        ? variant?.manufacturer_details?.manufacturer_name
                          ? variant?.manufacturer_details?.manufacturer_name
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="manufacturer_name"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Commodity Name "}
                    // text={variant && variant?.state}
                    text={
                      variant?.manufacturer_details
                        ? variant?.manufacturer_details?.commodity_name
                          ? variant?.manufacturer_details?.commodity_name
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="commodity_name"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Manufacturer Time"}
                    // text={
                    //   variant?.manufacturer_details
                    //     ? variant?.manufacturer_details?.manufacturer_time
                    //       ? variant?.manufacturer_details?.manufacturer_time.split("T")[1].split("Z")[0]
                    //       : "--"
                    //     : "--"
                    // }
                    text={[{ label: "Time", value:variant?.manufacturer_details?.manufacturer_time ,key:"manufacturer_time",type:"time" }]}
                    type="time_card"
                    disabled_y={query}
                    key="manufacturer_time"
                    handelTimeChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Manufacturer Address"}
                    text={
                      variant?.manufacturer_details
                        ? variant?.manufacturer_details?.manufacturer_address
                          ? variant?.manufacturer_details?.manufacturer_address
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="manufacturer_address"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Net Quantity"}
                    text={
                      variant?.manufacturer_details
                        ? variant?.manufacturer_details?.net_quantity
                          ? variant?.manufacturer_details?.net_quantity
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="net_quantity"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>

              {/* <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Manufacturer Date"}
                    text={
                      variant?.manufacturer_details
                        ? variant?.manufacturer_details?.manufacturer_date
                          ? variant?.manufacturer_details?.manufacturer_date.split("T")[0]
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="manufacturer_date"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense> */}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
  // }
};

export default ManufacturerDetailsCard;

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
