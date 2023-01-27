import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { PieChart, Pie, Cell } from "recharts";

const DoublePieChart = ({ tag, achieved }) => {
  const data = [
    { name: "Achieved", value: achieved },
    { name: "To be achieved", value: 100 - achieved },
  ];
  // console.log(data);
  const COLORS = ["#72AB3A", "#416BFF"];
  return (
    <div>
      <div className="dashboard_goals_container">
        {/* <div className="dashboard_pie_container">{achieved}%</div> */}
        <div>
          <PieChart width={200} height={400} className="dashboard_pie_chart">
            <Pie
              data={data}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div>
          <p className="dashboard_goals_data">{tag}</p>
          <div className="dashboard_goals_tags_container">
            <CircleIcon
              fontSize="smallest"
              className="icon dashboard_goals_icon1"
            />
            <p className="dashboard_goals_tags">Achieved-{achieved}%</p>
          </div>
          <div className="dashboard_goals_tags_container dashboard_goals_icon2">
            <CircleIcon fontSize="smallest" />
            <p className="dashboard_goals_tags">To be achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoublePieChart;

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