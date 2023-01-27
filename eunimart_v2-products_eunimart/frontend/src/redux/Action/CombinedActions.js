import * as types from "./ActionType";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import GLOBAL_API_SOURCE from "../../GlobalApi";
let base_URL = GLOBAL_API_SOURCE.url;

const getPricingData = data => ({
  type: types.PRICING_VIEW_DATA,
  payload: data,
});

export const PricingData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(
        `${base_URL}/api/v1/products/variant/${s1}/filter_module/price_list`,
        { headers }
      )
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getPricingData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getPurchaseReturns = data => ({
  type: types.PURCHASE_RETURNS_DATA,
  payload: data,
});

export const PurchaseReturns = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/purchase_orders/${s1}/history`, { headers })
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getPurchaseReturns(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getSalesReturns = data => ({
  type: types.SALES_RETURNS_DATA,
  payload: data,
});

export const SalesReturnsData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/sales_returns/${s1}/history`, { headers })
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getSalesReturns(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getSalesHistory = data => ({
  type: types.SALES_HISTORY_DATA,
  payload: data,
});

export const SalesHistoryData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/sales_orders/${s1}/history`, { headers })
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getSalesHistory(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getProductViewBundleData = data => ({
  type: types.PRODUCT_BUNDLE_VIEW_DATA,
  payload: data,
});

export const ProductBundleData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/products/variant/${s1}/filter_module/bundles`, {
        headers,
      })
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getProductViewBundleData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getProductsWholeData = data => ({
  type: types.PRODUCT_WHOLE_DATA,
  payload: data,
});

export const productsWholeData = (params, ondc) => {
  console.log("s1s1", params);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userTypeValue =
      userData?.user_types.length > 0 &&
      userData?.user_types[0]?.name.toUpperCase().includes("ADMIN")
        ? true
        : false;

    userTypeValue
      ? axios
          .get(
            `${base_URL}api/v1/products/admin/variant?per_page=${params.limit}&page_no=${params.offset}`,
            {
              headers,
            }
          )
          .then(resp => {
            console.log("resprespresp product_list", resp);
            dispatch(getProductsWholeData(resp));
          })
          .catch(error => console.log(error))
      : axios
          .get(
            `${base_URL}/api/v1/products/variant?per_page=${params.limit}&page_no=${params.offset}` +
              `${
                ondc == true
                  ? '&filters=[["channel","ilike","ONDC"]]'
                  : // : '&filters=[["channel","ilike","EUNIMART"]]'
                    ""
              }`,
            { headers }
          )
          .then(resp => {
            console.log("resprespresp", resp);
            dispatch(getProductsWholeData(resp.data));
          })
          .catch(error => console.log(error));
  };
};

const getStateDataById = data => ({
  type: types.STATE_LIST,
  payload: data,
});

export const loadStateDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}api/v1/core/states/` + Id, { headers })
      .then(resp => {
        dispatch(getStateDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// ----------------------------------------------Admin------------------------------------------------------
const getProductsAdminListData = data => ({
  type: types.PRODUCT_ADMIN_LIST_DATA,
  payload: data,
});

export const productsAdminListData = params => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(
        `${base_URL}/api/v1/products/admin/variant?per_page=${params.limit}&page_no=${params.offset}`,
        { headers }
      )
      .then(resp => {
        dispatch(getProductsAdminListData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getProductsAdminViewData = data => ({
  type: types.PRODUCT_ADMIN_VIEW_DATA,
  payload: data,
});

export const productsAdminViewData = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/products/admin/variant/${id}`, { headers })
      .then(resp => {
        dispatch(getProductsAdminViewData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getProductsDetailsViewData = data => ({
  type: types.PRODUCT_DETAILS_VIEW_DATA,
  payload: data,
});

export const productsDetailsViewData = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(
        `${GLOBAL_API_SOURCE.ondc_url}api/v1/ondc/product_view/AUDI_Shoes_TECH`,
        { headers }
      )
      .then(resp => {
        dispatch(getProductsDetailsViewData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//new time within
const getTimeWithin = data => ({
  type: types.TIME_WITHIN_DATA,
  payload: data,
});

export const TimeWithinData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/core/lookup_codes/time_within`, { headers })
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getTimeWithin(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//PRODUCT_FULFILLMENT
const getProductFulfilment = data => ({
  type: types.PRODUCT_FULFILMENT_DATA,
  payload: data,
});

export const ProductFulfilmentData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/core/lookup_codes/PRODUCT_FULFILLMENT`, {
        headers,
      })
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getProductFulfilment(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const getLink = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .post(
        `https://dev-api.eunimart.com/integrations/ai_data_sync/getlink`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        console.log("resp", resp);
        callback(resp.data);
      })
      .catch(error => console.log(error));
  };
};

//#region Get client_get_feedback_form
export const raise_report_api = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .post(
        `${GLOBAL_API_SOURCE.ondc_url}api/v1/ondc/clientApis/bpp/eunimart_bpp/raise_ticket`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        // callback(resp.data);
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get client_get_feedback_form


const getFullFillmentData = data => ({
  type: types.FULLFILLMENT_DATA,
  payload: data,
});

export const getFullFillData = s1 => {
  console.log("s1s1", s1);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(
        `${base_URL}/api/v1/core/lookup_codes/PRODUCT_FULFILLMENT_MANAGED_BY`,
        { headers }
      )
      .then(resp => {
        console.log("resprespresp", resp);
        dispatch(getFullFillmentData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

///-----------------------

const getFoodtypeData = data => ({
  type: types.FOOD_TYPE_DATA,
  payload: data,
});

export const getFoodtype = s1 => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/core/lookup_codes/FOOD_TYPE`, { headers })
      .then(resp => {
        dispatch(getFoodtypeData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
///-----------------------

const getPaymenttypeData = data => ({
  type: types.PAYMENT_TYPE_DATA,
  payload: data,
});

export const getPaymenttype = s1 => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/core/lookup_codes/PAYMENT_TYPE`, { headers })
      .then(resp => {
        dispatch(getPaymenttypeData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#region Sync

export const load_products_sync = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };
    axios
      .get(`${GLOBAL_API_SOURCE.url}api/v1/ondc/beckn_products_sync`, {
        headers,
      })
      .then(resp => {})
      .catch(error => console.log(error));
  };
};

//#endregion Sync

//#region rating category list

const getRatingCategoryList = data => ({
  type: types.RATING_CATEGORY_LIST,
  payload: data,
});

export const loadRatingCategoryList = s1 => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(`${base_URL}/api/v1/rating/rating_category_list`, { headers })
      .then(resp => {
        dispatch(getRatingCategoryList(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#endregion rating category list

//#region feedback

const getFeedbackData = data => ({
  type: types.FEEDBACK_LIST,
  payload: data,
});

export const loadFeedbackData = (userId, categoryId) => {
  console.log("Came hereeeeeeeeee");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    };

    axios
      .get(
        `${base_URL}/api/v1/rating/rating_list?filters=[["related_id", "=", 4], ["rating_category_id", "=", 1]]`,
        { headers }
      )
      .then(resp => {
        dispatch(getFeedbackData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#endregion feedback

// //#region Get Sales Order List
// const getProductsAdminListData = (data) => ({
//   type: types.PRODUCT_ADMIN_LIST_DATA,
//   payload: data,
// });

// export const productsAdminListData = (param) => {
//   return function (dispatch) {
//     var params = {
//       per_page: param.limit,
//       page_no: param.offset,
//       filters: param.filters,
//       sort: param.sort,
//     };

//     var headers = {
//       "Content-type": "application/json",
//       Authorization: `${GLOBAL_API_SOURCE.token}`,
//     };

//     axios
//       .get(`${base_URL}api/v1/sales_orders`, { params, headers })
//       .then((resp) => {
//         dispatch(getProductsAdminListData(resp.data));
//       })
//       .catch((error) => console.log(error));
//   };
// };
//#endregion Get Sales Order List

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

