import { padding } from "@mui/system";
import React from "react";
export default function payCards(props) {
  return (
    <>
      <div
        style={{
          height: props.cardHeight,
          width: props.cardWidth,
          backgroundColor: "#FFFFFF",
          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "24px",
          gap: "12px",
          margin: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "19px",
            lineHeight: "28px",
            /* identical to box height */
            borderBottom: "1px solid #D9D9D9",
            letterSpacing: "0.15px",

            color: "#000000",
          }}
        >
          {props.heading}
        </div>
        <div style={{ display: "flex", padding: "5px", gap: "20px" }}>
          <div style={{ margin: "15px" }}>
            <img
              src={props.url}
              height={props.imageHeight}
              width={props.imageWidth}
            />
          </div>
          <div style={{ fontFamily: "Inter", fontStyle: " normal" }}>
            <p
              style={{
                fontWeight: "400",
                fontSize: "16px",
                marginTop: "10px ",
                marginBottom: "10px",
              }}
            >
              {props.title}
            </p>
            <p
              style={{ fontWeight: "400", fontSize: "12px", marginTop: "5px" }}
            >
              App ID:{props.appId}
            </p>
            {props.sameblock ? (
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                Usage:{props.usage}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          {props.diffblock ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "22px",
              }}
            >
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  marginTop: "5px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                }}
              >
                {props.usage} of limit Used
              </p>
              {/* <button
                style={{
                  color: "#001661",
                  backgroundColor: "white",
                  border: "0.5px solid #001661",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "3px",
                  // fontFamily: "Helvetica Neue",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
                onClick={props.handleBtnClick}
              >
                View Details
              </button> */}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#D9D9D9",
                width: "200px",
                height: "6px",
                marginTop: "5px",
                borderRadius: "50px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: "#72AB3A",
                  width: props.barPercent * 2,
                  height: "6px",

                  borderRadius: "50px",
                }}
              ></div>
            </div>
          </div>
          <p
            style={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "15px",
              margin: "0px",
              padding: "0px",
            }}
          >
            {props.barPercent}% Remaining
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* {props.sameblock ? (
            <button
              style={{
                color: "#001661",
                backgroundColor: "white",
                border: "0.5px solid #001661",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "3px",
                // fontFamily: "Helvetica Neue",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px",
              }}
              onClick={props.handleBtnClick}
            >
              View Details
            </button>
          ) : (
            <></>
          )} */}
        </div>
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