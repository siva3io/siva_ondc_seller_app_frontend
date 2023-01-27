import React, { useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
import ErrorBoundary from "../../../../ErrorBoundary";
import { getFoodtype } from "../../../../redux/Action/CombinedActions";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function FoodItem({
  edit,
  step2Data,
  setStep2Data,
  finalData,
  setFinalData,
  update,
  setUpdate,
}) {
  //redux variables
  const brand = useSelector(
    (state) => state.fetchAddProductDetails.brand.Brand
  );
  // getFoodtype
  let dispatch = useDispatch();
  const {FoodTypeData} = useSelector(
    (state) => state.data
  );
  useEffect(() => {
    dispatch(getFoodtype());
  }, []);
  console.log(FoodTypeData,"FoodTypeData")


  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);
  const [tempAttribute,settempAttribute]=useState({});
  const [staticFields, setStaticFields] = useState([
  
    {
      label: "Food Type",
      type: "radio",
      required: false,
      errorMessage: "Food Type is required",
      sub:[],
      key: "food_type_id",
    },
    {
      label: "FSSAI Licence no. ",
      type: "input",
      key: "fssai_licence_number",
      required: false,
      errorMessage: "FSSAI Licence is required",
    },
    {
      label: "Other FSSAI Licence no. ",
      type: "input",
      required: false,
      errorMessage: "Other FSSAI is required",
      key: "other_fssai_licence_number",
    },
    {
      label: "Imported Licence no. ",
      type: "input",
      key: "importers_fssai_number",
      required: false,
      errorMessage: "Imported Licence is required",
    },
    {

      label: "Time to life",
      type: "input",
      required: false,
      key: "time_to_life",
      defaultVal: null,
    },
    {

        label: "Ingredients Info",
        type: "input",
        required: false,
        key: "ingredients_info",
        defaultVal: null,
      },
      {

        label: "Nutritional Info",
        type: "input",
        required: false,
        key: "nutritional_info",
        defaultVal: null,
      },


  ]);
  //local functions
  const onInputChange = (prop, value) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].errorMessage = "";
    if (tempStaticField[index].required && (!value || value.length === 0)) {
      tempStaticField[index].errorMessage = prop + " is Required";
    } else if (
      (tempStaticField[index].minLength &&
        value.length < tempStaticField[index].minLength) ||
      (tempStaticField[index].maxLength &&
        value.length > tempStaticField[index].maxLength)
    ) {
      tempStaticField[index].errorMessage =
        prop +
        "should contain " +
        tempStaticField[index].minLength +
        " - " +
        tempStaticField[index].maxLength +
        " characters";
    }
    setStaticFields(tempStaticField);
    console.log(tempStaticField,"tempStaticField")
    settempAttribute({...tempAttribute,[prop]:value})

    setStep2Data({ ...step2Data, [prop]: value });
    setFinalData({ ...finalData, food_item_details:{...tempAttribute,[prop]:value} });
  };

  useEffect(() => {
    let temp = [...staticFields];
    if (FoodTypeData) {
      temp[0].sub = FoodTypeData?.map((item) => {
        return {
          label: item.display_name,
          type: "radio",
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [FoodTypeData]);

  const setRadioType = (prop, value) => {
    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].defaultVal = value;
    setStaticFields(tempStaticField);
    settempAttribute({...tempAttribute,[prop]:Number(value)})
    setStep2Data({ ...step2Data, [prop]: Number(value) });
    setFinalData({ ...finalData,food_item_details:{...tempAttribute,[prop]:Number(value)} });
  };




  console.log("staticFields", staticFields)

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Food Item</div>
            <div className="product-staticFormCardForm">
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "input" ? (

                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        required={field.required}
                        minLength={field.minLength ? field.minLength : ""}
                        maxLength={field.maxLength ? field.maxLength : ""}
                        errorMessage={field.errorMessage ? field.errorMessage : ""}
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={step2Data[field.key] ? step2Data[field.key] : ""}
                        onChange={(e) => onInputChange(field.key, e.target.value)}
                      />
                    </RemoteWrapper>
                  </Suspense>


                )  :   typ === "radio" ? (
                  <div className="product-checkboxFieldMain">
                    <label
                      className="radioLabelWrap"
                      style={{ color: "black" }}
                    >
                      {field.label}
                      {field.required ? (
                        <p className="product_required_mark">*</p>
                      ) : null}
                    </label>
                    <div className="product-checkboxFieldSub">
                      {field.sub && (
                        <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                            <RemoteRadio
                              label={field.label}
                              fields={field.sub}
                              onChange={(e) => {
                                setRadioType(field.key, e.target.value);
                              }}
                              field={field}
                            />
                          </RemoteWrapper>
                        </Suspense>
                      )}
                    </div>
                  </div>
                ) : typ === "select" ? (
                  <>
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteSelect
                          required={field.required}
                          label={field.label}
                          placeholder={`Select ${field.label}`}
                          data={field.data}
                          onChange={(e, value) => {
                            onSelectionChanges(field.key, value.value, value.label);
                          }}
                          value={field.value}
                          staticFields={staticFields}
                          setStaticFields={setStaticFields}
                          errorMessage={""}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  </>
                ):

                (
                  <></>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default FoodItem;


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
