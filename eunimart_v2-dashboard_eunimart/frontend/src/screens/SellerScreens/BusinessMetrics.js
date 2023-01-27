import React from "react";
import SimpleBarChart from "./SimpleBarChart";
import "./MainPage.css";
import MetricsMultiPie from "./MetricsMuliPie";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
const data = [
  {
    name: "Jan",
    TotalCost: 45,
    TotalRevenue: 80,
  },
  {
    name: "Feb",
    TotalCost: 10,
    TotalRevenue: 65,
  },
  {
    name: "Mar",
    TotalCost: 58,
    TotalRevenue: 20,
  },
  {
    name: "Apr",
    TotalCost: 30,
    TotalRevenue: 40,
  },
  {
    name: "May",
    TotalCost: 30,
    TotalRevenue: 60,
  },
  {
    name: "June",
    TotalCost: 30,
    TotalRevenue: 70,
  },
  {
    name: "July",
    TotalCost: 10,
    TotalRevenue: 20,
  },
  {
    name: "Aug",
    TotalCost: 30,
    TotalRevenue: 50,
  },
  {
    name: "Sep",
    TotalCost: 10,
    TotalRevenue: 50,
  },
  {
    name: "Oct",
    TotalCost: 10,
    TotalRevenue: 30,
  },
  {
    name: "Nov",
    TotalCost: 10,
    TotalRevenue: 50,
  },
  {
    name: "Dec",
    TotalCost: 10,
    TotalRevenue: 30,
  },
];

const salesData = [
  {
    name: "Ecommerce Sales",
    color: "#416BFF",
    value: 35.8,
  },
  {
    name: "Retail Sales",
    color: "#649633",
    value: 34.2,
  },
  { name: "Crossborder Sales", value: 20, color: "#FABA1E" },

  { name: "Purchase Returns", value: 20, color: "#001661" },

  { name: "Sales Returns", value: 7.8, color: "#FC817C" },
];
const orderData = [
  {
    name: "Sales Order",
    color: "#FABA1E",
    value: 34.2,
  },
  {
    name: "Purchase Order",
    color: "#CB7195",
    value: 35.8,
  },
  { name: "Delivery Order", value: 20, color: "#416BFF" },

  { name: "Purchase Returns", value: 7.8, color: "#54DFFF" },

  { name: "Sales Returns", value: 8, color: "#001661" },
];

const BusinessMetrics = () => {
  return (
    <div>
      {/* <div className="dashboard_onboarding_metrics">
        <div className="dashboard_onboarding_header">
          <p className="dashboard_onboarding_head">Onboarding checklist</p>
        </div>

        <DoublePieCustomized
          tag="Few of your onboarding questions are remaining. This will help you to get along smoothly.
          You just have to answer 5 more questions."
          achieved={72}
          achieved_color="black"
          unachieved_color="red"
        />
        <button className="dashboard_onboarding_button">
          Continue Onboarding
        </button>
      </div> */}
      <div>
        <div className=" container_2">
          <div>
            <div className="dashboard_businees_metrics_page">
              <div className="dashboard_business_metrics">
                <form className="dashboard_metrics_input_field">
                  <input
                    placeholder="Search metrics"
                    className="dashboard_input_field"
                  />
                  <FilterAltIcon className="dashboard_input_field_icon" />
                </form>
                <div className="dashboard_bargraph_container">
                  <div className="dashboard_title_container">
                    <p className="dashboard_business_metrics_subtitle ">
                      Total Revenue vs Total Cost
                    </p>
                    <div className="dashboard_bargraph_category">
                      <div className="dashboard_bargraph_each_category ">
                        Daily
                      </div>
                      <div className="category_bar"></div>
                      <div className="dashboard_bargraph_each_category ">
                        Weekly
                      </div>
                      <div className="category_bar"></div>
                      <div className="dashboard_bargraph_selected dashboard_bargraph_each_category">
                        Monthly
                      </div>
                    </div>
                  </div>

                  <SimpleBarChart data={data} />
                </div>
              </div>
              <div className="dashboard_business_metrics_right_side">
                <div className="dashboard_business_metrics_piecharts">
                  <MetricsMultiPie
                    className="metrics_page_chart"
                    head="Outstanding Payables"
                    data={salesData}
                  />
                </div>
                <div className="dashboard_business_metrics_piecharts">
                  <MetricsMultiPie
                    head="Outstanding receivables"
                    data={orderData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMetrics;

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