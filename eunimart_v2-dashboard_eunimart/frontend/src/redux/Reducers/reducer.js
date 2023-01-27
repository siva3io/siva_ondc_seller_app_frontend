import * as types from "../Actions/actionType";

const initialState = {
  productData: [],
  orderData: [],
  searchProductsData: [],
  productDetails: [],
  dashboardTypeData: [],
  languageTypeData: [],
  hsnCodesData: [],
  channelTypeData: [],
  categoryTypeData: [],
};

const DataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_TYPE:
      return {
        ...state,
        dashboardTypeData: action.payload.data,
        dashboardTypeData_meta: action.payload.meta,
        loading: false,
      };
    case types.LANGUAGE_TYPE:
      return {
        ...state,
        languageTypeData: action.payload.data,
        languageTypeData_meta: action.payload.meta,
        loading: false,
      };

    case types.PRODUCTS_LIST:
      return {
        ...state,
        productData: action.payload.data,
        productData_meta: action.payload.meta,
        loading: false,
      };
    case types.ORDERS_LIST:
      return {
        ...state,
        orderData: action.payload.data,
        orderData_meta: action.payload.meta,
        loading: false,
      };
    case types.SEARCH_PRODUCTS_LIST:
      return {
        ...state,
        searchProductsData: action.payload.data,
        loading: false,
      };
    case types.PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload.data,
        productDetails_meta: action.payload.meta,
        loading: false,
      };
    case types.HSN_CODES:
      return {
        ...state,
        hsnCodesData: action.payload.data,
        loading: false,
      };
    case types.CHANNEL_TYPES:
      return {
        ...state,
        channelTypeData: action.payload.data,
        loading: false,
      };
    case types.CATEGORY_TYPES:
      return {
        ...state,
        categoryTypeData: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};

export default DataReducers;

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