import * as types from "./actionType";
import axios from "axios";
import GLOBAL_API_SOURCE from "../GlobalApi";
var BASE_API_SOURCE = GLOBAL_API_SOURCE;
const getFeaturelistData = (data) => ({
  type: types.FEATURE_LIST,
  payload: data,
});

export const loadFeaturelistData = () => {
  console.log("called");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/FEATURE_LIST`, {
        headers,
      })
      .then((resp) => {
        dispatch(getFeaturelistData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSaveFeaturesData = (data) => ({
  type: types.SAVE_FEATURE_LIST,
  payload: data,
});

export const Save_Features_Data = (data, callback) => {
  console.log("called");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/custom_solution`,
        JSON.stringify(data),
        { headers }
      )
      // .then((resp) => {
      //   dispatch(getSaveFeaturesData(resp.data));
      // })
      .then((resp) => {
        callback(resp.data);
      })
      .catch((error) => console.log(error));
  };
};

//#region Get Currency list
const getSTDCodes = (data) => ({
  type: types.STD_CODES,
  payload: data,
});

export const loadSTDCodes = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/STD_CODES`, {
        headers,
      })
      .then((resp) => {
        dispatch(getSTDCodes(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Currency list

//#region Get companyTypeData list
const getcompanyTypeData = (data) => ({
  type: types.TYPE_OF_COMPANY,
  payload: data,
});

export const loadcompanyTypeData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/TYPE_OF_COMPANY`, {
        headers,
      })
      .then((resp) => {
        dispatch(getcompanyTypeData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get companyTypeData list

//#region Get UserTypeData list
const getUserTypeData = (data) => ({
  type: types.TYPE_OF_USER,
  payload: data,
});

export const loadUserTypeData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/TYPE_OF_USER`, {
        headers,
      })
      .then((resp) => {
        dispatch(getUserTypeData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get UserTypeData list

//#region Get companyTypeData list
const getcompanyTypeDomain = (data) => ({
  type: types.TYPE_OF_DOMAIN,
  payload: data,
});

export const loadcompanyTypeDomain = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/TYPE_OF_DOMAIN`, {
        headers,
      })
      .then((resp) => {
        dispatch(getcompanyTypeDomain(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get companyTypeData list

const savecompanyTypeDomain = (data) => ({
  type: types.SAVE_TYPE_OF_DOMAIN,
  payload: data,
});
export const Save_Purchase_Order_Data = (data) => {
  console.log("sdfghj", data);
  return function (dispatch) {
    console.log("sdfghj11", data);
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/ondc/update`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        console.log(resp, "response");
        dispatch(savecompanyTypeDomain(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getkycDetails = (data) => ({
  type: types.SAVE_KYC_DETAILS,
  payload: data,
});
export const savekycDetails = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/company/${
          JSON.parse(localStorage.getItem("user_data"))?.company_id
            ? JSON.parse(localStorage.getItem("user_data"))?.company_id
            : 1
        }/update`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        dispatch(getkycDetails(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const createNewLocation = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/locations/create`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        dispatch(getkycDetails(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getondckycDetails = (data) => ({
  type: types.SAVE_ONDC_KYC_DETAILS,
  payload: data,
});
export const saveondckycDetails = (id, data) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/company/${JSON.parse(localStorage.getItem("user_data"))?.company_id }/register_ondc`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        dispatch(getondckycDetails(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const checkAadharValidation = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/validate_aadhaar`,
        JSON.stringify(data),
        { headers }
      )
      .then((resp) => {
        callback(resp.data);
        // console.log(resp, "response");
      })
      .catch((error) => console.log(error));
  };
};

//#region Get sellers list
const getSellerApps = (data) => ({
  type: types.SELLERS_APP_LIST,
  payload: data,
});

export const loadSellersList = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/ondc/seller_apps/list`, {
        headers,
      })
      .then((resp) => {
        dispatch(getSellerApps(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//#endregion Get sellers list

//#region Get sellers list
const getIndianStates = (data) => ({
  type: types.INDIAN_STATES,
  payload: data,
});

export const loadStates = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/states/100`, {
        headers,
      })
      .then((resp) => {
        dispatch(getIndianStates(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getLocationtypeData = (data) => ({
  type: types.LOCATION_TYPE_LIST,
  payload: data,
});

export const loadLocationstypeData = () => {
  console.log("called");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/location_type`, {
        headers,
      })
      .then((resp) => {
        dispatch(getLocationtypeData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getContactPropertiesData = (data) => ({
  type: types.CONTACT_PROPERTIES,
  payload: data,
});

export const loadContactPropertiesData = () => {
  console.log("called");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/CONTACT_PROPERTIES`,
        {
          headers,
        }
      )
      .then((resp) => {
        dispatch(getContactPropertiesData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const sendSelectedType = (data) => {
  // console.log("called");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };
    axios
      .post(`${BASE_API_SOURCE.url}auth/${localStorage.getItem("user_id")}/update_user`, JSON.stringify(data), {
        headers,
      })
      .then((resp) => {
      })
      .catch((error) => console.log(error));
  };
};

const get_dashboard_type = (data) => ({
  type: types.DASHBOARD_TYPE,
  payload: data,
});
export const load_dashboard_type = () => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}auth/me`, { headers })
      .then((resp) => {
        console.log(resp?.data?.data?.token, "samplecd");
        localStorage.setItem("token", resp.data?.data?.token);
        dispatch(get_dashboard_type(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const get_dashboard_type2 = (data) => ({
  type: types.DASHBOARD_TYPE_2,
  payload: data,
});
export const load_dashboard_type2 = () => {
  return function(dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " +`${localStorage.getItem("token")}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}auth/me`, { headers })
      .then((resp) => {
        console.log(resp?.data?.data?.token, "samplecd");
        localStorage.setItem("token", resp.data?.data?.token);
        dispatch(get_dashboard_type2(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// export const checkAadharValidation = (data, callback) => {
//   return function (dispatch) {
//     var headers = {
//       "Content-type": "application/json",
//       Authorization: "Bearer " +`${localStorage.getItem("token")}`,
//     };

//     axios
//       .post(
//         `${BASE_API_SOURCE.url}api/v1/core/validate_aadhaar`,
//         JSON.stringify(data),
//         { headers }
//       )
//       .then((resp) => {
//         //dispatch(getSave_Sales_Order_Data(resp.data));
//         // const result = {
//         //   status: resp.status + "-" + resp.statusText,
//         //   headers: resp.headers,
//         //   data: resp.data.meta.message,
//         // };
//         callback(resp);
//       })
//       .catch((error) => {
//         callback(error.response?.data.meta.message || error);
//       });
//   };
// };

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
