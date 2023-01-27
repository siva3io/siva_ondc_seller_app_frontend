import * as types from "./actionType";

const initialState = {
  stdCodesData: [],
  companyTypeData: [],
  domainTypeData: [],
  tokenData: [],
  userTypeData: [],
  loading: false,
  indianStates: [],
  locationTypes: [],
  featureList: [],
  contactPropertiesData: [],
  dashboardTypeData: [],
  sellerApp:[],
  tokenOndcData: [],
  dashboardTypeData2:[]

};

const ONDCReducers = (state = initialState, action) => {
  //console.log("action.payload", action.payload)
  switch (action.type) {
    case types.STD_CODES:
      return {
        ...state,
        stdCodesData: action.payload.data,
        loading: false,
      };
    case types.TYPE_OF_COMPANY:
      return {
        ...state,
        companyTypeData: action.payload.data,
        loading: false,
      };

    case types.TYPE_OF_DOMAIN:
      console.log(action.payload.data, "action.payload");
      return {
        ...state,
        domainTypeData: action.payload.data,
        loading: false,
      };
    case types.SAVE_KYC_DETAILS:
      return {
        ...state,
        tokenData: action.payload.data,
        loading: false,
      };
    case types.TYPE_OF_USER:
      return {
        ...state,
        userTypeData: action.payload.data,
        loading: false,
      };
    case types.SELLERS_APP_LIST:
      return {
        ...state,
        sellerApp: action.payload.data,
        loading: false,
      };
    case types.INDIAN_STATES:
      return {
        ...state,
        indianStates: action.payload.data,
        loading: false,
      };
    case types.LOCATION_TYPE_LIST:
      return {
        ...state,
        locationTypes: action.payload.data,
        loading: false,
      };
    case types.FEATURE_LIST:
      return {
        ...state,
        featureList: action.payload.data,
        loading: false,
      };
    case types.CONTACT_PROPERTIES:
      return {
        ...state,
        contactPropertiesData: action.payload.data,
        loading: false,
      };
      case types.DASHBOARD_TYPE:
      return {
        ...state,
        dashboardTypeData: action.payload.data,
        loading: false,
      };
      case types.SAVE_ONDC_KYC_DETAILS:
      return {
        ...state,
        tokenOndcData: action.payload.data,
        loading: false,
      };
      case types.DASHBOARD_TYPE_2:
        console.log(action.payload.data,"In me 2")
      return {
        ...state,
        dashboardTypeData2: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
export default ONDCReducers;

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
