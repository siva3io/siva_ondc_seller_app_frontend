import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./OrderOverview.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ModalViewV2 from "./Model2";
import { useDispatch } from "react-redux";
const value = {
  padding: " 15px 10px",
  color: " #606161",
  fontSize: "16px",
};

const title = {
  padding: " 15px 10px",
  fontSize: "16px",
  color: "black",
  width: "30%",
};

const pro_name = {
  padding: " 15px 10px",
  fontSize: "24px",
  color: "black",
  fontWeight: "500",
};

const OrderOverview = ({ show, setShow, data }) => {
  const handleClose = () => {
    console.log("closed");
    setShow(false);
  };
  return (
    <>
      <div></div>
      {show && (
        <div className="whole_modal">
          <ModalViewV2
            modalTitle={"Order Overview"}
            handleModalClose={handleClose}
            modalOpen={show}
            modalContentStyleHeight={"100%"}
            modalContentStyleWidth={"auto"}
            styleLeft={"calc(50% - 800px/2)"}
            styleHeight={"auto"}
            mainWidth={"750px"}
            modalContentStylePadding={"20px"}
          >
            <div style={{ display: "flex" }}>
              <div>
                <img
                  src={data?.descriptor?.images[0]}
                  height="400px"
                  width="300px"
                />
              </div>
              <div>
                <div style={pro_name}>{data?.descriptor?.name}</div>

                <div style={{ borderBottom: "1px solid #eee" }}>
                  <div style={title}>Description</div>
                  <div style={value}>{data?.descriptor?.long_desc}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div style={title}>Quantity</div>
                  <div style={value}>{data?.quantity?.available?.count}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div style={title}>Price</div>
                  <div style={value}>{data?.price?.value}</div>
                </div>
                <div>
                  {data?.quote?.breakup.map((o) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <div style={title}>{o.title}</div>
                        <div style={value}>{o?.price?.value}</div>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div style={title}>Address</div>
                  <div style={value}>
                    <div>{data?.location?.address?.door}</div>
                    <div>{data?.location?.address?.name}</div>
                    <div>{data?.location?.address?.city}</div>
                    <div>{data?.location?.address?.state}</div>
                    <div>{data?.location?.address?.country}</div>
                    <div>{data?.location?.address?.area_code}</div>
                  </div>
                </div>
              </div>
            </div>
          </ModalViewV2>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default OrderOverview;

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