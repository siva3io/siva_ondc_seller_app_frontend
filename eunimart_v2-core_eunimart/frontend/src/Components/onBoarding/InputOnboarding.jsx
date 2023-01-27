import React, { useState } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  TextareaAutosize,
  Button,
} from "@mui/material";
import "./InputOnboarding.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import EditRoundedIcon from '@mui/icons-material/EditRounded';


const InputOnboarding = (props) => {
  console.log("props->", props);
  let selectOptions = props.data;
  const [focused, setFocused] = useState(false);
  const [textSubmit, settextSubmit] = useState(false);
  const {
    type,
    label,
    errorMessage,
    onChange,
    id,
    disabled,
    setgstDoc,
    setpanDoc,
    checkValidation,
    maxLength,
    minLength,
    regex,
    acceptType,
    ...inputProps
  } = props;
  const handleFocus = (e) => {
    // setFocused(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [files, setFiles] = React.useState([]);

  const [Validate, setValidate] = useState(false);

  //---------------------------------------------------------------
  const [fileName, setFileName] = useState(null);
  //---------------------------------------------------------------

  const removeFile = (filename) => {
    setFileName(null);
    setFiles(files.filter((file) => file.name !== filename));
  };

  const uploadHandler = (s, event) => {
    // console.log("event", event.target.files[0]);
    const file = event.target.files[0];
    if (!file) return;
    console.log("files123", file);

    //---------------------------------------------------------------
    setFileName(file.name);
    //---------------------------------------------------------------

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log("img data", e.target.result);
      s == "GST Number"
        ? setgstDoc(e.target.result.split(",")[1])
        : setpanDoc(e.target.result.split(",")[1]);
    };

    setFiles([...files, file]);
  };

  return (
    <>
      <Box
        className="input_main_wrapper"
        style={{
          // marginInline: "auto",
          width: !props.fullwidth && "auto",
        }}
      >
        <Box
          className="inputWrapper"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px",
            width: "100%",
            margin: "8px 0px",

            display: "flex",
            flexDirection: "column",
            height: "auto",
          }}
        >
          <Box
            className="labelWrap21"
            style={{
              display: props.label === "" && "none",
              width: props.width,
              marginRight: "auto",
            }}
          >
            <Typography
              htmlFor={props.label.toLowerCase().split(" ").join("_")}
              className={props.disabled_y ? "label_disabled" : "label"}
              sx={{
                color: props.labelcolor == "white" ? "white" : "black",
              }}
            >
              {props.label}{" "}
              {props.required ? (
                <span className="product_required_mark">*</span>
              ) : null}
            </Typography>
          </Box>
          <Box
            className="input_wrap"
            style={
              (props.uploadbutton ||
                props.validatebutton ||
                props.showbutton) && {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }
            }
          >
            {type === "input" || type === "password" || type === "number" ? (
              // && files.length == 0
              <>
                <TextField
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "white",
                    marginRight:
                      (props.uploadbutton ||
                        props.validatebutton ||
                        props.showbutton) &&
                      "10px",
                    width:
                      (props.uploadbutton ||
                        props.validatebutton ||
                        props.showbutton) &&
                      "-webkit-fill-available",
                  }}
                  disabled={disabled}
                  id="standard-name"
                  onChange={onChange}
                  helperText={focused ? errorMessage : ""}
                  error={focused && errorMessage}
                  {...inputProps}
                  placeholder={props.placeholder}
                  min={props && props.min}
                  type={
                    type == "input" || type == "number"
                      ? type
                      : showPassword
                      ? "input"
                      : "password"
                  }
                  autoComplete="off"
                  onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                  }
                  onBlur={handleFocus}
                  size="small"
                  onInput={(e) => {
                    if (props.type === "number") {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 12);
                    }
                    if (e.target.value.length === 0) {
                      setFocused(true);
                    }
                    if (
                      e.target.value.length < minLength ||
                      e.target.value.length > maxLength ||
                      !regex?.test(e.target.value)
                    ) {
                      setFocused(true);
                      settextSubmit(false);
                    } else if (
                      e.target.value.length >= minLength &&
                      regex?.test(e.target.value) &&
                      e.target.value.length <= maxLength
                    ) {
                      setFocused(false);
                      settextSubmit(true);
                    }
                  }}
                />

                {props.showbutton && (
                  <>
                    <Button
                      onClick={() => {
                        handleClickShowPassword();
                      }}
                      variant="contained"
                      component="label"
                      style={{
                        textTransform: "none",
                        backgroundColor: "rgba(65, 107, 255, 1)",
                      }}
                    >
                      {!showPassword ? "Show" : "Hide"}
                    </Button>
                  </>
                )}
                {props.uploadbutton && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        disabled={files.length == 0 ? false : true}
                        style={{
                          backgroundColor:
                            files.length == 0
                              ? // ? props.labelcolor == "white"
                                //   ? "#B9B9B9"
                                //   : "rgba(0, 22, 97, 0.9)"textSubmit
                                textSubmit
                                ? "#416BFF"
                                : "#B9B9B9"
                              : "rgba(114, 171, 58, 1)",
                          color:
                            files.length == 0
                              ? // ? props.labelcolor == "white"
                                //   ? "black"
                                //   : "white"
                                "black"
                              : "white",
                          textTransform: "none",
                        }}
                        variant="contained"
                        component="label"
                      >
                        <input
                          type="file"
                          hidden
                          accept={acceptType}
                          onChange={(e) => uploadHandler(props.label, e)}
                          onClick={(e) => (e.target.value = null)}
                        />
                        {files.length == 0 ? "Upload" : "Uploaded"}
                      </Button>

                      {files &&
                        files.map((file) => (
                          <DeleteIcon
                            className="delIcon"
                            style={{
                              color: "#f55321",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => removeFile(file.name)}
                          />
                        ))}
                      {/* {console.log("files", files)} */}
                      {/* {fileName != null && <>{fileName}</>} */}
                    </div>
                    {fileName != null && (
                      <div
                        style={{
                          // marginLeft: "66%",
                          color: "#dadada",
                          fontSize: "10px",
                          marginTop: "5px",
                        }}
                      >
                        {fileName.split(".")[0].length < 10
                          ? fileName.split(".")[0] +
                            "." +
                            fileName.split(".")[1]
                          : fileName.split(".")[0].slice(0, 10) +
                            "." +
                            fileName.split(".")[1]}
                      </div>
                    )}
                  </div>
                )}
                {props.validatebutton && (
                  <>
                    <Button
                      disabled={Validate}
                      onClick={() => {
                        typeof props.checkValidation == "function" &&
                          checkValidation(function (resp) {
                            resp.success && setValidate(true);
                          });
                      }}
                      style={{
                        backgroundColor: !Validate
                          ? //  props.labelcolor == "white"
                            //   ? "#B9B9B9"
                            //   : "rgba(0, 22, 97, 0.9)"
                            "#B9B9B9"
                          : "rgba(114, 171, 58, 1)",
                        color: !Validate
                          ? // props.labelcolor == "white"
                            //   ? "black"
                            //   : "white"
                            "black"
                          : "white",
                        textTransform: "none",
                      }}
                      variant="contained"
                      component="label"
                    >
                      {!Validate ? "Validate" : "Validated"}
                    </Button>
                    {Validate && (
                      <>
                      <CheckCircleIcon
                        style={{
                          padding: "5px",
                          color: "rgba(114, 171, 58, 1)",
                          display: "flex",
                          alignItems: "center",
                        }}
                        />
                      <EditRoundedIcon
                      onClick={()=>{setValidate((validate)=>{return !validate})}}
                        style={{
                        padding: "5px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                      />
                        </>
                    )}
                  </>
                )}
                {props.resetbutton && (
                  <>
                    <Button
                      onClick={() => {
                        resetClick();
                      }}
                      style={{
                        backgroundColor: "#B9B9B9",
                        color: "black",
                        textTransform: "none",
                      }}
                      variant="contained"
                      component="label"
                    >
                      Reset
                    </Button>
                  </>
                )}
                {props.createVersionbutton && (
                  <>
                    <Button
                      onClick={() => {}}
                      style={{
                        backgroundColor: "#B9B9B9",
                        color: "black",
                        textTransform: "none",
                        width: "22%",
                      }}
                      variant="contained"
                      component="label"
                    >
                      Create Version
                    </Button>
                  </>
                )}
              </>
            ) : type === "select" ? (
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <Autocomplete
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "white",
                      marginRight: "10px",
                    }}
                    multiple={props.multiple}
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={selectOptions}
                    value={props.value}
                    onChange={onChange}
                    sx={{ width: "100%" }}
                    filterSelectedOptions={
                      props.multiple === true ? true : false
                    }
                    renderInput={(params) => (
                      <>
                        {/* {console.log("params", params)} */}
                        <TextField
                          {...params}
                          InputLabelProps={{ shrink: false }}
                          // label={`Search ${props.label ?? ""}`}
                          {...inputProps}
                        />
                      </>
                    )}
                  />
                </FormControl>
              </Box>
            ) : type === "textarea" ? (
              <TextareaAutosize
                style={{
                  borderRadius: "5px",
                  backgroundColor: "white",
                  marginRight: "10px",
                  width: "90%",
                }}
                className="clstextarea"
                id="standard-name"
                minRows={props.rows}
                onChange={onChange}
                value={props.value}
                placeholder={props.placeholder}
              />
            ) : type === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label={props?.placeholder}
                  value={props?.value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : (
              <></>
            )}
          </Box>
        </Box>

        {/* //--------------------------------------------------------------- */}
        {/* {fileName != null && (
          <div
            style={{
              marginLeft: "250px",
              color: "#dadada",
              fontSize: "10px",
            }}
          >
            {fileName.split(".")[0].length < 10
              ? fileName.split(".")[0] + "." + fileName.split(".")[1]
              : fileName.split(".")[0].slice(0, 10) +
                "." +
                fileName.split(".")[1]}
          </div>
        )} */}
        {/* //--------------------------------------------------------------- */}
        <div style={{ color: "gray" }}>
          {!Validate
            ? props?.textfieldBottomText?.length > 0 &&
              props?.textfieldBottomText
            : " "}
        </div>

        {/* {files &&
        files.map((file) => (
          <>
            <li
              className="file-item"
              key={file.name}
              style={{ backgroundColor: "bisque" }}
            >
              <InsertDriveFileIcon />
              <p>{file.name}</p>
              <div className="actions">
                <div className="loading"></div>
                {isUploading && (
                  <SyncIcon
                    className="fa-spin"
                    onClick={() => removeFile(file.name)}
                  />
                )}
                {!isUploading && (
                  <DeleteIcon
                    className="delIcon"
                    onClick={() => removeFile(file.name)}
                  />
                )}
              </div>
            </li>
          </>
        ))} */}
      </Box>
      {/* <div className="locationDetailsMain">
        <div className="locationDetailForm">
          <div className="staticFormCard">
            <div className="staticFormCardTitle">{"HELLO"}</div>

            <div className="product-staticFormCardForm">

              
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default InputOnboarding;

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