import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typography, Button } from "@mui/material";

import InputOnboarding from "./InputOnboarding";
import "./Modal";
import { load_dashboard_type } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

function UserSide({
  UserSelected,
  setOndcCon2,
  setOndcCon1,
  SetApplicationSelected,
  otherdetails,
  setisFormSelected,
  handelInputChange,
  stdCodesData,
  setgstDoc,
  setpanDoc,
  checkValidation,
}) {
  const [isClicked, setisClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();

  const { dashboardTypeData } = useSelector((state) => state.data);

  useEffect(() => {
    console.log("dashboardTypeData", dashboardTypeData);
    if (dashboardTypeData?.token) {
      localStorage.setItem("token", dashboardTypeData?.token);
    }
  }, [dashboardTypeData]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <>
      {UserSelected && (
        <>
          <div className="center" style={{ lineHeight: "1.5" }}>
            <div
              style={{
                fontSize: 50,
                color: "white",
                fontWeight: "bold",
                padding: 5,
                margin: 5,
                textAlign: "center",
                marginBottom: "4%",
              }}
            >
              I am a <br />
              User
            </div>
            <div
              style={{
                color: "white",
                width: "25vw",
                padding: 5,
                margin: 5,
                textAlign: "center",
                // fontWeight: "bold",
                marginBottom: "4%",
              }}
            >
              You want to buy or sell on a application that offers a unified
              buying experience to the customers being connected with thousands
              of sellers and service providers.
            </div>
            <button
              disabled={isClicked}
              style={{
                padding: "7px 15px",
                borderRadius: 5,
                opacity: isClicked && "0%",
                transition: "0.5s",
                cursor: !isClicked && "pointer",
                borderColor: "white",
                backgroundColor: isHover ? "#CDCCCC" : "white",
                // scale: isHover ? "1.1" : "1",
              }}
              type="submit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setOndcCon2(1);
                setOndcCon1(0);
                setOndcCon1(2);
                SetApplicationSelected(false);
                setisClicked(true);
              }}
              className="btn btn-primary"
            >
              Get started
            </button>
          </div>
        </>
      )}
      {!UserSelected && (
        <div
        // style={{ scale: "0.9" }}
        >
          <Typography
            style={{
              color: "white",
              fontSize: "50px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Be a part of ONDC
          </Typography>
          <div
            className="form"
            style={{
              // margin: "50px",
              scale: "0.85",
            }}
          >
            {otherdetails.map((field) => {
              return (
                <InputOnboarding
                  data={stdCodesData.map((o) => {
                    return {
                      id: o.id,
                      lookup_code: o.lookup_code,
                      label: o.display_name,
                    };
                  })}
                  labelcolor="white"
                  fullwidth="false"
                  disabled={field.disabled}
                  required={field.required}
                  minLength={field.minLength ? field.minLength : ""}
                  maxLength={field.maxLength ? field.maxLength : ""}
                  regex={field.regex ? field.regex : ""}
                  acceptType={field.acceptType ? field.acceptType : ""}
                  errorMessage={field.errorMessage ? field.errorMessage : ""}
                  type={field.type}
                  label={field.label}
                  name={field.label}
                  key={field.key}
                  value={field.value}
                  rows={field.rows}
                  textfieldBottomText={field.textfieldBottomText}
                  uploadbutton={field.uploadbutton}
                  validatebutton={field.validatebutton}
                  width={"300px"}
                  placeholder={`Enter ${field.label}`}
                  onChange={(e, value) => {
                    handelInputChange(
                      field.key,
                      field.type == "select" ? value : e.target.value
                    );
                  }}
                  setgstDoc={setgstDoc}
                  setpanDoc={setpanDoc}
                  checkValidation={checkValidation}
                />
              );
            })}
          </div>

          <Button
            style={{
              position: "relative",
              float: "left",
              backgroundColor: "#B9B9B9",
              color: "black",
              left: "60px",
              bottom: "-20px",
              textTransform: "none",
              padding: "3px 20px",
            }}
            variant="contained"
            onClick={() => {
              setisFormSelected(true);
              setOndcCon2(1);
              setOndcCon1(0);
              setOndcCon1(2);
              dispatch(load_dashboard_type());
            }}
          >
            Skip
          </Button>
          <Button
            style={{
              position: "relative",
              float: "right",
              backgroundColor: "#B9B9B9",
              color: "black",
              right: "60px",
              bottom: "-20px",
              textTransform: "none",
              padding: "3px 20px",
              // zIndex: -1,
            }}
            variant="contained"
            onClick={() => {
              setisFormSelected(true);
              setOndcCon2(1);
              setOndcCon1(0);
              setOndcCon1(2);
              dispatch(load_dashboard_type());
            }}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

export default UserSide;

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