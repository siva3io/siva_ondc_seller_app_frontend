import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const get_dashboard_type = (data) => ({
  type: types.DASHBOARD_TYPE,
  payload: data,
});
export const load_dashboard_type = (data) => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}auth/me`, { headers })
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_dashboard_type(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const get_language_type = (data) => ({
  type: types.LANGUAGE_TYPE,
  payload: data,
});
export const load_language_type = () => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/language_code`, {
        headers,
      })
      .then((resp) => {
        console.log(resp, "response");
        dispatch(get_language_type(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getProductData = (data) => ({
  type: types.PRODUCTS_LIST,
  payload: data,
});

export const loadProductData = (param) => {
  return function(dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`https://ondcstore.eunimart.com/api/v1/ondc_apps`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getProductData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getOrderData = (data) => ({
  type: types.ORDERS_LIST,
  payload: data,
});

export const loadOrderData = (param) => {
  return function(dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_orders`, { params, headers })
      .then((resp) => {
        dispatch(getOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getProductsListData = (data) => ({
  type: types.SEARCH_PRODUCTS_LIST,
  payload: data,
});
export const loadProductsListData = (data) => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}integrations/ai_data_sync/related_products`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(getProductsListData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const get_product_details = (data) => ({
  type: types.PRODUCT_DETAILS,
  payload: data,
});
export const load_product_details = (data) => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}integrations/ai_data_sync/getpayload`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_product_details(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const save_product_details = (data) => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/products/create`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        console.log(resp, "response");
        // dispatch(get_product_details(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


// -----------------------------------------------------------------------------------

const get_hsn_codes = (data) => ({
  type: types.HSN_CODES,
  payload: data,
});
export const load_hsn_codes = () => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    var params = {
      per_page: 1000,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/hsn`, {
        params,
        headers,
      })
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_hsn_codes(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const get_channel_type = (data) => ({
  type: types.CHANNEL_TYPES,
  payload: data,
});
export const load_channel_type = () => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/channels`, {
        headers,
      })
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_channel_type(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const get_categories = (data) => ({
  type: types.CATEGORY_TYPES,
  payload: data,
});
export const load_categories = () => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/category/dropdown`, {
        headers,
      })
      .then((resp) => {
        // console.log(resp, "response");
        dispatch(get_categories(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

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