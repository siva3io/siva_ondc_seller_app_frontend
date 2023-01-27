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
import { getFoodtype } from "../../../redux/Action/CombinedActions";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
// import ErrorBoundary from "../../../../ErrorBoundary";
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const FoodItemDetailsCard = ({ fields, edit, parentBrand, access }) => {
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

  const { FoodTypeData } = useSelector(state => state.data);
  useEffect(() => {
    dispatch(getFoodtype());
  }, []);

  const [foodTypeList, setFoodTypeList] = useState([]);

  useEffect(() => {
    console.log(FoodTypeData, "FoodTypeData");
    if (FoodTypeData && FoodTypeData) {
      const temp = FoodTypeData.map(item => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setFoodTypeList(temp);
      console.log(foodTypeList, "foodTypeList");
    }
  }, [FoodTypeData]);

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
    console.log("variant212", variant);
  }, [fields]);

  const onInputChange = (prop, value) => {
    const newVariant = { ...variant.food_item_details };
    const newFinalVariant = { ...finalVariant };

    newVariant[prop] = value;
    newFinalVariant["food_item_details"] = {
      ...newFinalVariant["food_item_details"],
      [prop]: value,
    };

    setVariant(o => {
      return { ...o, food_item_details: newVariant };
    });

    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
  };

  const onSelelectionChange = (prop, value) => {
    const temp = { ...variant };
    console.log(temp, "temp");
    if (prop === "food_type_id") {
      temp["food_item_details"].food_type.display_name = value.label;
      temp["food_item_details"].food_type.id = value.value;
    }

    const newFinalVariant = { ...finalVariant };
    setVariant(temp);
    newFinalVariant["food_item_details"] = {...newFinalVariant["food_item_details"],[prop]: value?.value};
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

  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Food Item Details</p>
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
                  {query ? (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteViewTextField
                          card
                          label={"Food Type"}
                          text={
                            variant?.food_item_details
                              ? variant?.food_item_details?.food_type
                                  ?.display_name
                                ? variant?.food_item_details?.food_type
                                    ?.display_name
                                : "--"
                              : "--"
                          }
                          disabled_y={query}
                          name="food_type"
                        />
                      </RemoteWrapper>
                    </Suspense>
                  ) : (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteSelect
                          disabled={query}
                          label={"Food Type"}
                          data={foodTypeList}
                          placeholder={`Select Food Type`}
                          value={
                            variant?.food_item_details
                              ? variant?.food_item_details?.food_type_id
                                  ?.display_name
                                ? variant?.food_item_details?.food_type_id
                                    ?.display_name
                                : "--"
                              : "--"
                          }
                          onChange={(e, value) =>
                            onSelelectionChange("food_type_id", value)
                          }
                          fieldKey={"food_type"}
                          edit={true}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  )}

          
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Other FSSAI Licence no."}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.food_item_details
                        ? variant?.food_item_details?.other_fssai_licence_number
                          ? variant?.food_item_details
                              ?.other_fssai_licence_number
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="other_fssai_licence_number"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Time to life"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.food_item_details
                        ? variant?.food_item_details?.time_to_life
                          ? variant?.food_item_details?.time_to_life
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="time_to_life"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Ingredients Info"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.food_item_details
                        ? variant?.food_item_details?.ingredients_info
                          ? variant?.food_item_details?.ingredients_info
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="ingredients_info"
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
                    label={"FSSAI Licence no"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.food_item_details
                        ? variant?.food_item_details?.fssai_licence_number
                          ? variant?.food_item_details?.fssai_licence_number
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="fssai_licence_number"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Importers FSSAI no."}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.food_item_details
                        ? variant?.food_item_details?.importers_fssai_number
                          ? variant?.food_item_details?.importers_fssai_number
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="importers_fssai_number"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper>
              </Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Nutritional Info"}
                    // text={variant && variant?.estimated_delivery_time}
                    text={
                      variant?.food_item_details
                        ? variant?.food_item_details?.nutritional_info
                          ? variant?.food_item_details?.nutritional_info
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="nutritional_info"
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

export default FoodItemDetailsCard;

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
