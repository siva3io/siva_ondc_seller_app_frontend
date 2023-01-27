import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/system";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import AppCards from "./AppCards";
import "./cardpage.css" 
const styles = {
  wishes: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "36px",
    lineHeight: "36px",
    letterSpacing: "-0.5px",
    color: "#001661",
    gap: "10px",
    padding: "0",
  },
 };

export default function CardPage() {
  var time = new Date();
  console.log(time, "timetime");
  const handelReadBtn = (id) => {
    console.log(id, "ReadMore");
  };

  const Domain = [
    {
      id: 1,
      title: "Operation Solutions",
      url: "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 2,
      title: "Logististics",
      url: "https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 3,
      title: "Operation Solutions",
      url: "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 4,
      title: "Grow with Whatsapp",
      url: "https://dev-api.eunimart.com/files/images/logistics.png",
      imgLoc: "top",
      selected: false,
    },
  ];

  const Domain2 = [
    {
      id: 1,
      title: "Operation Solutions",
      url: "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 2,
      title: "Logististics",
      url: "https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 3,
      title: "Operation Solutions",
      url: "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 4,
      title: "Grow with Whatsapp",
      url: "https://dev-api.eunimart.com/files/images/logistics.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 5,
      title: "Operation Solutions",
      url: "https://dev-api.eunimart.com/files/images/artificial_intelligence.png",
      imgLoc: "top",
      selected: false,
    },
    {
      id: 6,
      title: "Grow with Whatsapp",
      url: "https://dev-api.eunimart.com/files/images/logistics.png",
      imgLoc: "top",
      selected: false,
    },
  ];

  console.log(time.getHours(), "timex");
  return (
    <>
      <div
        style={{
          // marginTop:"2vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          background: "#f5f5f5",
          padding: "2vw 0",
          gap: "15px",
          zIndex:"0"

        }}
      >
        <div
          style={{
            sdisplay: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vh",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "95vw",
              background: "#fff",
              margin: "auto",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              padding: "10px",
            }}
          >
            <div style={styles.wishes}>
              Hey Developers !{" "}
              {time.getHours() < 12
                ? "Good Morning"
                : time.getHours() < 16
                ? "Good Afternoon"
                : "Good Evening"}
            </div>
          </div>
        </div>
        {/* <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            sx={{ height: "20px", background: "red" }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search for related services"
            id="fullWidth"
          />
        </Box> */}

        {/* <input
          placeholder="Search metrics"
          style={{
            width: "50%",
            height: "29px",
            padding: "5px 10px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "19px",
            border: "1px solid #c7c7c7",
            borderRadius: " 4px",
            color: "#c7c7c7",
          }}
        /> */}

        <form className="example" >
  <button type="submit" style={{display:"flex",justifyContent:"center",alignItems:"center",background:"transparent"}}><SearchOutlinedIcon style={{fontSize:"24px",background:"transparent"}} /></button>
  <input type="text" className="inpSearch" placeholder="Search for related services" name="search"/>
</form>

        <div
          style={{
            width: "95vw",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: "24px", color: "#001661" }}>
            Recomended Service Packs
          </h2>
          <div
            style={{
              width: "95vw",
              display: "flex",
              justifyContent: "",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {Domain?.map((o) => {
              return (
                <div
                // onClick={() => {
                //   setSelectedOption(o.id);
                // }}
                >
                  <AppCards
                    imgLoc={o.imgLoc}
                    title={o.title}
                    url={o.url}
                    size={{ width: "20vw", height: "150px" }}
                    titleSize="16px"
                    titlePos="center"
                    imageHeight="90px"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: "95vw",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <h2
            style={{ fontSize: "24px", color: "#001661", paddingLeft: "25px" }}
          >
            Core modules
          </h2>
          <div
            style={{
              width: "95vw",
              display: "flex",
              justifyContent: "",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {Domain2?.map((o) => {
              return (
                <div
                // onClick={() => {
                //   setSelectedOption(o.id);
                // }}
                >
                  <AppCards
                    imgLoc={o.imgLoc}
                    title={o.title}
                    url={o.url}
                    size={{ width: "20vw", height: "150px" }}
                    titleSize="16px"
                    titlePos="center"
                    imageHeight="90px"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: "95vw",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <h2
            style={{ fontSize: "24px", color: "#001661", paddingLeft: "25px" }}
          >
            Integration modules
          </h2>
          <div
            style={{
              width: "95vw",
              display: "flex",
              justifyContent: "",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {Domain?.map((o) => {
              return (
                <div
                // onClick={() => {
                //   setSelectedOption(o.id);
                // }}
                >
                  <AppCards
                    imgLoc={o.imgLoc}
                    title={o.title}
                    url={o.url}
                    size={{ width: "20vw", height: "150px" , maxWidth:"25vw" }}
                    titleSize="16px"
                    titlePos="center"
                    imageHeight="90px"

                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* </ThemeProvider> */}
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