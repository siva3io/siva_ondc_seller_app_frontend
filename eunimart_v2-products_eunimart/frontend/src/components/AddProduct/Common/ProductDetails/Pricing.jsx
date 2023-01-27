import React, { useState, useEffect } from "react";
import "./ProductDetails.css";

//redux
import { useDispatch, useSelector } from "react-redux";

import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
import ErrorBoundary from "../../../../ErrorBoundary";
import { searchDeliveryTime } from "../../../../redux/Action/GetDeliveryTimeAction";
import { searchCurrency } from "../../../../redux/Action/GetCurrencyAction";
import { getPaymenttype } from "../../../../redux/Action/CombinedActions";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


function Pricing({
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

  const currency = useSelector(
    (state) => state.fetchSearchReducer?.currency?.Currency?.data
  );

  useEffect(() => {
    dispatch(searchCurrency());
  }, []);

  const brand = useSelector(
    (state) => state.fetchAddProductDetails.brand.Brand
  );

    // getFoodtype
    const {PaymentTypeData} = useSelector(
      (state) => state.data
    );
    useEffect(() => {
      dispatch(getPaymenttype());
    }, []);
    console.log(PaymentTypeData,"PaymentTypeData")

  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);
  const [tempAttribute, settempAttribute] = useState({});
  const [staticFields, setStaticFields] = useState([
    {
      label: "MRP",
      type: "input",
      required: true,
      // errorMessage: "MRP is required",
      key: "mrp",
    },
    {
      label: "Sales Price",
      type: "input",
      key: "sales_price",
      required: true,
      // errorMessage: "Sales Price is required",
    },
    {
      label: "Currency",
      type: "select",
      required: true,
      data: [],
      // errorMessage: "Currency is required",
      key: "currency_id",
    },
    {
      label: "Declared Price",
      type: "input",
      key: "declared_price",
      required: true,
      // errorMessage: "Declared Price is required",
    },
    {
      label: "Payment Method",
      type: "radio",
      required: true,
      key: "payment_method_id",
      sub: [],
      defaultVal: null,
    },
  ]);

  useEffect(() => {
    let temp = [...staticFields];
    if (PaymentTypeData) {
      temp[4].sub = PaymentTypeData?.map((item) => {
        return {
          label: item.display_name,
          type: "radio",
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [PaymentTypeData]);

  // {
  //   "category_details":{},
  //   "product_details":{},
  //   "pricing_details":{},
  //   "location_details":{},
  //   "delivery_sla_details":{},
  //   "product_cancellation_terms":{},
  //   "product_return_terms":{},
  //   "product_replacement_terms":{},
  //   "food_item_details":{}
  // }

  //local functions

  // useEffect(() => {
  //   let temp = [...staticFields];

  //   if (condition.data) {
  //     temp[2].sub = condition.data.map((item) => {
  //       return {
  //         label: item.display_name,
  //         type: "radio",
  //         value: item.id,
  //       };
  //     });
  //   }
  //   setStaticFields(temp);
  // }, [condition]);

  const onInputChange = (prop, value) => {
    let tempStaticField = [...staticFields];

    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].errorMessage = "";

    if(prop === "mrp" || prop === "sales_price" || prop==="declared_price" ){
      value = parseFloat(value)
    }

    if (tempStaticField[index].required && (!value || value.length === 0)) {
      tempStaticField[index].errorMessage = prop + " is Required";
    } else if(
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
    setFinalData({ ...finalData, product_pricing_details: { ...tempAttribute, [prop]: value } });
  };

  const setRadioType = (prop, value) => {
    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].defaultVal = value;
    setStaticFields(tempStaticField);
    settempAttribute({ ...tempAttribute, [prop]: Number(value) });
    setStep1Data({ ...step1Data, [prop]: Number(value) });
    setFinalData({ ...finalData, product_pricing_details: { ...tempAttribute, [prop]: Number(value) } });
  };

  useEffect(() => {
    let temp = [...staticFields];
    console.log("currency", currency);
    if (currency) {
      temp[2].data = currency.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [currency]);

  const onSelectionChanges = (prop, valueId, valueLabel) => {
    const tempStaticField = [...staticFields];
    if (prop === "Currency") {
      let index = tempStaticField[2].data.findIndex(function (field) {
        return field.label === valueLabel;
      });
      tempStaticField[2].value = valueLabel;
    }

    setStaticFields(tempStaticField);
    settempAttribute({ ...tempAttribute, [prop]: valueId });
    setStep1Data({ ...step1Data, [prop]: valueId });
    setFinalData({ ...finalData, product_pricing_details: { ...tempAttribute, [prop]: valueId } });
  };

  console.log("staticFields", staticFields);

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Pricing details</div>
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

export default Pricing;

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
