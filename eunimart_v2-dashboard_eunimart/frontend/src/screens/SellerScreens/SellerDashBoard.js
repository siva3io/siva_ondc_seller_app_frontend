import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import MyWork from "./MyWork";
import "./MainPage.css";
import OrdersCard from "./OrdersCard";
import CloseIcon from "@mui/icons-material/Close";
import AppCards from "../ApplicationScreens/CardDesign";
import { loadOrderData } from "../../redux/Actions/action";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import OrderOverview from "./OrderOverview";
import ModalViewV2 from "./Model2";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  createTheme,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BusinessMetrics from "./BusinessMetrics";
import Reports from "./Reports";
import Goals from "./Goals";
import Widgets from "./Widgets";
import PropTypes from "prop-types";

import { Product_Search_API } from "../../redux/Actions/action";

const SellerDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const data = {
    id: "QIXT84MBsSo6iBSYR5P8",
    provider_id: {
      $oid: "636c9b79c3f78ffbc96bc113",
    },
    descriptor: {
      name: "Arrow Men Shirt",
      symbol:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/0bc9b94e-96ea-4e7d-b058-0e55c883c62c.__CR0,156,2503,751_PT0_SX600_V1___.png",
      short_desc:
        "This shirt by Arrow is a must have item in every guys wardrobe. To ensure all day long comfort, it's made from fluid fabric and has long sleeves. Whether it be a brunch date or an office meeting, style this pair with a slim fit denims or trousers and loafers.",
      long_desc:
        "Since 1851, Arrow has been the authority in dressing gentlemen with a New York point of view, with its unmistakable premium elegance. With its heritage of innovation, Arrow has introduced the detachable collar, launched trousers with the adjustable waistbands and brought wrinkle-free, stain-free concepts to clothing. Today, Arrow has an interesting formal range that suits corporates with legacy, a stylish yet relaxed work wear for digital space honchos and cool young fashion for fired up Start-up founders working from coffee shops and co-working spaces. Every piece of clothing is designed to reflect the confident persona of the Arrow man with interesting self-expression in every elegant detail of the premium garment",
      images: [
        "https://m.media-amazon.com/images/I/81PbJp1B01L._UX466_.jpg",
        "https://m.media-amazon.com/images/I/81zXDnlFlHL._UX466_.jpg",
        "https://m.media-amazon.com/images/I/81DHih4-wkL._UX466_.jpg",
        "https://m.media-amazon.com/images/I/71-3hR4p2EL._UX466_.jpg",
      ],
    },
    quantity: {
      available: {
        count: "1",
      },
      maximum: {
        count: "2",
      },
    },
    price: {
      currency: "INR",
      value: "899.0",
      maximum_value: "1999.0",
    },
    category_id: "Fashion",
    fulfillment_id: "1",
    is_returnable: true,
    is_cancellable: true,
    return_window: "P7D",
    is_seller_pickup_return: true,
    time_to_ship: "PT45M",
    is_available_on_cod: true,
    contact_details_consumer_care:
      "Arvind Fashions Ltd, Duparc Trinity Bengaluru 5600",
    statutory_reqs_packaged_commodities: {
      manufacturer_or_packer_name: "Arvind Fashions Ltd",
      manufacturer_or_packer_address:
        "Arvind Fashions Ltd, Duparc Trinity Bengaluru 560001",
      common_or_generic_name_of_commodity: "Slim Fit Shirt",
      net_quantity_or_measure_of_commodity_in_pkg: "1",
      month_year_of_manufacture_packing_import: "08/2022",
    },
    statutory_reqs_prepackaged_food: {
      nutritional_info: "",
      additives_info: "",
      brand_owner_FSSAI_license_no: "",
      other_FSSAI_license_no: "",
      importer_FSSAI_license_no: "",
    },
    mandatory_reqs_veggies_fruits: {
      net_quantity: "100g",
    },
    tags: {
      product_type: "Casual Shirts",
      brand_name: "Arrow",
      color: "white",
      gender: "male",
      size: "L",
      country_of_origin: "India",
    },
    location: {
      gps: "12.9492953,77.7019878",
      address: {
        door: "B005 aaspire heights",
        name: "33rd Cross Road, Vinayaka Layout",
        locality: "33rd Cross Road, Vinayaka Layout",
        city: "Bengaluru",
        state: "Karnataka",
        country: "IND",
        area_code: "560037",
      },
    },

    quote: {
      price: {
        currency: "INR",
        value: "5.0",
      },
      breakup: [
        {
          title: "Delivery charges",
          "“@ondc/org/title_type”": " “delivery”",
          price: {
            currency: "INR",
            value: "0.0",
          },
        },
        {
          title: "Packing charges",
          "“@ondc/org/title_type”": "“packing”",
          price: {
            currency: "INR",
            value: "0.0",
          },
        },
        {
          title: "Tax",
          "“@ondc/org/title_type”": "“tax”",
          price: {
            currency: "INR",
            value: "0.0",
          },
        },
      ],
    },
  };
  recurr();

  var body = {
    context: {
      cityCode: "std:040",
    },
    message: {
      criteria: {
        search_string: "shirt",
        delivery_location: "17.440463, 78.446562",
      },
    },
  };

  function recurr() {
    const source = new EventSource(
      `https://ondc.eunimart.com/api/v1/ondc/events?messageId=bppEunimartOrderConfirmSivaOndc`
    );
    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("on_confirm", (e) => {
      const data = JSON.parse(e.data);
      console.log("temp123123", data);
      setOrdersView(true);
      source.close();
      recurr();
    });

    // console.log("combinedData", combinedData);

    source.addEventListener("error", (e) => {
      // console.error("Error: ", e);
      source.close();
      recurr();
    });
  }

  // return () => {
  //   source.close();
  // };

  const [ordersView, setOrdersView] = useState(false);
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });

  useEffect(() => {
    dispatch(loadOrderData(params)); //for data in view orders
  }, [params]);

  const productData = [
    {
      Image: "https://dev-api.eunimart.com/files/images/logistics.png",
      Name: "Start Marketing",
      textColor: "#001661",
    },
    {
      Image:
        "https://dev-api.eunimart.com/files/images/operation_solutions.png",
      Name: "Acquire Customer",
      textColor: "#001661",
    },
    {
      Image: "https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png",
      Name: "Reconcile Payments",
      textColor: "#001661",
    },
  ];

  let { orderData } = useSelector((state) => state.data);
  // console.log("orderdata is", orderData);

  var displayOrderData = orderData;

  // orderData = [
  //   {
  //     orderno: "#SO-0000001",
  //     buttonname: "closed",
  //     lineitemCount: 52,
  //     location: "Bhud Bihar",
  //     channelName: "Retail",
  //     createdDate: "12-12-2021",
  //     amount: "2000 INR",
  //     sellerCount: 5,
  //   },
  //   {
  //     orderno: "#SO-0000001",
  //     buttonname: "closed",
  //     lineitemCount: 52,
  //     location: "Bhud Bihar",
  //     channelName: "Retail",
  //     createdDate: "12-12-2021",
  //     amount: "2000 INR",
  //     sellerCount: 5,
  //   },
  //   {
  //     orderno: "#SO-0000001",
  //     buttonname: "closed",
  //     lineitemCount: 52,
  //     location: "Bhud Bihar",
  //     channelName: "Retail",
  //     createdDate: "12-12-2021",
  //     amount: "2000 INR",
  //     sellerCount: 5,
  //   },
  //   {
  //     orderno: "#SO-0000001",
  //     buttonname: "closed",
  //     lineitemCount: 52,
  //     location: "Bhud Bihar",
  //     channelName: "Retail",
  //     createdDate: "12-12-2021",
  //     amount: "2000 INR",
  //     sellerCount: 5,
  //   },
  // ];
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          scroller: {
            background: "transparent",
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
        },
      },
    },
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewAppStore = () => {
    // console.log("view app store fun");
  };

  const handleAddProduct = () => {
    // console.log("Add product fun");
    navigate("/createProduct");
  };

  const handleViewOrders = () => {
    // console.log("handleViewOrders");
    setOrdersView(true);
    // console.log(ordersView);
  };

  const handleCloseOrdersView = () => {
    setOrdersView(false);
  };

  const [displayName, setdisplayName] = useState("Seller");
  // localStorage.setItem("user_data", JSON.stringify({ name: "Shayak" }));

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data?.name) {
      setdisplayName(user_data?.name);
    }
  }, []);

  return (
    <div style={{ background: "#F3F3F3" }}>
      <ThemeProvider theme={theme}>
        <div className="dashboard_whole_container">
          <p className="dashboard_title dashboard_container">
            Hey {displayName}! Good morning
          </p>
        </div>
        <div style={{ display: "flex", gap: "1%", margin: "0 10px 0 10px" }}>
          <div className="dashboard_explore_products">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 16px",
              }}
            >
              <p className="dashboard_explore_products_title">
                Explore Our Products
              </p>
              <button
                className="dashboard_appstore_button"
                onClick={handleViewAppStore}
                style={{ cursor: "pointer" }}
              >
                View App store
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                padding: "10px",
              }}
            >
              {productData.map((o) => {
                return (
                  <AppCards
                    url={o.Image}
                    title={o.Name}
                    size={{
                      width: "120px",
                      height: "100px",
                      minWidth: "120px",
                    }}
                    imgLoc="top"
                    titleSize="12px"
                    titlePos="center"
                    imageHeight="50px"
                    textColor={o.textColor}
                    borderRadius=" 16px"
                    bgcolor="#F9F9F9"
                  />
                );
              })}
            </div>
          </div>
          {!ordersView ? (
            <div
              className="dashboard_addproduct_division"
              // style={{
              //   backgroundColor: "#74B9FF",
              //   width: "37%",
              //   // height: "20%",
              //   display: "flex",
              //   // justifyContent: "space-between",
              // }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "36px",
                    /* identical to box height */
                    // margin: "20px 0px 10px 0px",
                    letterSpacing: "-0.5px",

                    /* Primary Colors/ Ranger Blue */

                    color: "#001661",
                  }}
                >
                  Lets get started with creating your catalog
                </div>
                <p
                  style={{
                    marginTop: "0px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    letterSpacing: "-0.5px",
                    marginBottom: "7px",
                  }}
                >
                  Add products what you want to sell or list on different
                  applications
                </p>
                <button
                  className="dashboard_add_product_button"
                  onClick={handleAddProduct}
                  style={{
                    cursor: "pointer",
                    fontFamily: "poppins",
                    marginTop: "24px",
                  }}
                >
                  Add Product
                </button>
              </div>
              <div>
                <img
                  src="https://ekart.mkpworkflow.com/ProductSmallImage/34_Small.jpeg"
                  height="120px"
                  width="120px"
                  style={{
                    boxShadow: " 5px 7px 5px rgb(44 44 43 / 25%) ",
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            className="dashboard_neworder_division"
            style={{
              height: ordersView ? "10%" : "",
              width: ordersView ? "67%" : "",
              transitionTimingFunction: "cubic-bezier(0,0,0,0)",
              transition: ".2s",
              // transitionDelay: "2s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "20px",
                    lineHeight: "36px",
                    /* identical to box height */
                    margin: "20px 0px 0px 0px",
                    letterSpacing: "-0.5px",

                    /* Primary Colors/ Ranger Blue */
                  }}
                >
                  You have new order awating
                </div>

                <p
                  style={{
                    marginTop: "0px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    letterSpacing: "-0.5px",
                    marginBottom: "7px",
                  }}
                >
                  log your orders quickly.
                </p>
                <button
                  className="dashboard_view_orders_button"
                  onClick={handleViewOrders}
                  style={{ cursor: "pointer", marginTop: "20px" }}
                >
                  View Orders
                </button>
              </div>
              <div
                style={{
                  boxShadow: " 4px 4px 4px rgba(0.1, 0.1, 0.1, 0.1)",
                }}
              >
                {!ordersView ? (
                  <img
                    src="https://iosgraphicsanimation.files.wordpress.com/2013/06/radarloop.gif"
                    height="120px"
                    width="120px"
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <video width="250px" autoPlay loop>
                      <source
                        src="https://thumbs.gfycat.com/LegalRemoteGoldenmantledgroundsquirrel-mobile.mp4"
                        type="video/mp4"
                      ></source>
                    </video>
                    <CloseIcon
                      onClick={handleCloseOrdersView}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
              </div>
            </div>
            {ordersView ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
                onClick={() => {
                  setView(true);
                }}
              >
                {/* {orderData.map((o, index) => {
                  if (index < 4)
                    return (
                      <OrdersCard
                        orderno={o.sales_order_number}
                        buttonname="closed"
                        lineitemCount="52"
                        location="Bhud Bihar"
                        channelName={o.channel_name}
                        createdDate={moment(o.created_date).format(
                          "DD-MM-yyyy"
                        )}
                        amount={o.amount}
                        sellerCount="5"
                        time="00:20sec"
                        color="white"
                      />
                    );
                })} */}
                <div style={{ cursor: "pointer" }}>
                  <OrdersCard
                    orderno={data?.id}
                    buttonname="closed"
                    lineitemCount="52"
                    location="Hyderabad"
                    productName={data?.descriptor?.name}
                    channelName="Eunimart"
                    createdDate="6-11-2022"
                    amount={data.price.value}
                    sellerCount="5"
                    time="00:20sec"
                    color="white"
                    quantity={data?.quantity?.available?.count}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {view ? (
          <OrderOverview show={view} setShow={setView} data={data} />
        ) : (
          <></>
        )}
        {!ordersView ? (
          <div className="dashboard_concover">
            <Box
              sx={{
                // borderBottom: 1,
                margin: "16px",
                borderColor: "divider",
                shadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F9F9F9",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="My Work"
                  {...a11yProps(0)}
                  sx={{ fontSize: "20px" }}
                />
                <Tab
                  label="Business Metrics"
                  {...a11yProps(1)}
                  sx={{ fontSize: "20px" }}
                />
                <Tab
                  label="Reports"
                  {...a11yProps(2)}
                  sx={{ fontSize: "20px" }}
                />
                <Tab
                  label="Goals"
                  {...a11yProps(3)}
                  sx={{ fontSize: "20px" }}
                />
                <Tab
                  label="Widgets"
                  {...a11yProps(4)}
                  sx={{ fontSize: "20px" }}
                />
              </Tabs>
            </Box>
            <Box className="bundleViewContent">
              <TabPanel value={value} index={0}>
                <MyWork />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <BusinessMetrics />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Reports />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Goals />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Widgets />
              </TabPanel>
            </Box>
          </div>
        ) : (
          <></>
        )}
        {/* <div className="dashboard_footer">
          <div className="dashboard_calender">View Calender</div>
          <div>
            <AddCircleOutlineIcon className="dashboard_footer_add_icon" />
          </div>
        </div> */}
      </ThemeProvider>
    </div>
  );
};

export default SellerDashBoard;

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