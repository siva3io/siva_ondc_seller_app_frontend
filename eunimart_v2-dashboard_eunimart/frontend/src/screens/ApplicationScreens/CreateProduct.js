import React, { useEffect, useState } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";

import "./VerticalStepper.css";
// import AppCards from "./CardDesign";
import TextField from "@mui/material/TextField";
import SingleFileUpload from "Remote/SingleFileUpload";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProductsListData,
  load_language_type,
} from "../../redux/Actions/action";

import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

const CreateProduct = ({ setStep, setproductData }) => {
  const [recordState, setrecordState] = useState(null);
  const [mediaBlobUrl, setmediaBlobUrl] = useState(null);
  const startfun = () => {
    setrecordState(RecordState.START);
  };
  const stopfun = () => {
    setrecordState(RecordState.STOP);
  };

  function getbase64(blob) {
    console.log("BLOB", blob);
    // var blob = new Blob([blob])
    var reader = new FileReader();
    reader.readAsDataURL(blob.blob);
    reader.onloadend = function() {
      var base64data = reader.result;
      console.log(base64data);
      setfileUploadVoice({ data: base64data.split(",")[1] });
    };
  }

  const onStop = (audioData) => {
    console.log("audioData", audioData);
    getbase64(audioData);

    setmediaBlobUrl(audioData.url);
  };
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const { searchProductsData, languageTypeData } = useSelector(
    (state) => state.data
  );
  const { dashboardTypeData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(load_language_type());
  }, []);

  console.log(languageTypeData, "lang");

  const [ShowText, setShowText] = useState(false);
  const [ShowVoice, setShowVoice] = useState(false);
  const [ShowImage, setShowImage] = useState(false);

  const [imageUpload, setimageUpload] = useState("");
  const [fileUploadVoice, setfileUploadVoice] = useState("");
  const [fileUploadImage, setfileUploadImage] = useState("");
  const [fileUploadText, setfileUploadText] = useState("");

  const [dummy, setdummy] = useState(1);
  const [submit, setSubmit] = useState(false);

  const titleStyle = {
    fontWeight: "600",
    fontSize: "24px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    lineHeight: "36px",
    letterSpacing: " 0.25px",
    color: "#001661",
    margin: "0px 16px",
    // margin: "0px 0px 0px 33px",
  };
  const handleVoice = () => {
    // console.log("voice");
    const productData = productData1;
    productData[0].enable = true;
    productData[2].enable = false;
    productData[1].enable = false;
    setproductData1(productData);
    // console.log(productData1);
  };
  const handleImage = () => {
    // console.log("Image");
    const productData = productData1;
    productData[1].enable = true;
    productData[0].enable = false;
    productData[2].enable = false;
    setproductData1(productData);
  };
  const handleText = () => {
    // console.log("text");
    const productData = productData1;
    productData[2].enable = true;
    productData[0].enable = false;
    productData[1].enable = false;
    setproductData1(productData);
  };
  const handleTextChange = (data) => {
    // console.log(data);
    setdummy(dummy + 1);
    setfileUploadText(data);
    // console.log(fileUploadText);
  };

  const [productData1, setproductData1] = useState([
    {
      Image: "https://dev-api.eunimart.com/files/images/logistics.png",
      Name: "Voice Recording",
      textColor: "#001661",
      cardFunction: handleVoice,
      enable: true,
    },
    {
      Image:
        "https://dev-api.eunimart.com/files/images/operation_solutions.png",
      Name: "Image ",
      textColor: "#001661",
      cardFunction: handleImage,
      enable: false,
    },
    {
      Image: "https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png",
      Name: "Text",
      textColor: "#001661",
      cardFunction: handleText,
      enable: false,
    },
  ]);

  const onClickVoice = () => {
    setShowVoice((state) => !state);
    setShowImage(false);
    setShowText(false);
  };

  const onClickImage = () => {
    setShowImage((state) => !state);
    setShowVoice(false);
    setShowText(false);
  };

  const onClickText = () => {
    setShowText((state) => !state);
    setShowVoice(false);
    setShowImage(false);
  };
  // console.log("iiiii", fileUploadImage, fileUploadVoice, "d");

  const handleSubmitButton = () => {
    if (ShowText) {
      dispatch(loadProductsListData({ text: fileUploadText }));
    } else if (ShowImage) {
      dispatch(
        loadProductsListData({
          image: {
            data: fileUploadImage.data,
            headers: {},
          },
        })
      );
    } else if (ShowVoice) {
      dispatch(
        loadProductsListData({
          audio: {
            data: fileUploadVoice.data,
            language_code: lang,
            headers: {},
          },
        })
      );
    }
  };

  const [ProductsList, setProductsList] = useState([]);

  useEffect(() => {
    if (searchProductsData) {
      var allproducts = [];
      Object.keys(searchProductsData).forEach((key) => {
        var temp = searchProductsData[key].map((o) => {
          return {
            brand_owner_name: o?.brand_owner_name,
            category_id: o?.category_id,
            id: o?.id,
            images: o?.images,
            imported_product_country_of_origin:
              o?.imported_product_country_of_origin,
            long_desc: o?.long_desc,
            manufacturer_or_packer_address: o?.manufacturer_or_packer_address,
            name: o?.name.split(" ")[0] + " " + o?.name.split(" ")[1],
            other_importer_country_of_origin:
              o?.other_importer_country_of_origin,
            short_desc: o?.short_desc,
            value: o?.value,
            // url:
            //   "https://dev-api.eunimart.com/files/images/" +
            //   o?.lookup_code +
            //   ".png",
            // imgLoc: "top",
            // selected:
            //   selectedDoimain?.filter((o) => o == 2).length > 0 ? true : false,
            // selected: selectedDomain == o.id ? true : false,
          };
        });
        allproducts = [...allproducts, ...temp];
      });

      setProductsList(allproducts);
    }
  }, [searchProductsData]);

  // console.log("ProductsList", ProductsList);
  const [lang, setLang] = React.useState("");

  const handleChange = (event) => {
    setLang(event.target.value);
  };
  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        height: "fit-content",
        minHeight: "713px",
      }}
    >
      <div style={titleStyle}>Create Product</div>
      <div
        style={{
          backgroundColor: "white",
          height: "500px",
          padding: "16px",
          margin: "16px",
          gap: "20px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "14px",
          gap: "16px",
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          minHeight: "500px",
        }}
      >
        <div>
          <div class="type_wrapper">
            <div class="type_container">
              <img
                src="https://dev-api.eunimart.com/files/images/logistics.png"
                onClick={onClickVoice}
              ></img>
              <p>Voice Recording</p>
              {ShowVoice && (
                <div>
                  <SingleFileUpload
                    setimageUpload={setimageUpload}
                    setfileUpload={setfileUploadVoice}
                  />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Language
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={lang}
                      onChange={handleChange}
                      label="Language"
                    >
                      {languageTypeData.map((o) => {
                        return (
                          <MenuItem value={o?.lookup_code}>
                            {o?.display_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <AudioReactRecorder
                    state={recordState}
                    onStop={onStop}
                    canvasWidth="100"
                    canvasHeight="30"
                    backgroundColor="white"
                    foregroundColor="skyblue"
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <button onClick={startfun}>Start</button>
                    <button onClick={stopfun}>
                      {/* <a href={mediaBlobUrl} download="filename.mp3"></a> */}
                      Stop
                    </button>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <audio
                      src={mediaBlobUrl}
                      controls
                      style={{ height: "50px", width: "215px" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div class="type_container" id="hello">
              <img
                src="https://dev-api.eunimart.com/files/images/operation_solutions.png"
                onClick={onClickImage}
              ></img>
              <p>Image</p>
              {ShowImage && (
                <SingleFileUpload
                  setimageUpload={setimageUpload}
                  setfileUpload={setfileUploadImage}
                />
              )}
            </div>

            <div class="type_container">
              <img
                src="https://dev-api.eunimart.com/files/images/grow_with_whatsapp.png"
                onClick={onClickText}
              ></img>
              <p>Text</p>
              {ShowText && (
                <TextField
                  id="outlined-basic"
                  label="Enter text"
                  variant="outlined"
                  onChange={(e) => {
                    handleTextChange(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
          <div style={{ alignContent: "flex-end", textAlign: "end" }}>
            {(ShowVoice || ShowImage || ShowText) && (
              // <button onClick={handleSubmitButton}>Submit</button>
              <Button
                variant="contained"
                onClick={handleSubmitButton}
                style={{ textTransform: "none", margin: "16px" }}
              >
                Search
              </Button>
            )}
          </div>
        </div>
        <div style={titleStyle}>Search Result</div>

        <div class="result_wrapper">
          {ProductsList.map((o) => {
            return (
              <div
                class="result_container"
                onClick={() => {
                  // dispatch(
                  //   load_product_details(
                  //     //   {
                  //     //   brand_owner_name: o?.brand_owner_name,
                  //     //   category_id: o?.category_id,
                  //     //   id: o?.id,
                  //     //   images: o?.images,
                  //     //   listed_value: o?.listed_value,
                  //     //   long_desc: o?.long_desc,
                  //     //   misspelled_title: o?.misspelled_title,
                  //     //   name: o?.name,
                  //     //   nutritional_info: o?.nutritional_info,
                  //     //   price: o?.price,
                  //     // }
                  //     o
                  //   )
                  // );
                  // navigate("/catalog");
                  setproductData(o);
                  setStep(1);
                }}
              >
                <p>{o?.name}</p>
                <img src={o?.images ? o?.images.split(",")[0] : ""}></img>
              </div>
            );
          })}
          {/* <div class="result_container">
            <p>Shirt SKU-100</p>
            <img src="https://freepngimg.com/download/dress_shirt/7-2-dress-shirt-png-hd.png"></img>
          </div>

          <div class="result_container">
            <p>Shirt SKU-100</p>
            <img src="https://freepngimg.com/download/dress_shirt/7-2-dress-shirt-png-hd.png"></img>
          </div>

          <div class="result_container">
            <p>Shirt SKU-100</p>
            <img src="https://freepngimg.com/download/dress_shirt/7-2-dress-shirt-png-hd.png"></img>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

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