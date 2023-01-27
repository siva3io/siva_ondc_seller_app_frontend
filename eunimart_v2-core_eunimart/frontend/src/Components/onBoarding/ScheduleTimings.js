import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import MatSwitch from "./MatSwitch";
export default function ScheduleTimings({ data1, setData }) {
  const [data2, setData2] = useState(0);

  useEffect(() => {
    console.log("---------in Schedule_______");
  }, [data2]);

  const handelTimeChange = (index1, index2, index3, key, value) => {
    console.log(index1, index2, key, value, "index1, index2, key, value");
    var newMainData = data1;
    console.log(newMainData[index1]["value"][index2][1]["value"], "vlue");
    // newMainData[index1]["value"][index2][index3]["value"] =new Date(value).toISOString();
    newMainData[index1]["value"][index2][index3]["value"] = new Date(value);
    setData(newMainData);
    setData2(data2 + 1);
  };

  const handelToggleChange = (value, index) => {
    var newTimings = data1;
    newTimings[index].isClosed = value;
    setData(newTimings);
    setData2(data2 + 1);
  };

  function handelAdd(key, index) {
    setData2(data2 + 1);
    console.log("added");
    var newData = data1;
    var temp = newData[index];
    temp = { ...temp, value: [...temp["value"], rows] };
    newData[index] = temp;
    setData(newData);
    console.log(data1, "--data--");
  }

  const rows = [
    {
      label: "Opens at",
      type: "time",
      key: "open_at",
      value: "",
    },
    {
      label: "Closes at",
      type: "time",
      key: "close_at",
      value: "",
    },
  ];
  return (
    <>
      {data1.map((data, index) => {
        {
          /* console.log(data, index, "$$$$$$"); */
        }
        return (
          <div
            style={{
              display: "flex",
              height: "100%",
              gap: "5vw",
              marginTop: "2vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "10%",
                gap: "15px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                {data.label}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  gap: "5px",
                }}
              >
                <MatSwitch
                  label={data?.isClosed ? "Open" : "Close"}
                  name={data?.key}
                  value={data?.isClosed}
                  onChange={(newValue) => {
                    handelToggleChange(!data?.isClosed, index);
                    // handelToggleChange(field,newValue);
                  }}
                />
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "3vh" }}
            >
              {data.value?.map((o, index2) => {
                {
                  /* console.log("----------------", o); */
                }
                return (
                  <div style={{ display: "flex" }}>
                    {o?.map((item, index3) => {
                      {
                        /* console.log("*******", item); */
                      }

                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div>{item.label}</div>
                          <span style={{ marginRight: 20 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label=""
                                value={item.value}
                                onChange={(newValue) => {
                                  // console.log("newValue", newValue);
                                  handelTimeChange(
                                    index,
                                    index2,
                                    index3,
                                    item.key,
                                    newValue
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div
              style={{ marginTop: "40px", cursor: "pointer" }}
              onClick={() => {
                handelAdd(data.key, index);
              }}
            >
              <AddIcon style={{ fontSize: "30px" }} />
            </div>
          </div>
        );
      })}
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