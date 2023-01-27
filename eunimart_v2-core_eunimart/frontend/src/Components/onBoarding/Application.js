import React, { useEffect, useState } from "react";
import AppCards from "./AppCards";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Button } from "@mui/material";
import {
  Save_Purchase_Order_Data,
  loadcompanyTypeDomain,
  savekycDetails,
  saveondckycDetails,
} from "../../redux/action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Application({ setStep }) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState(0);
  // const [selectedDoimain, setSelectedDomain] = useState([]);
  // const [Domain, setDomain] = useState([]);
  const [Domain, setDomain] = useState([]);

  const { domainTypeData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadcompanyTypeDomain());
  }, []);

  // console.log("domainTypeData", domainTypeData);

  // const [Domain, setDomain] = useState([
  //   {
  //     id: "1",
  //     title: "Application Onboarding",
  //     desc: "Retail is the sale of goods and services to consumers ",
  //     url: "https://dev-api.eunimart.com/files/images/application_onboarding.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 1).length > 0 ? true : false,
  //     // selected: selectedDomain == "local_retail" ? true : false,
  //   },
  //   {
  //     id: "2",
  //     title: "Connect with siva",
  //     desc: "Retail is the sale of goods and services to consumers ",
  //     url: "https://dev-api.eunimart.com/files/images/connect_with_siva.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 1).length > 0 ? true : false,
  //     // selected: selectedDomain == "local_retail" ? true : false,
  //   },
  //   {
  //     id: "3",
  //     title: "Retail ",
  //     desc: "Retail is the sale of goods and services to consumers ",
  //     url: "https://dev-api.eunimart.com/files/images/retail.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 1).length > 0 ? true : false,
  //     // selected: selectedDomain == "local_retail" ? true : false,
  //   },
  //   {
  //     id: "4",
  //     title: "Retail ",
  //     desc: "Retail is the sale of goods and services to consumers ",
  //     url: "https://dev-api.eunimart.com/files/images/retail.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 1).length > 0 ? true : false,
  //     // selected: selectedDomain == "local_retail" ? true : false,
  //   },
  //   {
  //     id: "5",
  //     title: "Logistics  ",
  //     desc: "Logistics is generally the detailed organization and implementation... ",
  //     url: "https://dev-api.eunimart.com/files/images/logistics.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 2).length > 0 ? true : false,
  //     // selected: selectedDomain == "mobility" ? true : false,
  //   },
  //   {
  //     id: "6",
  //     title: "Logistics  ",
  //     desc: "Logistics is generally the detailed organization and implementation... ",
  //     url: "https://dev-api.eunimart.com/files/images/logistics.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 2).length > 0 ? true : false,
  //     // selected: selectedDomain == "mobility" ? true : false,
  //   },
  //   {
  //     id: "7",
  //     title: "Logistics  ",
  //     desc: "Logistics is generally the detailed organization and implementation... ",
  //     url: "https://dev-api.eunimart.com/files/images/logistics.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 2).length > 0 ? true : false,
  //     // selected: selectedDomain == "mobility" ? true : false,
  //   },
  //   {
  //     id: "8",
  //     title: "Logistics  ",
  //     desc: "Logistics is generally the detailed organization and implementation... ",
  //     url: "https://dev-api.eunimart.com/files/images/logistics.png",
  //     imgLoc: "top",
  //     selected:
  //       selectedDoimain?.filter((o) => o == 2).length > 0 ? true : false,
  //     // selected: selectedDomain == "mobility" ? true : false,
  //   },
  // ]);

  useEffect(() => {
    var temp = domainTypeData.map((o) => {
      return {
        id: o?.id,
        title: o?.display_name,
        desc: "Logistics is generally the detailed organization and implementation... ",
        url:
          "https://dev-api.eunimart.com/files/images/" +
          o?.lookup_code +
          ".png",
        imgLoc: "top",
        // selected:
        //   selectedDoimain?.filter((o) => o == 2).length > 0 ? true : false,
        selected: selectedDomain == o.id ? true : false,
      };
    });

    setDomain(temp);
  }, [domainTypeData, selectedDomain]);

  // console.log("Domain", Domain);
  // console.log("selectedDoimain", selectedDomain);
  // console.log("selectedOption", selectedOption);

  const options = [
    {
      id: 1,
      url: "https://dev-api.eunimart.com/files/images/build_with_siva.png",
      title: "Build with Siva",
      desc: "Built with Siva framework for ultimate performance and ONDC compatibility with total freedom.",
      imgLoc: "right",
      selected: selectedOption == 1 ? true : false,
    },
    {
      id: 2,
      title: "Connect Siva",
      desc: "Get up & running with the latest ONDC compliant standards in just a few clicks. Join with what you have already build.",
      url: "https://dev-api.eunimart.com/files/images/connect_with_siva.png",
      imgLoc: "right",
      selected: selectedOption == 2 ? true : false,
    },
  ];

  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "50%",
            zIndex: "1",
          }}
        >
          <img
            src="https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
            style={{
              // height: "100px",
              width: "150px",
              padding: "20px",
            }}
            alt="siva"
          />
        </div>

        <div
          style={{
            width: "40vw",
            background: "#BABEC8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://dev-api.eunimart.com/files/images/buyer_onboarding.png"
            style={{
              // width: "30vw",
              height: "80vh",
              opacity: "0.6",
              pointerEvent: "none",
            }}
          />
        </div>
        <div
          style={{
            width: "60vw",
            minHeight: "100vh",
            background: "#F5F5F5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <div>
            <h2
              style={{
                color: "#001661",
                fontSize: "25px",
                fontWeight: "700",
                fontFamily: "Poppins",
                textAlign: "center",
                paddingBottom: "10px",
              }}
            >
              Select your Domain
            </h2>
            <div
              style={{
                width: "55vw",
                display: "flex",
                // flex
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1vw",
                flexWrap: "wrap",
                alignContent: "stretch",
                flexDirection: "row",
              }}
            >
              {Domain.map((o) => {
                return (
                  <div
                    // onClick={() => {
                    //   setDomain(
                    //     Domain.map((items) => {
                    //       if (items.id == o.id) {
                    //         return { ...items, selected: !items.selected };
                    //       }
                    //       return items;
                    //     })
                    //   );
                    //   const x =
                    //     selectedDoimain.filter((x) => x == o.id).length > 0
                    //       ? o.id
                    //       : null;
                    //   // console.log("xVal", x);
                    //   if (x) {
                    //     // console.log(
                    //     //   selectedDoimain.filter((x) => x != o.id),
                    //     //   "listed Data"
                    //     // );
                    //     setSelectedDomain(
                    //       selectedDoimain.filter((x) => x != o.id)
                    //     );
                    //   } else {
                    //     // console.log(
                    //     //   [...selectedDoimain, o.id],
                    //     //   "listedadded Data"
                    //     // );
                    //     setSelectedDomain([...selectedDoimain, o.id]);
                    //   }
                    // }}
                    onClick={() => {
                      setSelectedDomain(o.id);
                    }}
                  >
                    <AppCards
                      imgLoc={o.imgLoc}
                      title={o.title}
                      size={{
                        width: "170px",
                        height: "130px",
                      }}
                      minWidth="100px"
                      titleSize="16px"
                      titlePos="center"
                      imageHeight="70px"
                      url={o.url}
                      // size={{ width: "35vw", height: "100%" }}
                      selected={o.selected}
                    />
                  </div>
                );
              })}
            </div>

            <div>
              <h2
                style={{
                  color: "#001661",
                  fontSize: "25px",
                  fontWeight: "700",
                  fontFamily: "Poppins",
                  textAlign: "center",
                  paddingBottom: "10px",
                  paddingTop: "25px",
                }}
              >
                What would you opt for ?
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  gap: "1vw",
                }}
              >
                <div
                  style={{
                    width: "55vw",
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {options?.map((o) => {
                    return (
                      <div
                        onClick={() => {
                          setSelectedOption(o.id);
                        }}
                      >
                        <AppCards
                          imgLoc={o.imgLoc}
                          title={o.title}
                          desc={o.desc}
                          titleSize="22px"
                          url={o.url}
                          size={{ width: "25vw", minHeight: "180px" }}
                          selected={o.selected}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  paddingTop: "15px",
                  paddingBottom: "20px",
                }}
              >
                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowRightOutlinedIcon />}
                  onClick={() => {
                    // var x = domainTypeData.find(
                    //   (o) => o.lookup_code == selectedDomain
                    // ).id;
                    // dispatch(Save_Purchase_Order_Data({ domain_id: x }));
                    if (selectedOption != 2) {
                      setStep(selectedOption);
                    }
                    if (selectedOption == 2) {
                      dispatch(
                        savekycDetails({
                          company_details: {
                            domain_id: selectedDomain,
                          },
                        })
                      );
                      history.push("/home");
                    }

                    // console.log("imClicked");
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
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