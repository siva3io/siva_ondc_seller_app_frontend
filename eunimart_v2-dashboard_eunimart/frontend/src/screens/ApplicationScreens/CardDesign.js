import React, { useState } from "react";
export default function AppCards(props) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    {
      props.fun;
    }
    setClicked(true);
  };
  return (
    <>
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: props.imgLoc == "top" ? "space-around" : "center",
          alingnItems: "center",
          flexDirection:
            props.imgLoc == "left"
              ? "row-reverse"
              : props.imgLoc == "right"
              ? "row"
              : props.imgLoc == "top"
              ? "column-reverse"
              : props.imgLoc == "bottom"
              ? "column"
              : "",
          padding: "15px 0px",
          boxShadow:
            props.selected == true
              ? "inset 2px 2px 1px rgba(0,0,255,1),inset -2px -2px 1px rgba(0,0,255,1) "
              : "0px 1px 10px rgba(0,0,0,0.1)",
          borderRadius: props?.borderRadius ? props?.borderRadius : "5px",
          width: props?.size?.width,
          minWidth: props?.size?.minWidth ? props.size.minWidth : "250px",
          maxWidth: props?.size?.maxWidth,
          minHeight: props?.size?.minHeight,
          height: props?.size?.height,
          background: props?.bgcolor ? props?.bgcolor : "white",
        }}
      >
        <div style={{ width: "100%", textAlign: "left" }}>
          {props.title && (
            <h2
              style={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: props.titleSize ? props.titleSize : "33px",
                width: "100%",
                textAlign: props?.titlePos,
                color: props?.textColor,
              }}
            >
              {props.title}
            </h2>
          )}

          {props.desc && <p style={{ fontSize: "16px" }}> {props.desc} </p>}

          {props.btn != null && (
            <div
              onClick={props.btn.handelBtn}
              style={{
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid #DADFE5",
                padding: "10px",
                width: "90%",
                pointerEvents: "pointer",
                color: " #416BFF",
              }}
            >
              {props.btn.name}
            </div>
          )}
          {/* {console.log("test", props)} */}
          {props.enable ? <div>Upload</div> : console.log(props)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.url && (
            <img
              style={{
                height: props?.imageHeight,
                width: props.imgLoc == "top" ? "50%" : "7vw",
              }}
              src={props.url}
            />
          )}
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