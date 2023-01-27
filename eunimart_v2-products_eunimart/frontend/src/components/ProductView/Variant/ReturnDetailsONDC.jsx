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
import { TimeWithinData,getFullFillData } from "../../../redux/Action/CombinedActions";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
// import ErrorBoundary from "../../../../ErrorBoundary";
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ReturnDetailsONDC = ({ fields, edit, parentBrand, access }) => {
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

  const { time_withinData,FullfillData } = useSelector((state) => state.data);

  useEffect(
    ()=>{
      dispatch(TimeWithinData());
      dispatch(getFullFillData());
    },[]
  )
  useEffect(()=>{
    console.log('FullfillData',FullfillData);
  },[FullfillData])

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
    console.log(prop, value,"prop, value");
    const newVariant = { ...variant.product_return_terms };
    const newFinalVariant = { ...finalVariant };

    if(prop=="return_within" || prop=="fulfillment_managed_by" )
    {

      newVariant[prop] = value;
    newFinalVariant["product_return_terms"] = {...newFinalVariant["product_return_terms"], [prop=="fulfillment_managed_by" ? "fulfillment_managed_by_id" : "return_within_id"  ]  :value.value };
    }
else{
  newVariant[prop] = value;
  newFinalVariant["product_return_terms"] = {...newFinalVariant["product_return_terms"], [prop]:Boolean(value)};
}

    setVariant((varb)=> {return {...varb,product_return_terms:newVariant} });
    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
  };

 useEffect(()=>{
  console.log("Variable",variant)
 },[variant]) 
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
        <p className="companyDetailsOrder_header">Product Return Details</p>
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
                    text={variant?.product_return_terms?.refund_eligible_return}
                    disabled_y={query}
                    name="refund_eligible_return"
                    handleCheckBox={onInputChange}
                    type="checkbox"
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Return within"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={variant?.product_return_terms?.return_within}
                    data={time_withinData.map((item) => {
                      return {
                        label: item.display_name,
                        value: item.id,
                      };
                    })}
                    disabled_y={query}
                    name="return_within"
                    type="select"
                    onSelectChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Fulfillment Managed by"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={ variant?.product_return_terms?.fulfillment_managed_by}
                    disabled_y={query}
                    data={FullfillData?.map((item)=>{
                      return{
                        label:item.display_name,
                        value:item.id
                      }
                    })}
                    type="select"
                    name="fulfillment_managed_by"
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

export default ReturnDetailsONDC;

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

