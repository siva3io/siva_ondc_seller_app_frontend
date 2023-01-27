import React from "react";
import "./OrdersCard.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

const OrdersCard = (props) => {
  const handleViewProduct = () => {
    // console.log("want to view", props.orderno);
  };
  return (
    <div>
      <div className="dashboard_whole_order_card">
        <div
          className="dashboard_order_card_timer"
          style={{ color: props.color }}
        >
          {props.time}
          <div className="ribbon_cut"></div>
        </div>
        <div className="dashboard_order_card_details">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {/* <div className="order_no">{props.orderno}</div> */}
              <div className="order_no">{props.productName}</div>
              <button className="button_design">{props.buttonname}</button>
            </div>
            <div>
              <VisibilityIcon
                style={{ color: "blue" }}
                onClick={handleViewProduct}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {/* <div>
              <div className="title">NO.OF LINE ITEM</div>
              <div className="details">{props.lineitemCount}</div>
            </div> */}
            <div>
              <div className="title">QUANTITY</div>
              <div className="details">{props.quantity}</div>
            </div>
            <div>
              <div className="title">LOCATION</div>
              <div className="details">{props.location}</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div>
              <div className="title">CHANNEL NAME</div>
              <div className="details">{props.channelName}</div>
            </div>
            <div>
              <div className="title">CREATED DATE</div>
              <div className="details">{props.createdDate}</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div>
              <div className="title"> AMOUNT</div>
              <div className="details">{props.amount}</div>
            </div>
            <div>
              <div
                className="details"
                style={{
                  color: "#DC0320",
                  fontFamily: "poppins",
                  fontStyle: "normal",
                  fontSize: "10px",
                  lineHeight: "15px",
                  fontWeight: "600",
                  letterSpacing: "0.4px",
                  marginTop: "12%",
                }}
              >
                <div>{props.sellerCount} other sellers watching this order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;

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