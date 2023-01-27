import React, { useEffect, useState } from "react";
import { LabeledText as RemoteViewTextField } from "./LabeledText";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  save_product_details,
  load_hsn_codes,
  load_channel_type,
  load_categories,
} from "../../redux/Actions/action";
import MatSelect from "Remote/MatDropDown";

import "./style.css";
export default function View({ productData, setStep }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [selectedVarient, setSelectedVarient] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const [subCategories, setsubCategories] = useState([]);

  const [editOptions, setEditOPtions] = useState({
    title: true,
    price: true,
    product_details: true,
    color: true,
  });

  // console.log("productData", productData);

  const {
    productDetails,
    hsnCodesData,
    channelTypeData,
    categoryTypeData,
  } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(load_categories());
    dispatch(load_channel_type());
    dispatch(load_hsn_codes());
  }, []);

  // const [reducerData, setreducerData] = useState([
  //   {
  //     display_name: false,
  //     key: "barcode",
  //     value: "",
  //   },
  //   {
  //     display_name: "Item Dimensions",
  //     key: "Item_Dimensions",
  //     value: "LxWxH	10.8 x 12.1 x 6.7 Centimeters",
  //   },
  //   {
  //     display_name: false,
  //     key: "package_height",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "package_length",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "package_weight",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "package_width",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "volumetric_weight",
  //     value: "",
  //   },
  //   {
  //     display_name: "MEureka Men's t-shirt",
  //     key: "product_name",
  //     value:
  //       "Fresho Apple - Royal Gala 4 pcs + Apple - Kinnaur 4 pcs, Combo 2 Items",
  //   },
  //   {
  //     display_name: false,
  //     key: "brand_name",
  //     value: "Fresho",
  //   },
  //   {
  //     display_name: false,
  //     key: "image",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "cost_price",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "currency_code",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "parent_sku_id",
  //     value: "",
  //   },
  //   {
  //     display_name: "SKU ID",
  //     key: "sku_id",
  //     value: "SKU/011",
  //   },
  //   {
  //     display_name: false,
  //     key: "material_quantity",
  //     value: "",
  //   },
  //   {
  //     display_name: false,
  //     key: "hsn_code",
  //     value: "",
  //   },
  //   {
  //     display_name: "Price",
  //     key: "sales_price",
  //     value: "999.00",
  //   },
  //   {
  //     display_name: false,
  //     key: "description",
  //     value:
  //       "Fresho is our brand of fresh fruits and vegetables which are individually handpicked everyday by our experienced and technically competent buyers. Our buying, storing and packaging processes are tailored to ensure that only the fresh, nutrient dense, healthy and delicious produce reaches your doorstep. We guarantee the quality of all Fresho products. If you're not satisfied with the freshness of the items, you can hand them back to our Customer Experience Executive (CEE) for a full refund. Royal gala apples are bright red, thin skinned, white fleshed fruits with a mild sweet flavour and are native to New Zealand.   Product image shown is for representation purpose only, the actually product may vary based on season, produce &amp; availability.  Click here for delicious fruit recipes -    Fresho is our brand of fresh fruits and vegetables which are individually handpicked everyday by our experienced and technically competent buyers. Our buying, storing and packaging processes are tailored to ensure that only the fresh, nutrient dense, healthy and delicious produce reaches your doorstep. We guarantee the quality of all Fresho products. If you're not satisfied with the freshness of the items, you can hand them back to our Customer Experience Executive (CEE) for a full refund. Royal gala apples are bright red, thin skinned, white fleshed fruits with a mild sweet flavour and are native to New Zealand.   Product image shown is for representation purpose only, the actually product may vary based on season, produce &amp; availability.  Click here for delicious fruit recipes -   ",
  //   },
  //   {
  //     display_name: false,
  //     key: "mrp",
  //     value: "",
  //   },
  // ]);

  //----------------------------------If api hit and data recieved--------------------------------------------------

  // useEffect(() => {
  //   if (productDetails.length != 0) {
  //     var temp = productDetails.map((o) => {
  //       return {
  //         display_name: o?.display_name,
  //         key: o?.name,
  //         value: o?.value,
  //       };
  //     });

  //     setreducerData(temp);
  //     // console.log("temp", temp);
  //     setProductData({
  //       title: temp?.find((o) => o?.key == "product_name")?.value,
  //       varients: [
  //         {
  //           price: temp?.find((o) => o?.key == "sales_price")?.value,
  //           // color: "Sky Blue",
  //           product_details: temp?.filter(
  //             (o) => o?.key != "product_name" && o?.key != "images"
  //           ),
  //           image_catalog:
  //             temp?.find((o) => o?.key == "image")?.value?.length > 0
  //               ? temp?.find((o) => o?.key == "image")?.value
  //               : [
  //                   "https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg",
  //                   "https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg",
  //                   "https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg",
  //                   "https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg",
  //                 ],
  //           //random images
  //           // [
  //           //     "https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg",
  //           //     "https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg",
  //           //     "https://www.massalliance.org/wp-content/uploads/2020/11/cropped-placeholder.jpg",
  //           //     "https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-portrait.jpg",
  //           //   ],
  //           //random shirt images
  //           // [
  //           //     "https://rukminim1.flixcart.com/image/832/832/kzegk280/t-shirt/u/r/c/s-6-triptee-original-imagbf8yurpzqe7h.jpeg?q=70",
  //           //     "https://rukminim1.flixcart.com/image/832/832/kzegk280/t-shirt/e/p/v/m-3-triptee-original-imagbf7htpz4sbpm.jpeg?q=70",
  //           //     "https://rukminim1.flixcart.com/image/832/832/kzegk280/t-shirt/v/a/d/s-6-triptee-original-imagbf8ym6gffzhz.jpeg?q=70",
  //           //     "https://rukminim1.flixcart.com/image/832/832/kzegk280/t-shirt/g/n/i/s-6-triptee-original-imagbf8ypvybxu62.jpeg?q=70",
  //           //   ],
  //         },
  //       ],
  //     });

  //     // console.log("product_Data", product_Data);
  //   }
  // }, [productDetails]);

  // console.log("reducerData", reducerData);

  // console.log(
  //   reducerData.sort((a, b) => (a.key > b.key ? 1 : -1)),
  //   "sorted___"
  // );

  //----------------------------If you want to map the key values as payload in product details---------------------------
  // var temp123 = [];
  // Object.keys(productData).forEach((e) => {
  //   temp123 = [
  //     ...temp123,
  //     {
  //       display_name: false,
  //       key: e,
  //       value: productData[e],
  //     },
  //   ];
  // });

  const [reducerData, setreducerData] = useState([
    {
      display_name: false,
      key: "brand_name",
      value: productData?.brand_owner_name,
    },
    {
      display_name: "SKU ID",
      key: "sku_id",
      value: productData?.id,
    },
    {
      display_name: false,
      key: "channel_type",
      value: "",
    },
    {
      display_name: false,
      key: "description",
      value: productData?.long_desc,
    },
    {
      display_name: false,
      key: "category",
      value: "",
    },
    {
      display_name: false,
      key: "sub_category",
      value: "",
    },
    {
      display_name: false,
      key: "barcode",
      value: "",
    },
    {
      display_name: "Item Dimensions",
      key: "Item_Dimensions",
      value: "",
    },
    {
      display_name: false,
      key: "package_height",
      value: "",
    },
    {
      display_name: false,
      key: "package_length",
      value: "",
    },
    {
      display_name: false,
      key: "package_weight",
      value: "",
    },
    {
      display_name: false,
      key: "package_width",
      value: "",
    },
    {
      display_name: false,
      key: "volumetric_weight",
      value: "",
    },
    {
      display_name: false,
      key: "cost_price",
      value: productData?.value,
    },
    {
      display_name: false,
      key: "currency_code",
      value: "",
    },
    {
      display_name: false,
      key: "material_quantity",
      value: "",
    },
    {
      display_name: false,
      key: "hsn_code",
      value: "",
    },
    // {
    //   display_name: false,
    //   key: "mrp",
    //   value: "",
    // },
  ]);

  const [product_Data, setProductData] = useState({
    title: productData?.name,
    varients: [
      {
        price: productData?.value,
        // color: "Sky Blue",
        product_details: reducerData?.filter(
          o => o?.key != "product_name" && o?.key != "images"
        ),
        image_catalog:
          productData?.images.length > 0 &&
          productData?.images.split(",").length > 0
            ? productData?.images.split(",").length >= 4
              ? productData?.images.split(",").slice(0, 4)
              : productData?.images
                  .split(",")
                  .slice(0, productData?.images.split(",").length)
            : ["https://dev-api.eunimart.com/files/images/default_img.jpg"],
      },
    ],
  });

  const [dummy, setDummy] = useState(0);

  useEffect(() => {
    // console.log("------updated-------");
    // console.log(product_Data?.varients[selectedVarient], "asdfgjhgfdsa");
  }, [product_Data]);

  const handelInput = (key, value, index, sub_key, brefing_index) => {
    // console.log(
    //   "key : ",
    //   key,
    //   "value : ",
    //   value,
    //   "index : ",
    //   index,
    //   "sub_key : ",
    //   sub_key,
    //   "brefing_index : ",
    //   brefing_index
    // );
    const newProductData = product_Data;
    if (index === undefined) {
      newProductData[key] = value;
    } else {
      if (key != "product_details") {
        if (key == "color") newProductData.varients[index]["color"] = value;
        else if (key == "price")
          // newProductData.varients[index]["price"] = value.split("₹").slice(-1);
          newProductData.varients[index]["price"] = value
            .split("₹")
            .slice(-1)[0];
        else if (key === "brefing") {
          newProductData.varients[index]["brefing"][brefing_index] = value;
        }
      } else if (key === "product_details") {
        var temp = newProductData.varients[index].product_details;
        temp = temp.map(o => {
          if (o.key == sub_key) {
            o = { ...o, value: value };
          }
          return o;
        });
        newProductData.varients[index].product_details = temp;
      }
    }
    // console.log("sampleData", newProductData);
    setProductData(newProductData);
    setDummy(dummy + 1);

    var newMainData = mainData;
    newMainData[sub_key] = value;
    setMainData(newMainData);
    // console.log("newMainData",newMainData);

    if (
      newMainData?.barcode != null &&
      newMainData?.barcode.length != 0 &&
      newMainData?.Item_Dimensions != null &&
      newMainData?.Item_Dimensions.length != 0 &&
      newMainData?.package_height != null &&
      newMainData?.package_height.length != 0 &&
      newMainData?.package_length != null &&
      newMainData?.package_length.length != 0 &&
      newMainData?.package_weight != null &&
      newMainData?.package_weight.length != 0 &&
      newMainData?.package_width != null &&
      newMainData?.package_width.length != 0 &&
      newMainData?.volumetric_weight != null &&
      newMainData?.volumetric_weight.length != 0 &&
      newMainData?.currency_code != null &&
      newMainData?.currency_code.length != 0 &&
      newMainData?.material_quantity != null &&
      newMainData?.material_quantity.length != 0 &&
      newMainData?.channel_type != null &&
      newMainData?.category != null &&
      newMainData?.sub_category != null &&
      newMainData?.hsn_code != null
    ) {
      setisValidated(false);
    } else {
      setisValidated(true);
    }
  };

  const [isValidated, setisValidated] = useState(true);

  const [mainData, setMainData] = useState({});

  const handelSelectonChange = (key, value) => {
    // console.log("key", key, "value", value);
    if (key == "category") {
      let tempSubCategories = categoryTypeData.find(
        o => o?.name == value?.label
      )?.child_ids;
      tempSubCategories = tempSubCategories.map(o => {
        return {
          id: o?.id,
          label: o?.name,
        };
      });
      setsubCategories(tempSubCategories);
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    if (
      newMainData?.barcode != null &&
      newMainData?.barcode.length != 0 &&
      newMainData?.Item_Dimensions != null &&
      newMainData?.Item_Dimensions.length != 0 &&
      newMainData?.package_height != null &&
      newMainData?.package_height.length != 0 &&
      newMainData?.package_length != null &&
      newMainData?.package_length.length != 0 &&
      newMainData?.package_weight != null &&
      newMainData?.package_weight.length != 0 &&
      newMainData?.package_width != null &&
      newMainData?.package_width.length != 0 &&
      newMainData?.volumetric_weight != null &&
      newMainData?.volumetric_weight.length != 0 &&
      newMainData?.currency_code != null &&
      newMainData?.currency_code.length != 0 &&
      newMainData?.material_quantity != null &&
      newMainData?.material_quantity.length != 0 &&
      newMainData?.channel_type != null &&
      newMainData?.category != null &&
      newMainData?.sub_category != null &&
      newMainData?.hsn_code != null
    ) {
      setisValidated(false);
    } else {
      setisValidated(true);
    }
  };

  const handleButtonClick = () => {
    // console.log("product_Data", product_Data);

    let productTempData = product_Data?.varients[0]?.product_details;

    var keyValuePairMainData = {};
    productTempData.map(o => {
      if (o.key != null) {
        keyValuePairMainData[o.key] = o.value;
      }
    });
    // console.log("keyValuePairMainData", keyValuePairMainData);
    //  setMainData(keyValuePairMainData);

    var payload = {
      description: {
        data: keyValuePairMainData?.description
          ? keyValuePairMainData?.description
          : "",
      },
      product_name: product_Data?.title ? product_Data?.title : "",

      sku_code: keyValuePairMainData?.sku_id
        ? keyValuePairMainData?.sku_id
        : "",
      hsn_code: mainData?.hsn_code?.label,
      channel_code: `${mainData?.channel_type?.id}`,
      channel: mainData?.channel_type?.label,
      // category_id: mainData?.category?.id,
      // category: mainData?.category,
      // leaf_category_id: mainData?.sub_category?.id,
      // leaf_category: mainData?.sub_category,
      primary_category_id: mainData?.category?.id,
      secondary_category_id: mainData?.sub_category?.id,

      image_options: product_Data?.varients[0]?.image_catalog.map(link => {
        return {
          link: link,
          type: "image/jpeg",
        };
      }),

      product_pricing_details: {
        sales_price: keyValuePairMainData?.cost_price
          ? parseFloat(keyValuePairMainData?.cost_price)
          : 0,
        cost_price: keyValuePairMainData?.cost_price
          ? parseFloat(keyValuePairMainData?.cost_price)
          : 0,
        mrp: product_Data?.varients[0]?.price
          ? parseFloat(product_Data?.varients[0]?.price)
          : 0,
        tax_options: 12,
      },
      package_dimensions: {
        packaging_type: "Shredded wool",
        package_length: keyValuePairMainData?.package_length
          ? keyValuePairMainData?.package_length
          : "",
        volumetric_weight: keyValuePairMainData?.volumetric_weight
          ? keyValuePairMainData?.volumetric_weight
          : "",
        package_width: keyValuePairMainData?.package_width
          ? keyValuePairMainData?.package_width
          : "",
        package_height: keyValuePairMainData?.package_height
          ? keyValuePairMainData?.package_height
          : "",
        package_weight: keyValuePairMainData?.package_weight
          ? keyValuePairMainData?.package_weight
          : "",
      },
    };
    dispatch(save_product_details(payload));
    navigate("/dashboard");
  };

  return (
    <>
      <div className="page_container center">
        <h3 className="page_title" style={{ alignSelf: "start" }}>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={() => {
              // handleDeleteButton(o?.id);
              setStep(0);
            }}
          >
            <ArrowBackIcon style={{ color: "#5D5D5D" }} />
          </IconButton>
          Product
        </h3>
        {/* <button>TEST</button> */}
        <div
          style={{
            background: "#ffffff",
            height: "85vh",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
            paddingRight: "1vw",
            width: "100vw",
          }}
        >
          <div className="product_dispaly center">
            <div className="product_img_board">
              <div className="product_catalog">
                {product_Data?.varients[selectedVarient]?.image_catalog?.map(
                  (item, index) => {
                    return (
                      <div
                        style={{
                          height: "95px",
                          minHeight: "95px",
                          width: "95px",
                          background: "white",
                          borderRadius: "10px",
                          overflow: "hidden",
                          border:
                            selectedImage == index
                              ? "3px solid blue"
                              : "2px solid black",
                        }}
                        onClick={() => {
                          setSelectedImage(index);
                          // console.log(selectedImage);
                        }}
                        className="center"
                      >
                        <img src={item} style={{ height: "100%" }} />

                        {/* <div className="viewList" style={{backgroundImage:`url(${item})`}}>
                                            </div> */}
                      </div>
                    );
                  }
                )}
              </div>
              <div className="product_view center">
                <img
                  src={
                    product_Data?.varients[selectedVarient]?.image_catalog[
                      selectedImage
                    ]
                  }
                  style={{
                    // height: "100%",
                    // width: "inherit",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    height: "auto",
                    width: "auto",
                  }}
                />
              </div>
            </div>

            <div className="product_Details">
              <div className="product_name">
                {editOptions.title && (
                  <h1 className="title_heading">{product_Data?.title}</h1>
                )}
                {!editOptions.title && (
                  <RemoteViewTextField
                    card
                    label={""}
                    text={product_Data?.title}
                    disabled_y={editOptions.title}
                    name="title"
                    onInputChange={handelInput}
                  />
                )}
                <div className="edit">
                  <ModeEditOutlineOutlinedIcon
                    onClick={() => {
                      // console.log("clicked");
                      setEditOPtions({
                        ...editOptions,
                        title: !editOptions.title,
                      });
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="product_price">
                  <RemoteViewTextField
                    card
                    label={""}
                    text={`₹${product_Data?.varients[selectedVarient]?.price}`}
                    disabled_y={editOptions.price}
                    name="price"
                    onInputChange={handelInput}
                    varient_index_no={selectedVarient}
                  />
                  <div className="edit">
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => {
                        // console.log("clicked");
                        setEditOPtions({
                          ...editOptions,
                          price: !editOptions.price,
                        });
                      }}
                    />
                  </div>
                </div>
                Inclusive of all taxes
              </div>

              <div className="product_varient_selector">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoteViewTextField
                    card
                    label={""}
                    text={`${
                      product_Data?.varients[selectedVarient]?.color
                        ? product_Data?.varients[selectedVarient]?.color
                        : ""
                    }`}
                    disabled_y={editOptions.color}
                    name="color"
                    onInputChange={handelInput}
                    varient_index_no={selectedVarient}
                  />
                  <div className="edit">
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => {
                        // console.log("clicked");
                        setEditOPtions({
                          ...editOptions,
                          color: !editOptions.color,
                        });
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "2vw" }}>
                  {product_Data?.varients?.map((varient, index) => {
                    return (
                      <>
                        <div
                          style={{
                            height: "95px",
                            minHeight: "95px",
                            width: "95px",
                            background: "white",
                            borderRadius: "10px",
                            overflow: "hidden",
                            border:
                              selectedImage == index
                                ? "3px solid blue"
                                : "2px solid black",
                          }}
                          onClick={() => {
                            setSelectedVarient(index);
                            // console.log(selectedImage);
                          }}
                        >
                          <div
                            style={{
                              background: `url(${varient.image_catalog[0]})`,
                              minHeight: "95px",
                              height: "90px",
                              width: "90px",
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                              aspectRatio: "1/1",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="product_details_classification">
                <div
                  className="product_Details_title"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Product details{" "}
                  <div className="edit">
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => {
                        // console.log("Imtheclicked");
                        setEditOPtions({
                          ...editOptions,
                          product_details: !editOptions.product_details,
                        });
                      }}
                    />
                  </div>
                </div>
                {product_Data?.varients[selectedVarient]?.product_details?.map(
                  item => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "20px",
                        }}
                      >
                        <div
                          className="product_Details_title_feilds"
                          style={{ width: "30%" }}
                        >
                          {item.key}
                        </div>

                        {item.key == "hsn_code" ||
                        item.key == "channel_type" ||
                        item.key == "category" ||
                        item.key == "sub_category" ? (
                          <MatSelect
                            // style={{ height: "55px" }}
                            disabled={false}
                            data={
                              item.key == "hsn_code"
                                ? hsnCodesData.map(o => {
                                    return {
                                      id: o?.id,
                                      label: o?.hsn_code,
                                    };
                                  })
                                : item.key == "channel_type"
                                ? channelTypeData.map(o => {
                                    return {
                                      id: o?.id,
                                      label: o?.name,
                                    };
                                  })
                                : item.key == "category"
                                ? categoryTypeData.map(o => {
                                    return {
                                      id: o?.id,
                                      label: o?.name,
                                    };
                                  })
                                : item.key == "sub_category"
                                ? subCategories
                                : []
                            }
                            fieldKey="hsn_code"
                            onChange={(e, value) => {
                              handelSelectonChange(item.key, value);
                            }}
                            // value={mainSearchData?.label}
                            placeholder={
                              item.key == "hsn_code"
                                ? "Select Hsn code"
                                : item.key == "channel_type"
                                ? "Select channel type"
                                : item.key == "category"
                                ? "Select category"
                                : item.key == "sub_category"
                                ? "Select sub category"
                                : ""
                            }
                          />
                        ) : (
                          <RemoteViewTextField
                            card
                            label={""}
                            text={`${item.value}`}
                            disabled_y={editOptions.product_details}
                            name="product_details"
                            onInputChange={handelInput}
                            varient_index_no={selectedVarient}
                            sub_key={item.key}
                          />
                        )}

                        {/* <div className="product_Details_title_feilds" style={{width:"80%"}}>{item.value}</div> */}
                      </div>
                    );
                  }
                )}
              </div>

              <div className="product_spec_lines">
                {product_Data?.varients[selectedVarient]?.brefing?.map(
                  (line, ind) => {
                    return (
                      <div style={{ display: "flex", alignItems: "baseline" }}>
                        <li></li>
                        <RemoteViewTextField
                          card
                          label={""}
                          text={line}
                          disabled_y={editOptions.product_details}
                          name="brefing"
                          onInputChange={handelInput}
                          varient_index_no={selectedVarient}
                          // sub_key={item.key}
                          brefing_index={ind}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        <Button
          disabled={isValidated}
          // style={{ color: isValidated ? "white" : "black" }}
          style={{
            backgroundColor: isValidated ? "lightgrey" : "#001661",
          }}
          className="add_to_cat_btn center"
          onClick={() => {
            handleButtonClick();
          }}
        >
          Add to Catalog
        </Button>
      </div>
    </>
  );
}

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