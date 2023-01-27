import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="dashboard_pie_value"
      >
        {payload.value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 1}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default class MultiPieChart extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div>
        <div className="dashboard_reports_whole_container">
          <div className="dashboard_reports_head">
            <p className="dashboard_report_headings_each">{this.props.head}</p>
            <ArrowCircleRightIcon className="dashboard_reports_icon" />
          </div>
          <div className="dashboard_reports_container">
            <div>
              <PieChart width={400} height={300}>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={this.props.data}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={this.onPieEnter}
                >
                  {this.props.data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="dashboard_multipie_details">
              {this.props.data?.map((o) => {
                return (
                  <div className="dashboard_each_detail">
                    <CircleIcon
                      fontSize="smallest"
                      className="icon dashboard_reports_icon_color"
                      sx={{ color: o.color }}
                    />
                    <div>{o.name} </div>
                    <div>{o.value}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
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