import React from "react";
import { useHistory } from "react-router-dom";
import "./PromotionsCard.css";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";

const PromotionsCard = ({Elemdata}) => {
  let history = useHistory();

  // const { data } = Elemdata;
  // console.log(Elemdata,Elemdata?.promotional_details?.name,"data111")
  var StartDate=moment(Elemdata?.promotional_details?.start_date_and_time).format(" DD/MM/yyyy")+","+moment(Elemdata?.promotional_details?.start_date_and_time).format("hh:mm A")
    var EndDate=moment(Elemdata?.promotional_details?.end_date_and_time).format(" DD/MM/yyyy")+","+moment(Elemdata?.promotional_details?.end_date_and_time).format("hh:mm A")





  return (
    <div
      className="ticket_card"
      style={{ cursor: "pointer" }}
      onClick={() => {
        history.push(`/promotions/promotionView/`+ Elemdata?.id);
      }}
    >
      <div className="ticket_card_details">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="order_no" style={{ display: "flex", gap: "5px" }}>
            {Elemdata?.promotional_details?.name}
          </div>
          <div
            className="button_design"
            style={{
              padding: "13px 10px",
              color: "black",
              backgroundColor:
               Elemdata?.is_active == true
                  ? "rgba(160, 255, 183, 1)"
                  : "rgba(243, 164, 69, 1)",
            }}
          >
            {Elemdata?.is_active == true? "Active":"InActive"}
          </div>
        </div>

        <div className="promotionsCard-grid">
          <div>
            <div className="title">Products</div>
            <div className="details">{Elemdata?.offer_product_details.length}</div>
          </div>
          <div>
            <div className="title">Discount Type</div>
            <div className="details">{Elemdata?.discount_type?.display_name}</div>
          </div>
          
          <div>
            <div className="title">Offer Value</div>
            <div className="details">{Elemdata?.discount_value}</div>
          </div>
          <div>
            <div className="title">{""}</div>
            <div className="details">{""}</div>
          </div>
          <div>
            <div className="title">From Date and Time</div>
            <div className="details">{StartDate}</div>
          </div>
          <div>
            <div className="title">To Date and time</div>
            <div className="details">{EndDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsCard;


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