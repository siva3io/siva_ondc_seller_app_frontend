import React, { useState, useEffect } from "react";
import "./ProductDetails.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
import ErrorBoundary from "../../../../ErrorBoundary";
import { TimeWithinData } from "../../../../redux/Action/CombinedActions";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
const RemoteCheckbox = React.lazy(() => import("Remote/MatCheckBox"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function Replacement({
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

  const { time_withinData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(TimeWithinData());
  }, []);
  console.log(time_withinData, "time_withinData");

  const brand = useSelector(
    (state) => state.fetchAddProductDetails.brand.Brand
  );

  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);
  const [tempAttribute, settempAttribute] = useState({});
  const [staticFields, setStaticFields] = useState([
    {
      label: "Replacement Eligible",
      type: "checkbox",
      required: true,
      //   errorMessage: "Refund Eligible is required",
      key: "replacement_eligible",
      sub: [""],
    },
    {
      label: "Replacement Within",
      type: "select",
      key: "replacement_within_id",
      required: true,
      //   errorMessage: "Replacement Within is required",
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
    console.log(tempStaticField, "tempStaticField");
    settempAttribute({ ...tempAttribute, [prop]: value });

    setStep1Data({ ...step1Data, [prop]: value });
    setFinalData({ ...finalData, product_replacement_terms: { ...tempAttribute, [prop]: value } });
  };

  const onSelectionChanges = (prop, valueId, valueLabel) => {
    console.log(prop, valueId, valueLabel,"OnSELECTCHAANGE" )
    const tempStaticField = [...staticFields];
    if (prop === "replacement_within_id") {
      tempStaticField[1].value = {value:valueId ,label:valueLabel};
    }

    setStaticFields(tempStaticField);
    settempAttribute({ ...tempAttribute, [prop]: valueId });
    setStep1Data({ ...step1Data, [prop]: valueId });
    setFinalData({ ...finalData, product_replacement_terms: { ...tempAttribute, [prop]: valueId } });
  };

  const setCheckboxType = (label, prop, value) => {
    console.log(label, prop, value,"ONCHECKBOX")
    const temp = [...staticFields];
    if (label === "replacement_eligible") {
      settempAttribute({ ...tempAttribute, [label]: value });
      setStep1Data({ ...step1Data, [label]: value });
      setFinalData({
        ...finalData,
        product_replacement_terms: { ...tempAttribute, [label]: value },
      });
    }

    setStaticFields(temp);
  };

  useEffect(() => {
    let temp = [...staticFields];
    if (time_withinData) {
      temp[1].data = time_withinData.map((item) => {
        return {
          label: item.display_name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [time_withinData]);

  console.log("staticFields", staticFields);

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Product Replacement terms</div>
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
                          value={field?.value?.label}
                          staticFields={staticFields}
                          setStaticFields={setStaticFields}
                          errorMessage={""}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  </>
                ) : typ === "checkbox" ? (
                  <div className="product-checkboxFieldMain">
                    <label
                      className="checkboxLabelWrap"
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
                            <RemoteCheckbox
                              label={field.label}
                              fields={field.sub}
                              onChange={(e) =>
                                setCheckboxType(
                                  field.key,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          </RemoteWrapper>
                        </Suspense>
                      )}
                    </div>
                  </div>
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

export default Replacement;
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
