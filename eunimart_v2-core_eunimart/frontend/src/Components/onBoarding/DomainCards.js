import React from "react";
import { Button } from "@material-ui/core";
export default function AppCards(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: props.imgLoc == "top" ? "space-around" : "center",
          alingnItems: "center",
          flexDirection: props.imgLoc == "left" ? "row-reverse" : props.imgLoc == "right" ? "row" : props.imgLoc == "top" ? "column-reverse" : props.imgLoc == "bottom" ? "column" : "",
          padding: "15px",

          background:
            props.selected == true
              ? "rgba(222, 228, 253, 0.5)"
              : "white",
          borderRadius: "5px",
          width: props.size.width,
          minWidth: "250px",
          maxWidth: props.size.maxWidth,
          minHeight: props.size.minHeight,
          height: props.size.height,
        }}
      >
        <div style={{ width: "100%", textAlign: "left", paddingLeft: "5px" }}>
          {
            props.title && (
              <h2
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: props.titleSize ? props.titleSize : "33px",
                  width: "100%",
                  textAlign: props?.titlePos
                }}
              >
                {props.title}
              </h2>
            )
          }


          {/* {
            props.desc && (
              <p style={{ fontSize: "16px" }}> {props.desc} </p>
            )
          } */}

          {props.btn != null && (
            <div onClick={props.btn.handelBtn}>
              <Button variant="contained" color="primary" style={{ marginTop: "16px" }}>
                {" "}
                {props.btn.name}{" "}
              </Button>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alingnItems: "center",
          }}
        >
          {props.url && <img style={{ height: props?.imageHeight, width: props.imgLoc == "top" ? "50%" : "9vw" }} src={props.url} />}
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