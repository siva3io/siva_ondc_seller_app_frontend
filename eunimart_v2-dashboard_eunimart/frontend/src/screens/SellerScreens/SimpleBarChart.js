import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleBarChart = ({ data }) => {
  return (
    <div style={{ maxWidth: "1000px", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // barCategoryGap={10}
          // barGap={1}
          barSize={20}
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 50,
            right: 0,
            left: 10,
            bottom: 50,
          }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, "dataMax+20"]}
            allowDataOverflow={true}
            axisLine={false}
            tickLine={false}
          />
          {/* <Tooltip /> */}
          <Legend />
          <Bar dataKey="TotalRevenue" fill=" #649633" />
          <Bar dataKey="TotalCost" fill="#a0a583" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;

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