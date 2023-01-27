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
import { loadStateDataById } from "../../../redux/Action/CombinedActions";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
// import ErrorBoundary from "../../../../ErrorBoundary";
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const LocationPricingDetailsCard = ({ fields, edit, parentBrand, access }) => {
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

  const { statesListData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadStateDataById("100"));
  }, []);

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

    var newVariant = { ...variant.location };
    const newFinalVariant = { ...finalVariant };
    if(prop === "state")
    {
    newVariant[prop] =value;
    newFinalVariant["location"] = {...newFinalVariant["location"],state_id:value.value}
    }
    else{ 
      newVariant[prop] = value;
      newFinalVariant["location"] = {...newFinalVariant["location"],[prop]:value};
    }

    // setVariant(newVariant);
    setVariant((varb)=> {return {...varb,location:newVariant} });

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
        <p className="companyDetailsOrder_header">Location</p>
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
                    label={"Pincode"}
                    // text={variant && variant?.pincode}
                    text={
                      variant?.location
                        ? variant?.location?.pincode
                          ? variant?.location?.pincode
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="pincode"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"State"}
                    // text={variant && variant?.state}
                    text={
                      variant?.location
                        ? variant?.location?.state
                          ? variant?.location?.state
                          : "--"
                        : "--"
                    }
                    data={statesListData.map((item) => {
                      return {
                        label: item.name,
                        value: item.id,
                      }
                    })}
                    type="select"
                    disabled_y={query}
                    name="state"
                    onSelectChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Address line 2"}
                    // text={variant && variant?.address_line_2}
                    text={
                      variant?.location
                        ? variant?.location?.address_line2
                          ? variant?.location?.address_line2
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="address_line2"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"City/District"}
                    // text={variant && variant?.city}
                    text={
                      variant?.location
                        ? variant?.location?.city
                          ? variant?.location?.city
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="city"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Address line 1"}
                    // text={variant && variant?.address_line_1}
                    text={
                      variant?.location
                        ? variant?.location?.address_line1
                          ? variant?.location?.address_line1
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="address_line1"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Address line 3"}
                    // text={variant && variant?.address_line_3}
                    text={
                      variant?.location
                        ? variant?.location?.address_line3
                          ? variant?.location?.address_line3
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="address_line3"
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

export default LocationPricingDetailsCard;

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
