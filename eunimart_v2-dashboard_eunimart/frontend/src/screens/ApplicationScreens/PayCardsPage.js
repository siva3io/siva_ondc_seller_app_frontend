import React, { useState, useEffect } from "react";
import AppCards from "./CardDesign";
import PayCards from "./PayCards";
import { loadProductData } from "../../redux/Actions/action";

import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const PayCardsPage = () => {
  const handleBtnClick = () => {
    console.log("buttonclicked");
  };
  const handleReadDoc = () => {
    console.log("buttonclicked for doc");
  };
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });

  let { productData } = useSelector((state) => state.data);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductData(params));
  }, [params]);
  const paymentData = [
    {
      Image: "https://dev-api.eunimart.com/files/images/logistics.png",
      Name: "Cataloging",
      textColor: "#001661",
      button: "Read Doc.",
      handleReadDoc: handleReadDoc,
    },
    {
      Image:
        "https://dev-api.eunimart.com/files/images/operation_solutions.png",
      Name: "Order Processing",
      textColor: "#001661",
      button: "Read Doc.",
      handleReadDoc: handleReadDoc,
    },
    {
      Image: "https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png",
      Name: "Warehouse Management",
      textColor: "#001661",
      button: "Read Doc.",
      handleReadDoc: handleReadDoc,
    },
    {
      Image:
        "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      Name: "Artificial Intelligence",
      textColor: "#001661",
      button: "Read Doc.",
      handleReadDoc: handleReadDoc,
    },
  ];
  const [displayName, setdisplayName] = useState("Developer");
  // localStorage.setItem("user_data", JSON.stringify({ name: "Shayak" }));

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data?.name) {
      setdisplayName(user_data?.name);
    }
  }, []);
  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            padding: "0px 24px",
            margin: "10px",
            fontFamily: "Poppins",
            fontStyle: "normal",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            color="#001661"
            fontWeight={600}
            fontSize={40}
            letterSpacing={-0.5}
            fontFamily="Poppins"
            fontStyle="normal"
            width="310px"
            paddingBottom="1%"
          >
            Hey {displayName}!
          </Typography>
        </div>
        <div
          style={{
            margin: "20px 10px 10px 10px",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.5px",
            color: "#001661",
            fontFamily: "Poppins",
            fontStyle: "normal",
            display: "flex",
            gap: "10px",
          }}
        >
          <CircleIcon
            style={{ color: "#72AB3A", padding: "5px 5px 0px 5px" }}
          />
          Production
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1%",
            margin: "10px",
          }}
        >
          {productData.map((o) => {
            if (o?.application_mode?.lookup_code == "PRODUCTION")
              return (
                <PayCards
                  heading={o?.name}
                  url={o?.image_options?.link}
                  title={o?.name}
                  appId={o?.application_id}
                  usage="0/100"
                  size={{ width: "20vw", height: "150px" }}
                  imgLoc="left"
                  titleSize="16px"
                  titlePos="left"
                  imageHeight="50px"
                  imageWidth="60px"
                  cardHeight="180px"
                  cardWidth="320px"
                  sameblock="true"
                  // handleBtnClick={handleBtnClick}
                  barPercent={0}
                />
              );
          })}
        </div>
      </div>
      <div>
        <div
          style={{
            margin: "20px 10px 10px 10px",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.5px",
            color: "#001661",
            fontFamily: "Poppins",
            fontStyle: "normal",
            display: "flex",
            gap: "10px",
          }}
        >
          <CircleIcon
            style={{ color: "#FABA1E", padding: "3px 5px 0px 5px" }}
          />
          Sandbox
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1%",
            margin: "10px",
          }}
        >
          {productData.map((o) => {
            if (o?.application_mode?.lookup_code !== "PRODUCTION")
              return (
                <PayCards
                  heading={o?.name}
                  url={o?.image_options?.link}
                  title={o?.name}
                  appId={o?.application_id}
                  usage="0/100"
                  size={{ width: "20vw", height: "150px" }}
                  imgLoc="left"
                  titleSize="16px"
                  titlePos="left"
                  imageHeight="50px"
                  imageWidth="60px"
                  cardHeight="180px"
                  cardWidth="350px"
                  sameblock="false"
                  // handleBtnClick={handleBtnClick}
                  barPercent={0}
                />
              );
          })}
        </div>
      </div>
      <div>
        <div
          style={{
            margin: "20px 10px 10px 20px",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.5px",
            color: "#001661",
            fontFamily: "Poppins",
            fontStyle: "normal",
          }}
        >
          Explore Our Products
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1%",
            margin: "20px",
          }}
        >
          {paymentData.map((o) => {
            return (
              <a
                href="https://dev-api.eunimart.com/swagger/index.html"
                style={{ textDecoration: "none" }}
              >
                <AppCards
                  url={o.Image}
                  title={o.Name}
                  size={{ width: "22vw", height: "200px" }}
                  imgLoc="top"
                  titleSize="16px"
                  titlePos="center"
                  imageHeight="120px"
                  btn={{ name: o.button, handelBtn: o.handleReadDoc }}
                  textColor={o.textColor}
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PayCardsPage;


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