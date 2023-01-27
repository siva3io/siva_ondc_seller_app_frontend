import { border, borderRight } from "@mui/system";
import React from "react";
import "./VerticalStepper.css";

const VerticalStepper = ({ steps }) => {
  // console.log("props", steps);
  return (
    <div>
      {steps?.map((o) => {
        // console.log(o);
        return (
          <div className="step">
            <div>
              {o?.successor ? (
                <div
                  style={{
                    borderRight: "2px solid",
                    // height: `${100 / steps.length}%`,
                    height: "60px",
                    width: "0px",
                    paddingLeft: "10px",
                    color: "#001661",
                  }}
                ></div>
              ) : (
                <></>
              )}
              <div class="circle">
                <div
                  style={{
                    padding: "0px",
                    paddingLeft: "2px",
                    color: "#001661",
                  }}
                >
                  {o.icon}
                </div>
              </div>
            </div>
            <div>
              <div class="title">{o.title}</div>
              <div class="caption">{o.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VerticalStepper;

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