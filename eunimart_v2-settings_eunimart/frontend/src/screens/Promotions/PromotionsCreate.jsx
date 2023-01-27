import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";
import ModalView_Table from "Remote/ModalView_Table";
import MatInput from "Remote/MatInput";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from "Remote/AddForm_Table";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import FormLabel from "@mui/material/FormLabel";
import "./PromotionsCreate.css";
import { lazy, Suspense } from "react";
import { CreateOffer, loadConditions, loadDiscountType, loadProductVariantData, uploadDocument } from "../../redux/action";
import ErrorBoundary from "../ErrorBoundary";
import { TroubleshootSharp } from "@mui/icons-material";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{

      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


function PromotionsCreate(props) {
  const history = useHistory();
  let dispatch = useDispatch();
  let selectDiscountype = {};
  useEffect(() => {
    dispatch(loadProductVariantData({ limit: 10, offset: 1, filters: null, sort: null }));
    dispatch(loadDiscountType());
    dispatch(loadConditions());

  }, []);
  const { productVariantData, discountTypedata, conditionsdata,uploadlinkdata } = useSelector((state) => state.data);
  const [showallprods, setshowallprods] = useState(false)
  const [manualDiscount, setmanualDiscount] = useState(false)
  const [fileUpload, setfileUpload] = useState({});
  console.log(uploadlinkdata,"uploadlinkdata")





  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });

  const [selectedProductData, setSelectedProductData] = useState([
    {
      Quantity: 0,
      selling_price: 0,
      discount: 0,
      product_pricing_details: { tax_options: 0 },
    },
  ]);

  const [allProductsData, setAllProductsData] = useState([
    {
      Quantity: 0,
      selling_price: 0,
      discount: 0,
      product_pricing_details: { tax_options: 0 },
    },
  ]);

  const [PromotionDetailFields, setPromotionDetailFields] = useState([
    {
      label: "Promotion Name",
      type: "input",
      key: "promotion_name",
    },
    {
      label: "",
      type: "pre",
      key: "Auto_sales_order_number",
    },
    {
      label: "Start date & time",
      type: "dateandtime",
      key: "start_date_time",
      defaultVal: {},
    },
    {
      label: "",
      type: "pre",
      key: "Auto_reference_number",
    },
    {
      label: "End date & time",
      type: "dateandtime",
      key: "end_date_time",
      // data: ["USD", "INR"],
      defaultVal: {},
    },
  ]);

  const [productsDetailFields, setproductsDetailFields] = useState([
    {
      label: "Select for",
      type: "radio",
      key: "select_for_1",
      sub: [
        {
          label: "Selected Products",
          value: 2,
        },
        {
          label: "All Products",
          value: 1,
        },
      ],
    },
    {
      label: "Select for",
      type: "radio",
      key: "select_for_2",
      sub: [
        {
          label: "Select products for same discount.",
          value: 3,
        },
        {
          label: "Manually add discounts per product.",
          value: 4,
        },
      ],
    },
  ]);

  const [extraFields, setExtrafields] = useState([
    {
      label: "Discount type",
      type: "select",
      data: [],
      key: "selected_discount_type",
      // required: true,
    },
    {
      label: "Discount Value",
      type: "input",
      key: "discount_value",
      // required: true,
    },
  ]);

  useEffect(() => {
    let temp = [...extraFields];
    if (discountTypedata) {
      temp[0].data = discountTypedata?.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
    }
    setExtrafields(temp);
  }, [discountTypedata]);


  const [otherDetails, setotherDetails] = useState([
    {
      label: "Terms & Conditions",
      type: "radio",
      key: "terms_conditions",
      sub: [
      ],
    },
    {
      label: "Description",
      type: "textarea",
      key: "description",
      row: 5,
    },
    
    // {
    //   label: "Upload Document",
    //   type: "file_upload",
    //   key: "Upload_terms",
    //   buttonLabel: "Upload"
    // },
  
  
  ]);

  useEffect(() => {
    let temp = [...otherDetails];
    if (conditionsdata) {
      temp[0].sub = conditionsdata?.map((item) => {
        return {
          label: item.display_name,
          type: "radio",
          value: item.id,
        };
      });
    }
    setotherDetails(temp);
  }, [conditionsdata]);


  const [mainData, setMainData] = useState({});

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        Quantity: 0,
        selling_price: 0,
        discount: 0,
        product_pricing_details: { tax_options: 0 },
      },
    ]);
  };

  let headCells = []
  let allHeadCells = []

  if (manualDiscount == true) {
    headCells = [
      {
        key: "sku_id",
        label: "Product SKU",
        type: "select",
        data: useSelector((state) => state.data.productVariantData.map(o => { return { id: o.id, label: o.sku_id } })),
        style: { width: 200 },
      },
      {
        key: "product_name",
        label: "Product Name",
        type: "text",
      },
      {
        key: "variant_name",
        label: "Variant Name",
        type: "text",
      },
      {
        key: "MRP",
        label: "MRP",
        type: "text",
      },
      {
        key: "sale_rate",
        label: "Sale Rate",
        type: "text",
      },
      {
        key: "manual_discount_type",
        label: "Manual Discount type",
        type: "select",
        data: discountTypedata.map(item => { return { value: item.id, label: item.display_name } }),
      },
      {
        key: "manual_discount_value",
        label: "Manual Discount Value",
        type: "text",
      },
      {
        key: "discounted_price",
        label: "Discounted Price",
        type: "text",
      },
      {
        key: "Action",
        label: "Action",
        type: "view",
        renderView: (item) => (
          <div>
            <DeleteIcon onClick={() => {
              setSelectedProductData(selectedProductData.filter(o => o.sku_id != item.sku_id))
            }
            } />
          </div>
        )
      },
    ];
  }
  else if (manualDiscount != true) {
    headCells = [
      {
        key: "sku_id",
        label: "Product SKU",
        type: "select",
        data: useSelector((state) => state.data.productVariantData.map(o => { return { id: o.id, label: o.sku_id } })),
        style: { width: 200 },
      },
      {
        key: "product_name",
        label: "Product Name",
        type: "text",
      },
      {
        key: "variant_name",
        label: "Variant Name",
        type: "text",
      },
      {
        key: "MRP",
        label: "MRP",
        type: "text",
      },
      {
        key: "sale_rate",
        label: "Sale Rate",
        type: "text",
      },
      {
        key: "discount_type",
        label: "Discount type",
        type: "text",
        data: [],
      },
      {
        key: "discounted_price",
        label: "Discounted Price",
        type: "text",
      },
      {
        key: "Action",
        label: "Action",
        type: "view",
        renderView: (item) => (
          <div>
            <DeleteIcon onClick={() => {
              setSelectedProductData(selectedProductData.filter(o => o.sku_id != item.sku_id))
            }
            } />
          </div>
        )
      },
    ];
  }

  if (manualDiscount == true) {
    allHeadCells = [
      {
        key: "sku_id",
        label: "Product SKU",
        type: "select",
        data: useSelector((state) => state.data.productVariantData.map(o => { return { id: o.id, label: o.sku_id } })),
        style: { width: 300 },
      },
      {
        key: "product_name",
        label: "Product Name",
        type: "text",
      },
      {
        key: "variant_name",
        label: "Variant Name",
        type: "text",
      },
      {
        key: "MRP",
        label: "MRP",
        type: "text",
      },
      {
        key: "sale_rate",
        label: "Sale Rate",
        type: "text",
      },
      {
        key: "manual_discount_type",
        label: "Manual Discount type",
        type: "select",
        data: discountTypedata.map(item => { return { value: item.id, label: item.display_name } }),
      },
      {
        key: "manual_discount_value",
        label: "Manual Discount value",
        type: "text",

      },
      {
        key: "discounted_price",
        label: "Discounted Price",
        type: "text",
      },
      {
        key: "Action",
        label: "Action",
        type: "view",
        renderView: (item) => (
          <div>
            <DeleteIcon onClick={() => {
              setAllProductsData(allProductsData.filter(o => o.sku_id != item.sku_id))
            }
            } />
          </div>
        )
      },
    ];
  }
  else if (manualDiscount != true) {
    allHeadCells = [
      {
        key: "sku_id",
        label: "Product SKU",
        type: "select",
        data: useSelector((state) => state.data.productVariantData.map(o => { return { id: o.id, label: o.sku_id } })),
        style: { width: 300 },
      },
      {
        key: "product_name",
        label: "Product Name",
        type: "text",
      },
      {
        key: "variant_name",
        label: "Variant Name",
        type: "text",
      },
      {
        key: "MRP",
        label: "MRP",
        type: "text",
      },
      {
        key: "sale_rate",
        label: "Sale Rate",
        type: "text",
      },
      {
        key: "discount_type",
        label: "Discount type",
        type: "text",
        data: [],
      },
      {
        key: "discounted_price",
        label: "Discounted Price",
        type: "text",
      },
      {
        key: "Action",
        label: "Action",
        type: "view",
        renderView: (item) => (
          <div>
            <DeleteIcon onClick={() => {
              setAllProductsData(allProductsData.filter(o => o.sku_id != item.sku_id))
            }
            } />
          </div>
        )
      },
    ];
  }

  const handleFileUpload = (key, value) => {
    console.log("key : ", key, "value : ", value);
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
    if(key=="Upload_terms"){
      let UploadPayload={
        "data": value?.data,
        "extension":value?.type,
        "module": "test",
        "submodule": "file"
      }
      dispatch(uploadDocument(UploadPayload))

    }
    console.log(newMainData, "maindata")

}

  const handelInputChange = (key, value, index = null) => {
    console.log("handelInputChange", key, value, index, allProductsData)
    if (!showallprods) {
      console.log("iff")
      if (index != null) {
        if (!manualDiscount) {
          var newSelectedProductData = JSON.parse(
            JSON.stringify(selectedProductData)
          );
          if (key == "sku_id") {
            var selectVarient = productVariantData.find((o) => o?.id == value?.id);
            newSelectedProductData[index]["product_id"] = selectVarient["id"];
            newSelectedProductData[index]["product_template_id"] = selectVarient["product_template_id"];
            newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
            newSelectedProductData[index]["product_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["variant_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["MRP"] = selectVarient["product_pricing_details"]["mrp"];
            newSelectedProductData[index]["sale_rate"] = selectVarient["product_pricing_details"]["sales_price"];
            newSelectedProductData[index]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
          }
          if (newSelectedProductData.length > 0) {
            if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
              for (let i = 0; i < newSelectedProductData.length; i++) {
                newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
              }
            }
            else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
              for (let i = 0; i < newSelectedProductData.length; i++) {
                newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
              }
            }
            setSelectedProductData(newSelectedProductData);
          }
        }
        else {
          var newSelectedProductData = JSON.parse(
            JSON.stringify(selectedProductData)
          );
          if (key == "sku_id") {
            var selectVarient = productVariantData.find((o) => o?.id == value?.id);
            newSelectedProductData[index]["product_id"] = selectVarient["id"];
            newSelectedProductData[index]["product_template_id"] = selectVarient["product_template_id"];
            newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
            newSelectedProductData[index]["product_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["variant_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["MRP"] = selectVarient["product_pricing_details"]["mrp"];
            newSelectedProductData[index]["sale_rate"] = selectVarient["product_pricing_details"]["sales_price"];
            newSelectedProductData[index]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
          }
          if (key == "manual_discount_value") {
            newSelectedProductData[index]["manual_discount_value"] = value;
          }
          if (key == "manual_discount_type") {
            newSelectedProductData[index]["manual_discount_type"] = value.label;
            newSelectedProductData[index]["manual_discount_type_id"] = value.id;
          }
          for (let i = 0; i < newSelectedProductData.length; i++) {
            if (newSelectedProductData[i]["manual_discount_type"] == "Flat Deduction") {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - Number(newSelectedProductData[i]["manual_discount_value"]))
            }
            if (newSelectedProductData[i]["manual_discount_type"] == "Flat Percentage") {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (Number(newSelectedProductData[i]["manual_discount_value"]) / 100)))
            }
          }
          setSelectedProductData(newSelectedProductData);
        }

      } else {
        var newMainData = mainData;
        newMainData[key] = value;
        setMainData(newMainData);

        var newSelectedProductData = JSON.parse(
          JSON.stringify(selectedProductData)
        );
        if (newSelectedProductData.length > 0) {
          if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
            for (let i = 0; i < newSelectedProductData.length; i++) {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
            }
          }
          else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
            for (let i = 0; i < newSelectedProductData.length; i++) {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
            }
          }
          setSelectedProductData(newSelectedProductData);
        }
      }
    }
    else {
      console.log("else")
      if (index != null) {
        if (!manualDiscount) {
          var newSelectedProductData = JSON.parse(
            JSON.stringify(allProductsData)
          );
          if (key == "sku_id") {
            var selectVarient = productVariantData.find((o) => o?.id == value?.id);
            newSelectedProductData[index]["product_id"] = selectVarient["id"];
            newSelectedProductData[index]["product_template_id"] = selectVarient["product_template_id"];
            newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
            newSelectedProductData[index]["product_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["variant_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["MRP"] = selectVarient["product_pricing_details"]["mrp"];
            newSelectedProductData[index]["sale_rate"] = selectVarient["product_pricing_details"]["sales_price"];
            newSelectedProductData[index]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
          }
          if (newSelectedProductData.length > 0) {
            if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
              for (let i = 0; i < newSelectedProductData.length; i++) {
                newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
              }

            }
            else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
              for (let i = 0; i < newSelectedProductData.length; i++) {
                newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
              }
            }
            setAllProductsData(newSelectedProductData);
          }
        }
        else {
          var newSelectedProductData = JSON.parse(
            JSON.stringify(allProductsData)
          );
          if (key == "sku_id") {
            var selectVarient = productVariantData.find((o) => o?.id == value?.id);
            newSelectedProductData[index]["product_id"] = selectVarient["id"];
            newSelectedProductData[index]["product_template_id"] = selectVarient["product_template_id"];
            newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
            newSelectedProductData[index]["product_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["variant_name"] = selectVarient["product_name"];
            newSelectedProductData[index]["MRP"] = selectVarient["product_pricing_details"]["mrp"];
            newSelectedProductData[index]["sale_rate"] = selectVarient["product_pricing_details"]["sales_price"];
            newSelectedProductData[index]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
          }
          else if (key == "manual_discount_value") {
            console.log("hehe", value, index)
            newSelectedProductData[index]["manual_discount_value"] = value;
          }
          else if (key == "manual_discount_type") {
            console.log("select", value, key)
            newSelectedProductData[index]["manual_discount_type"] = value.label;
            newSelectedProductData[index]["manual_discount_type_id"] = value.value;
          }
          for (let i = 0; i < newSelectedProductData.length; i++) {
            if (newSelectedProductData[i]["manual_discount_type"] == "Flat Deduction") {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - Number(newSelectedProductData[i]["manual_discount_value"]))
            }
            if (newSelectedProductData[i]["manual_discount_type"] == "Flat Percentage") {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (Number(newSelectedProductData[i]["manual_discount_value"]) / 100)))
            }
          }
          console.log("newSelectedProductData19", newSelectedProductData)
          setAllProductsData(newSelectedProductData);
        }
      } else {
        var newMainData = mainData;
        newMainData[key] = value;
        setMainData(newMainData);
        if (!manualDiscount) {
          var newSelectedProductData = JSON.parse(
            JSON.stringify(allProductsData)
          );
          if (newSelectedProductData.length > 0) {
            if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
              for (let i = 0; i < newSelectedProductData.length; i++) {
                newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
              }
            }
            else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
              for (let i = 0; i < newSelectedProductData.length; i++) {
                newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
              }
            }
            setAllProductsData(newSelectedProductData);
          }
        }
        else if (manualDiscount) {
          var newSelectedProductData = JSON.parse(
            JSON.stringify(allProductsData)
          );
          for (let i = 0; i < newSelectedProductData.length; i++) {
            if (newSelectedProductData[i]["manual_discount_type"] == "Flat Deduction") {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - Number(newSelectedProductData[i]["manual_discount_value"]))
            }
            if (newSelectedProductData[i]["manual_discount_type"] == "Flat Percentage") {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (Number(newSelectedProductData[i]["manual_discount_value"]) / 100)))
            }
          }
          setAllProductsData(newSelectedProductData);

          // if (newSelectedProductData.length > 0) {
          //   if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
          //     for (let i = 0; i < newSelectedProductData.length; i++) {
          //       newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
          //     }
          //   }
          //   else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
          //     for (let i = 0; i < newSelectedProductData.length; i++) {
          //       newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
          //     }
          //   }
          //   setAllProductsData(newSelectedProductData);
          // }
        }
      }
    }

  };
  
  var condition_name = conditionsdata.find((o) => {
    if (o.id == mainData?.terms_conditions) {
      return o.display_name
    }
  })

  const handleButtonClick = (key) => {
    console.log("kk",key,manualDiscount,showallprods)


    if (key == "Create price list" || key =="Save_Send") {
      if (!manualDiscount) {
        console.log("firstcon")
        const payload = {
          discount_type_id: mainData?.selected_discount_type,
          discount_value: Number(mainData?.discount_value),
          promotional_status: true,
          is_applied_for_all: showallprods ? true : false,
          is_same_discount_for_all: manualDiscount ? false : true,
          promotional_details: {
            name: mainData?.promotion_name,
            start_date_and_time: mainData?.start_date_time,
            end_date_and_time: mainData?.end_date_time
          },

          other_details: {
            terms_and_conditions_id: Number(mainData?.terms_conditions),
            descriptions: condition_name?.display_name=="Upload Document"?uploadlinkdata?.link:mainData?.description,
            terms_and_condition: condition_name?.display_name ? condition_name?.display_name : ""

          },
          offer_product_details: showallprods ? allProductsData.map(o => {
            return {
              product_id: o?.product_id,
              product_template_id: o?.product_template_id,
              // product_variant_sku: o?.sku_id,
              // product_variant_name: o?.product_name,
              mrp: o?.MRP,
              sale_rate: o?.sale_rate,
              discount_type_id: mainData?.selected_discount_type,
              discounted_price: o?.discounted_price

            }
          }) : selectedProductData.map(o => {
            return {
              product_id: o?.product_id,
              product_template_id: o?.product_template_id,
              // product_variant_sku: o?.sku_id,
              // product_variant_name: o?.product_name,
              mrp: o?.MRP,
              sale_rate: o?.sale_rate,
              discount_type_id: mainData?.selected_discount_type,
              discounted_price: o?.discounted_price

            }
          }),
        }
        dispatch(CreateOffer(payload))
        history.push("/promotions")
      }
      else if (manualDiscount) {
        const payload = {
          discount_type_id: mainData?.selected_discount_type,
          discount_value: Number(mainData?.discount_value),
          promotional_status: true,
          is_applied_for_all: showallprods ? true : false,
          is_same_discount_for_all: manualDiscount ? false : true,
          promotional_details: {
            name: mainData?.promotion_name,
            start_date_and_time: mainData?.start_date_time,
            end_date_and_time: mainData?.end_date_time
          },

          other_details: {
            terms_and_conditions_id: Number(mainData?.terms_conditions),
            descriptions: condition_name?.display_name=="Upload Document"?uploadlinkdata?.link:mainData?.description,
            terms_and_condition: condition_name?.display_name ? condition_name?.display_name : ""

          },
          offer_product_details: showallprods ? allProductsData.map(o => {
            return {
              product_id: o?.product_id,
              product_template_id: o?.product_template_id,
              // product_variant_sku: o?.sku_id,
              // product_variant_name: o?.product_name,
              mrp: o?.MRP,
              sale_rate: o?.sale_rate,
              discount_type_id: o?.manual_discount_type_id,
              discounted_price: o?.discounted_price

            }
          }) : selectedProductData.map(o => {
            return {
              product_id: o?.product_id,
              product_template_id: o?.product_template_id,
              // product_variant_sku: o?.sku_id,
              // product_variant_name: o?.product_name,
              mrp: o?.MRP,
              sale_rate: o?.sale_rate,
              discount_type_id: o?.manual_discount_type_id,
              discounted_price: o?.discounted_price

            }
          }),
        }
        dispatch(CreateOffer(payload))
        history.push("/promotions")
      }
    }
    else if (key == "Cancel") {
      history.push("/promotions")
    }
  };

  const handelSelectonChange = (key, value, index = null) => {
    console.log("handelSelectonChange", key, value, manualDiscount, showallprods)
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    if (!manualDiscount) {
      if (!showallprods) {
        var newSelectedProductData = JSON.parse(
          JSON.stringify(selectedProductData)
        );
        if (newSelectedProductData.length > 0) {
          if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
            for (let i = 0; i < newSelectedProductData.length; i++) {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
              newSelectedProductData[i]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
            }
          }
          else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
            for (let i = 0; i < newSelectedProductData.length; i++) {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
              newSelectedProductData[i]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
            }
          }
          setSelectedProductData(newSelectedProductData);
        }
      }
      if (showallprods) {
        var newSelectedProductData = JSON.parse(
          JSON.stringify(allProductsData)
        );
        if (newSelectedProductData.length > 0) {
          if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
            for (let i = 0; i < newSelectedProductData.length; i++) {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
              newSelectedProductData[i]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
            }
          }
          else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
            for (let i = 0; i < newSelectedProductData.length; i++) {
              newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - (newSelectedProductData[i]["sale_rate"] * (mainData?.discount_value / 100)))
              newSelectedProductData[i]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
            }
          }
          setAllProductsData(newSelectedProductData);
        }
      }

    }
    else if (manualDiscount) {
      if (showallprods) {
        console.log("entered")
        var newSelectedProductData = JSON.parse(
          JSON.stringify(allProductsData)
        );
        if (newSelectedProductData.length > 0) {
          for (let i = 0; i < newSelectedProductData.length; i++) {
            newSelectedProductData[i]["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;
            newSelectedProductData[i]["discounted_price"] = Number(newSelectedProductData[i]["sale_rate"] - mainData?.discount_value)
          }
        }
        setAllProductsData(newSelectedProductData);

      }
    }
  }

  const setRadioType = (prop, value) => { };

  const handelCheckBoxonChange = (field) => {
  };

  useEffect(()=>{
console.log("mmm")
  },[mainData])
  const handelRadionButtononChange = (key, value) => {

    
    if (key == "terms_conditions") {
      var OldState = otherDetails.map((o) => {
        if (o.key == key)
          o.sub.map((p) => {
            if (p.value == value) p.checked = true;
            else p.checked = false;
            return p;
          });
        return o;
      });
      setotherDetails(OldState);
    }
    if (key == "select_for_2" && value == 4) {
      setmanualDiscount(true)
      if (showallprods) {
        var newSelectedProductData = JSON.parse(
          JSON.stringify(allProductsData)
        );
        for (let i = 0; i < newSelectedProductData.length; i++) {
          newSelectedProductData[i]["discounted_price"] = "";
          newSelectedProductData[i]["manual_discount_value"] = ""
        }
        setAllProductsData(newSelectedProductData);
      }
      if (!showallprods) {
        var newSelectedProductData = JSON.parse(
          JSON.stringify(selectedProductData)
        );
        for (let i = 0; i < newSelectedProductData.length; i++) {
          newSelectedProductData[i]["discounted_price"] = "";
          newSelectedProductData[i]["manual_discount_value"] = ""
        }
        setSelectedProductData(newSelectedProductData);
      }
    }
    if (key == "select_for_2" && value == 3) {
      setmanualDiscount(false)

    }
    if (key == "select_for_1" && value == 1) {

      setshowallprods(true)
      var allList = [];

      if (!manualDiscount) {
        console.log("jiji")
        for (let i = 0; i < productVariantData.length; i++) {
          var duplicateObject = { product_id: "", product_template_id: "", sku_id: "", product_name: "", variant_name: "", MRP: "", sale_rate: "", discount_type: "" };
          duplicateObject["product_id"] = productVariantData[i]["id"];
          duplicateObject["product_template_id"] = productVariantData[i]["product_template_id"];
          duplicateObject["sku_id"] = productVariantData[i]["sku_id"];
          duplicateObject["product_name"] = productVariantData[i]["product_name"];
          duplicateObject["variant_name"] = productVariantData[i]["product_name"];
          duplicateObject["MRP"] = productVariantData[i]["product_pricing_details"]["mrp"];
          duplicateObject["sale_rate"] = productVariantData[i]["product_pricing_details"]["sales_price"];
          duplicateObject["discount_type"] = discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name;

          if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Deduction") {
            duplicateObject["discounted_price"] = Number(productVariantData[i]["product_pricing_details"]["sales_price"] - mainData?.discount_value)
          }
          else if (discountTypedata.find((o) => o?.id == mainData?.selected_discount_type)?.display_name == "Flat Percentage") {
            duplicateObject["discounted_price"] = Number(productVariantData[i]["product_pricing_details"]["sales_price"] * (mainData?.discount_value / 100))
          }
          allList.push(duplicateObject)
          duplicateObject = {}
        }
      }
      else if (manualDiscount) {
        console.log("lolo")
        for (let i = 0; i < productVariantData.length; i++) {
          var duplicateObject = { product_id: "", product_template_id: "", sku_id: "", product_name: "", variant_name: "", MRP: "", sale_rate: "", discount_type: "" };
          duplicateObject["product_id"] = productVariantData[i]["id"];
          duplicateObject["product_template_id"] = productVariantData[i]["product_template_id"];
          duplicateObject["sku_id"] = productVariantData[i]["sku_id"];
          duplicateObject["product_name"] = productVariantData[i]["product_name"];
          duplicateObject["variant_name"] = productVariantData[i]["product_name"];
          duplicateObject["MRP"] = productVariantData[i]["product_pricing_details"]["mrp"];
          duplicateObject["sale_rate"] = productVariantData[i]["product_pricing_details"]["sales_price"];
          duplicateObject["manual_discount_type"] = "";
          duplicateObject["manual_discount_value"] = "";
          allList.push(duplicateObject)
          duplicateObject = {}
        }
      }
      setAllProductsData(allList);

    }
    else if (key == "select_for_1" && value == 2) {
      setshowallprods(false)
      setSelectedProductData([
      ]);
    }

    if(key=="terms_conditions"){
      console.log("v",value)
      if(value==748){
       console.log("huuu")
       setotherDetails([...otherDetails,
       {
         label: "Upload Document",
         type: "file_upload",
         key: "Upload_terms",
         buttonLabel: "Upload",
       
       }])
       console.log("otherDetails",otherDetails)
      }
      else if(value==749){
        console.log("huuu")
        if(otherDetails.length===3){
          setotherDetails(otherDetails.slice(0, -1))
        }
       }
     }
     

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const handleDateAndTime = (key, value) => {
    if (key == "start_date_time") {
      var newSchedule_Pickup_date_and_time = PromotionDetailFields.map(o => { if (o.key == "start_date_time") o.value = new Date(value); return o; });
      setPromotionDetailFields(newSchedule_Pickup_date_and_time)
    }
    else if (key == "end_date_time") {
      var newSchedule_Pickup_date_and_time = PromotionDetailFields.map(o => { if (o.key == "end_date_time") o.value = new Date(value); return o; });
      setPromotionDetailFields(newSchedule_Pickup_date_and_time)
    }
    var date1 = new Date(value);
    var todaysDate = date1.toISOString();
    var newMainData = mainData;
    newMainData[key] = todaysDate;
    setMainData(newMainData);
  }

  return (
    <Box>
      <AddForm
        header={"Promotion Details"}
        data={PromotionDetailFields.map((field) => {
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
        handleDateAndTime={handleDateAndTime}
      />


      <Box className="promotionCreate-productsBlock">
        <div className="promotionCreate-Header">Select products</div>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "53%",
            gap: "10px",
          }}
        >
          {extraFields.map((field) => {
            return field.type == "input" ? (

              <MatInput
                disabled={field?.disabled}
                required={field?.required}
                minLength={field?.minLength ? field?.minLength : ""}
                maxLength={field?.maxLength ? field?.maxLength : ""}
                errorMessage={field.errorMessage ? field.errorMessage : ""}
                type={field?.type}
                label={field?.label}
                name={field?.label}
                value={field?.value}
                placeholder={`Enter ${field?.label}`}
                onChange={(e) => {
                  handelInputChange(field?.key, e?.target?.value, field?.id);
                }}
              />
            ) : field.type == "select" ? (
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteSelect
                    required={field.required}
                    label={field.label}
                    placeholder={`Select ${field.label}`}
                    data={field.data}
                    onChange={(e, value) => {
                      handelSelectonChange(field.key, value.value, value.label);
                    }}
                    value={field.value}
                    // staticFields={staticFields}
                    // setStaticFields={setStaticFields}
                    errorMessage={""}
                  />
                </RemoteWrapper>
              </Suspense>
            ) : (<></>);
          })}
        </Box>
        <div className="promotionCreate-radio_wrapper">
          {productsDetailFields.map((o) => {
            return (
              <FormControl className="promotionCreate-FormControl">
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  style={{ display: "flex", gap: "3px" }}
                >
                  {o?.label}{" "}
                  {o?.required ? <div style={{ color: "red" }}>*</div> : null}
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={o?.sub[0]?.value}
                  onChange={(e) => {
                    handelRadionButtononChange(o?.key, e.target.value);
                  }}
                >
                  {o?.sub.map((e) => {
                    return (
                      <FormControlLabel
                        className="promotionCreate-radiobuttons"
                        value={e?.value}
                        control={<Radio />}
                        label={e?.label}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            );
          })}
        </div>
        {showallprods == true ? (

          <AddForm_Table
            headCells={allHeadCells}
            table_data={allProductsData}
            handelInputChange={handelInputChange}
            handelSelectonChange={handelSelectonChange}
            header={""}
            renderFooter={() => (
              <center style={{ marginTop: 10 }}>
                {/* <Link onClick={onAddNewRaw} underline="none">
                  + Add Product1 Line
                </Link> */}
              </center>
            )}
          />
        ) : (

          <AddForm_Table
            headCells={headCells}
            table_data={selectedProductData}
            handelInputChange={handelInputChange}
            handelSelectonChange={handelSelectonChange}
            header={""}
            renderFooter={() => (
              <center style={{ marginTop: 10 }}>
                <Link onClick={onAddNewRaw} underline="none">
                  + Add Product Line
                </Link>
              </center>
            )}
          />
        )
        }


      </Box>

      <AddForm
        header={"Other Details"}
        data={otherDetails.map((field) => {
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
        handelRadionButtononChange={handelRadionButtononChange}
        setfileUpload={setfileUpload}
        handleFileUpload={handleFileUpload}
      />
      

      <AddFormFooter_Button
        buttonLabel="Create new Offer"
        handleButtonClick={handleButtonClick}
      />
    </Box>
  );
}

export default PromotionsCreate;

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
