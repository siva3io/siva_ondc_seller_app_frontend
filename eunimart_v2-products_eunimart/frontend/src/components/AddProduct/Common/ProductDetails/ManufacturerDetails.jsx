import React, { useState, useEffect } from "react";
import "./ProductDetails.css";

//redux
import { useDispatch, useSelector } from "react-redux";

import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
import ErrorBoundary from "../../../../ErrorBoundary";
import { fetchState } from "../../../../redux/Action/FetchStateAction";
import MatInput from "../../../../shared/widgets/MatInput";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function ManufacturerDetails({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
  update,
  setUpdate,
}) {
  //redux variables
  const dispatch = useDispatch();
  const brand = useSelector(
    (state) => state.fetchAddProductDetails.brand.Brand
  );
  // const locatnstate = useSelector(
  //   (state) => state.fetchState
  // );

  // console.log(locatnstate,"locatnstate")

  // useEffect(() => {
  //   dispatch(fetchState())
  // }, []);

  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);
  const [tempAttribute, settempAttribute] = useState({});

  const [staticFields, setStaticFields] = useState([
    {
      label: "Manufacturer Name",
      type: "input",
      required: true,
      errorMessage: "Manufacturer Name is required",
      key: "manufacturer_name",
    },
    {
      label: "Manufacturer Address",
      type: "input",
      key: "manufacturer_address",
      required: true,
      // errorMessage: "City/Disrict is required",
    },
    {
      label: "Commodity Name ",
      type: "input",
      required: true,
      // errorMessage: "State is required",
      key: "commodity_name",
    },
    {
      label: "Net Quantity",
      type: "input",
      key: "net_quantity",
      required: true,
      // errorMessage: "Declared Price is required",
    },
    // {
    //   label: "Manufacturer Time ",
    //   type: "input",
    //   required: false,
    //   // errorMessage: "Address line 1 is required",
    //   key: "manufacturer_time",
    // },
    {
      label: "Manufacturer Date",
      type: "date",
      required: true,
      // errorMessage: "Address line 2 is required",
      key: "manufacturer_date",
    },
  ]);

  //local functions
  const onInputChange = (prop, value) => {
    if (prop == "net_quantity") {
      value = parseInt(value)
    }
    if(prop=="manufacturer_date"){
      value = value+"T00:00:00.000Z"
    }
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
    console.log(tempStaticField, "tempStaticField");
    settempAttribute({ ...tempAttribute, [prop]: value });

    setStep1Data({ ...step1Data, [prop]: value });
    setFinalData({ ...finalData, manufacturer_details: { ...tempAttribute, [prop]: value } });
  };

  console.log("staticFields", staticFields);

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Manufacturer details</div>
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
                        errorMessage={
                          field.errorMessage ? field.errorMessage : ""
                        }
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={step1Data[field.key] ? step1Data[field.key] : ""}
                        onChange={(e) =>
                          onInputChange(field.key, e.target.value)
                        }
                      />
                    </RemoteWrapper>
                  </Suspense>
                ) : typ === "radio" ? (
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
                            onSelectionChanges(
                              field.key,
                              value.value,
                              value.label
                            );
                          }}
                          value={field.value}
                          staticFields={staticFields}
                          setStaticFields={setStaticFields}
                          errorMessage={""}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  </>
                ): typ === "date" ? (
                  <>
                    <MatInput
                    required={field.required}
                    minLength={field.minLength ? field.minLength : ""}
                    maxLength={field.maxLength ? field.maxLength : ""}
                    errorMessage={field.errorMessage ? field.errorMessage : ""}
                    type={field.type}
                    label={field.label}
                    name={field.label}
                    value={field.value}
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => {
                      onInputChange(field.key, e.target.value);
                    }}
                  />
                  </>
                ) : (
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

export default ManufacturerDetails;
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
