import React, { useState, useEffect } from "react";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
import "./ProductDetails.css";
import ModalViewV2 from "../../../../shared/widgets/Modal/ModalViewV2";

//redux
import { useDispatch, useSelector } from "react-redux";

import {
  createBrandDetails,
  deleteBrandDetails,
  updateBrandDetails,
  getBrandDetails,
} from "../../../../redux/Action/FetchProductDetailsAction";
//MUI
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";

import ComboBox from "../../../../shared/widgets/ComboBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));

import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
const RemoteCheckbox = React.lazy(() => import("Remote/MatCheckBox"));
import ErrorBoundary from "../../../../ErrorBoundary";
import { searchDeliveryTime } from "../../../../redux/Action/GetDeliveryTimeAction";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function InventoryDetailsCard({
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
  const [check, setCheck] = useState(false); // used to check the datas are preopulated or not...in edit mode
  const [cloneBrand, setCloneBrand] = useState([]);
  const [editableBrand, setEditableBrand] = useState([]);
  useEffect(() => {
    dispatch(searchDeliveryTime());
  }, []);
  const deliverytime = useSelector(
    (state) => state.searchDeliveryTime.DeliveryTimeData
  );

  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);
  const [tempAttribute, settempAttribute] = useState({});
  const [staticFields, setStaticFields] = useState([
    {
      label: "Available Quantity",
      type: "input",
      data: [],
      required: true,
      key: "available_quantity",
      value: "",
    },
    {
      label: "Maximum Quantity",
      type: "input",
      data: [],
      required: true,
      key: "maximum_quantity",
      value: "",
      // errorMessage: "Customer Care Number is required",
    },
  ]);

  //local functions

  const onSelectionChanges = (prop, valueId, valueLabel) => {

    console.log(prop, valueId, valueLabel, "on select")

    const tempStaticField = [...staticFields];
    if (valueId !== "create") {
      if (prop === "brand_id") {
        let index = tempStaticField.findIndex(function (field) {
          return field.key === prop;
        });
        tempStaticField[index].value = valueLabel;
      }
      if (prop === "available_quantity") {
        let index = tempStaticField.findIndex(function (field) {
          return field.key === prop;
        });
        tempStaticField[index].value = { value: valueId, label: valueLabel };
      }

      setStaticFields(tempStaticField);
      settempAttribute({ ...tempAttribute, [prop]: valueId });
      setStep1Data({ ...step1Data, [prop]: valueId });
      setFinalData({ ...finalData, inventory_detail: { ...tempAttribute, [prop]: valueId } });
      console.log(tempStaticField, "tempStaticField")
    }
  };

  //useEffect functions
  useEffect(() => {
    if (edit && check === false && step1Data.brand_name) {
      let tempStaticField = [...staticFields];
      tempStaticField[0].value = step1Data.brand_name;
      // tempStaticField[4].defaultVal = step1Data.product_condition_id;
      // tempStaticField[5].defaultVal = step1Data.product_type_id;
      // tempStaticField[8].defaultVal = step1Data.inventory_tracking_id;
      setCheck(true);
      setStaticFields(tempStaticField);
    }
  }, [step1Data]);

  useEffect(() => {
    setStep1Data({ ...step1Data, brand_id: Number(selectKey) });
  }, [selectKey]);

  useEffect(() => {
    if (deliverytime) {
      let temp = [];
      temp = deliverytime.map((item) => {
        return {
          id: item.id,
          brand_name: item.display_name,
          edit: false,
        };
      });

      setCloneBrand(temp);
    }

    let temp = [...staticFields];
    if (deliverytime) {
      temp[0].data = deliverytime.map((item) => {
        return {
          label: item.display_name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [deliverytime]);

  const onInputChange = (prop, value) => {
    console.log("propkey",prop,value)
    if (prop == "maximum_quantity" || prop =="available_quantity") {
      value = parseInt(value)
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
    setFinalData({ ...finalData, inventory_detail: { ...tempAttribute, [prop]: value } });
  };

  console.log("staticFields", staticFields);

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Inventory Details</div>
            <div className="product-staticFormCardForm">
              {staticFields.map((field) => {
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
                          value={field.value.label}
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
                        onChange={(e) =>
                          onInputChange(field.key, e.target.value)
                        }
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

export default InventoryDetailsCard;

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
