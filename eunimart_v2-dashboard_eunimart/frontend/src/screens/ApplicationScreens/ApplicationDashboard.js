import React, { useState, useEffect } from "react";
import AppCards from "./CardDesign";
import { Typography } from "@mui/material";
import VerticalStepper from "./VerticalStepper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import PayCardsPage from "./PayCardsPage";

const ApplicationDashboard = () => {
  const [verification, setVerification] = useState(true);
  const handleVerification = () => {
    setVerification(false);
  };
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });

  const steps = [
    {
      title: "Verify your Email/Phone",
      description:
        " we have sent a verification mail/SMS to your email/phone “aag@24@gmail.com/xxxxxxxxxxx” Please verify by clicking on the link.",
      button: "Resend Verification Code",
    },
    {
      title: "Activate Your sandbox account",
      description:
        "as soon as we complete the verification proccess you will be provided with sand box accounnt credentials",
    },
  ];

  const steppersteps = [
    { title: "", description: "", icon: "" },
    {
      icon: <ThumbUpIcon className="widget_icon" fontSize="larger" />,
      successor: "true",
    },
  ];

  const paymentData = [
    {
      Image: "https://dev-api.eunimart.com/files/images/logistics.png",
      Name: "Cataloging",
      textColor: "#001661",
      button: "Read Doc.",
    },
    {
      Image:
        "https://dev-api.eunimart.com/files/images/operation_solutions.png",
      Name: "Order Processing",
      textColor: "#001661",
      button: "Read Doc.",
    },
    {
      Image: "https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png",
      Name: "Warehouse Management",
      textColor: "#001661",
      button: "Read Doc.",
    },
    {
      Image:
        "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      Name: "Artificial Intelligence",
      textColor: "#001661",
      button: "Read Doc.",
    },
  ];
  const [displayName, setdisplayName] = useState("Seller");
  // localStorage.setItem("user_data", JSON.stringify({ name: "Shayak" }));

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data?.name) {
      setdisplayName(user_data?.name);
    }
  }, []);
  return (
    <div>
      {verification ? (
        <div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              padding: "24px",
              margin: "10px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              marginBottom: "2%",
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
              Hey Developer!
            </Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ width: "2%", position: "relative" }}>
                <VerticalStepper steps={steppersteps} />
              </div>
              <div style={{ width: "98%" }}>
                {steps.map((o) => {
                  return (
                    <div style={{ paddingBottom: "2%" }}>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "24px",
                          lineHeight: "32px",
                          letterSpacing: "-0.5px",
                          color: "#001661",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {o.title}
                        {/* button fiedls */}
                        {o.button ? (
                          <button
                            style={{
                              color: "#416BFF",
                              backgroundColor: "#FFFFFF",
                              border: "0.5px solid #416BFF",
                              borderRadius: "4px",
                              padding: " 8px 10px",
                              cursor: "pointer",
                            }}
                            onClick={handleVerification}
                          >
                            {o.button}
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div
                        style={{
                          letterSpacing: "-0.5px",
                          color: "#001661",
                        }}
                      >
                        {o.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                margin: "10px",
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
                margin: "10px",
              }}
            >
              {paymentData.map((o) => {
                return (
                  <AppCards
                    url={o.Image}
                    title={o.Name}
                    size={{ width: "20vw", height: "150px" }}
                    imgLoc="top"
                    titleSize="16px"
                    titlePos="center"
                    imageHeight="90px"
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <PayCardsPage />
      )}
    </div>
  );
};

export default ApplicationDashboard;

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