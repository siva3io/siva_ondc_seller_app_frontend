import React, { useEffect } from "react";
// import "../ProductDetailCard/ProductDetailCard.css";
import "./ProductDetailCard/ProductDetailCard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../redux/Action/PostEditApi";
import { TimeWithinData } from "../../../redux/Action/CombinedActions";
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

const PaymentCancellationDetailsCard = ({
  fields,
  edit,
  parentBrand,
  access,
}) => {
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


  const { time_withinData } = useSelector((state) => state.data);


  useEffect(
    ()=>{
      dispatch(TimeWithinData());
      // dispatch(getFullFillData());
    },[]
  )

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
    const newVariant = { ...variant.product_cancellation_terms };
    const newFinalVariant = { ...finalVariant };

    if(prop == "cancel_time")
    {
      newVariant[prop] = value;
      newFinalVariant["product_cancellation_terms"] = {...newFinalVariant["product_cancellation_terms"], cancel_time_id:value.value}; 
    }
    else if(prop == "refund_eligible"){
      newVariant[prop] = value;
      newFinalVariant["product_cancellation_terms"] = {...newFinalVariant["product_cancellation_terms"], [prop]:Boolean(value)};
    }
    else{
      newVariant[prop] = value;
      newFinalVariant["product_cancellation_terms"] = {...newFinalVariant["product_cancellation_terms"], [prop]:Number(value)}; 
    
    }
  

    setVariant((varb)=> {return {...varb,product_cancellation_terms:newVariant} });

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
        <p className="companyDetailsOrder_header">Product Cancellation Terms</p>
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
                    label={"Refund eligible"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={  variant?.product_cancellation_terms?.refund_eligible}
                    disabled_y={query}
                    name="refund_eligible"
                    handleCheckBox={onInputChange}
                    type="checkbox"

                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Cancellation fee"}
                    // text={variant && variant?.customer_care_number}
                    text={variant?.product_cancellation_terms?.cancellation_fee}
                    disabled_y={query}
                    name="cancellation_fee"
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
                    label={"Cancel time"}
                    // text={variant && variant?.customer_care_number}
                    text={variant?.product_cancellation_terms?.cancel_time}
                    data={time_withinData.map((item) => {
                      return {
                        label: item.display_name,
                        value: item.id,
                      };
                    })}
                    disabled_y={query}
                    name="cancel_time"
                    type="select"
                    onSelectChange={onInputChange}
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

export default PaymentCancellationDetailsCard;

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
