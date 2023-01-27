import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
//redux
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";

import ErrorBoundary from "../../../../ErrorBoundary";
import {
  ProductFulfilmentData,
  TimeWithinData,
} from "../../../../redux/Action/CombinedActions";
import { searchDeliveryTime } from "../../../../redux/Action/GetDeliveryTimeAction";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
const RemoteInput = React.lazy(() => import("Remote/MatInput"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function ProductInfo({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
  update,
  setUpdate,
}) {
  //redux variables
  const brand = useSelector(state => state.fetchAddProductDetails.brand.Brand);
  const dispatch = useDispatch();
  const [tempAttribute, settempAttribute] = useState({});

  const { product_fulfilment_Data } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(ProductFulfilmentData());
  }, []);
  console.log(product_fulfilment_Data, "ProductFulfilmentData");

  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);

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
  const [staticFields, setStaticFields] = useState([
    {
      label: "Units in the Box",
      // type: "select",
      type: "input",
      required: true,
      // errorMessage: "Units in the Box is required",
      key: "unit_per_box",
    },
    {
      label: "Customer Care Number",
      type: "input",
      data: [],
      // type: "input",
      key: "customer_care_number",
      required: true,
      // errorMessage: "Fulfilment Indentifier is required",
    },
    {
      label: "Time to ship",
      type: "select",
      data:[],
      // type: "input",
      // key: "time_to_ship",
      key: "time_to_ship_id",

      required: true,
      // errorMessage: "Category Code is required",
    },
  ]);

  //local functions

  useEffect(() => {
    let temp = [...staticFields];
    if (deliverytime) {
      console.log("deliverytime111",deliverytime)
      temp[2].data = deliverytime.map((item) => {
        return {
          label: item.display_name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [deliverytime]);

  const onInputChange = (prop, value) => {
    if (prop == "unit_per_box") {
      value = parseInt(value);
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
    setFinalData({
      ...finalData,
      product_critical_details: { ...tempAttribute, [prop]: value },
    });
  };

  useEffect(() => {
    let temp = [...staticFields];
    if (product_fulfilment_Data) {
      temp[1].data = product_fulfilment_Data.map(item => {
        return {
          label: item.display_name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [product_fulfilment_Data]);

  const onSelectionChanges = (prop, valueId, valueLabel) => {
    const tempStaticField = [...staticFields];
    if (prop === "Fulfilment_Indentifier") {
      let index = tempStaticField[1].data.findIndex(function (field) {
        return field.label === valueLabel;
      });
      tempStaticField[1].value = valueLabel;
    }

    setStaticFields(tempStaticField);
    settempAttribute({ ...tempAttribute, [prop]: valueId });
    setStep1Data({ ...step1Data, [prop]: valueId });
    setFinalData({
      ...finalData,
      product_critical_details: { ...tempAttribute, [prop]: valueId },
    });
  };

  console.log("staticFields", staticFields);

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Product critical details</div>
            <div className="product-staticFormCardForm">
              {staticFields.map(field => {
                const val = field.label;
                const typ = field.type;
                return typ === "select" ? (
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
                ) : typ === "input" ? (
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
                        onChange={e => onInputChange(field.key, e.target.value)}
                      />
                    </RemoteWrapper>
                  </Suspense>
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

export default ProductInfo;

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
