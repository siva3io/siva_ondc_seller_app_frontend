import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

//#region Get Sales Order List
const getSalesData = data => ({
  type: types.SALES_LIST,
  payload: data,
});

export const loadSalesData = param => {
  return function (dispatch) {
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
      .then(resp => {
        dispatch(getSalesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Sales Order List

//#region Get Sales Order Data By Id
const getSalesDataById = data => ({
  type: types.SALES_VIEW,
  payload: data,
});

export const loadSalesDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + Id, { headers })
      .then(resp => {
        dispatch(getSalesDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

//#region Get Currency list
const getCurrencyData = data => ({
  type: types.CURRENCY_TYPE,
  payload: data,
});

export const loadCurrencyData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/currencies`, { headers })
      .then(resp => {
        dispatch(getCurrencyData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Currency list

//#region Get Country list
const getCountryData = data => ({
  type: types.COUNTRY_LIST,
  payload: data,
});

export const loadCountryData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/countries`, { headers })
      .then(resp => {
        dispatch(getCountryData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Currency list

//#region Get State Data By Id
const getStateDataById = data => ({
  type: types.STATE_LIST,
  payload: data,
});

export const loadStateDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/states/` + Id, { headers })
      .then(resp => {
        dispatch(getStateDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get State Data By Id

//#region Get Payment Terms list
const getPaymentTermsData = data => ({
  type: types.PAYMENT_TERMS_LIST,
  payload: data,
});

export const loadPaymentTermsData = type => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/` + type, {
        headers,
      })
      .then(resp => {
        dispatch(getPaymentTermsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Payment Terms list

//#region Get vendors list
const getGeneralSettings = data => ({
  type: types.GENERAL_SETTINGS,
  payload: data,
});

export const loadGeneralSettings = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/company_preferences/1`, {
        headers,
      })
      .then(resp => {
        dispatch(getGeneralSettings(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get vendors list

//#region Get vendors Data By Id
const getInvoiceData = data => ({
  type: types.INVOICE_DETAILS,
  payload: data,
});

export const loadInvoiceData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/invoice_generation`)
      .then(resp => {
        dispatch(getInvoiceData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get vendors Data By Id

//#region Get uom list
const getFilePreference = data => ({
  type: types.FILE_PREFERENCE,
  payload: data,
});

export const loadFilePrefences = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/apps/installed?per_page=100&page_no=1&filters=[["category_name","ilike","cloud"], ["app_services","@>","[\\"STORAGE\\"]"]]`,
        { headers }
      )
      .then(resp => {
        dispatch(getFilePreference(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getFilePreferenceCodes = data => ({
  type: types.FILE_CODES,
  payload: data,
});

export const loadFilePrefencesCodes = param => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/file_services`, {
        headers,
      })
      .then(resp => {
        dispatch(getFilePreferenceCodes(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getBusinessTypes = data => ({
  type: types.BUSINES_TYPES,
  payload: data,
});

export const businessTypes = param => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/type_of_business`, {
        headers,
      })
      .then(resp => {
        dispatch(getBusinessTypes(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const auth = data => ({
  type: types.AUTH_ME,
  payload: data,
});

export const loadAuthData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjozLCJjb21wYW55X2lkIjoxLCJleHAiOjE2NjQ3NzYxNDksImZpcnN0X25hbWUiOiJLYXVzaWMiLCJsYXN0X25hbWUiOiJNIn0.FheqQe0VjHglPFrjp_D0-8wanwUBqs-vVvl5pjUK6Lo"
    };

    axios
      .get(`${BASE_API_SOURCE.url}auth/me`, { headers })
      .then(resp => {
        console.log("resprespresp", resp.data);
        dispatch(auth(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#region Get uom list
const getSave_Sales_Order_Data = data => ({
  type: types.SAVE_SALES_ORDER,
  payload: data,
});

export const Save_Sales_Order_Data = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/company_preferences/1/update`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        //dispatch(getSave_Sales_Order_Data(resp.data));
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch(error => {
        callback(error.response?.data.meta.message || error);
      });
  };
};
//#endregion Get uom list

//#region Get uom list
const getUpdate_Order_Data = data => ({
  type: types.UPDATE_ORDER,
  payload: data,
});

export const Update_Sales_Order_Data = (id, data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/sales_orders/${id}/update`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        //dispatch(getUpdate_Order_Data(resp.data));
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch(error => {
        callback(error.response?.data.meta.message || error);
      });
  };
};
//#endregion Get uom list

//#region Get Contacts List
const getContactData = data => ({
  type: types.CONTACTS_LIST,
  payload: data,
});

export const loadContactsData = param => {
  return function (dispatch) {
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
      .get(`${BASE_API_SOURCE.url}api/v1/contacts`, { params, headers })
      .then(resp => {
        dispatch(getContactData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Contacts List

//#region Delete Data By Id
const getDeleteDataById = data => ({
  type: types.DELETE_DATA,
  payload: data,
});

export const loadDeleteDataById = (deleteId, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/sales_orders/${deleteId}/delete`, {
        headers,
      })
      .then(resp => {
        //dispatch(getDeleteDataById(resp.data));
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch(error => {
        callback(error.response?.data.meta.message || error);
      });
  };
};
//#endregion Delete Data By Id

const getPromotionHistoryData = data => ({
  type: types.PROMOTION_HISTORY_LIST,
  payload: data,
});

export const loadPromotionHistoryData = params1 => {
  return function (dispatch) {
    var params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
      filters: params1?.filters,
      sort: params1?.sort,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    var date23 = new Date();
    var todaysDate = date23.toISOString();

    axios
      .get(
        `${BASE_API_SOURCE.url}/api/v1/offers?filters=[["end_date_and_time", "<", "${todaysDate}"]]`,
        { params, headers }
      )
      .then(resp => {
        dispatch(getPromotionHistoryData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const update_settings = data => {
  return function (dispatch) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/company/${
          JSON.parse(localStorage.getItem("user_data"))?.company_id ? JSON.parse(localStorage.getItem("user_data"))?.company_id : 2
        }/update`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.meta.message,
        };
      })
      .catch(error => {});
  };
};

//#region Get Contacts List
const getOtpPreferenceList = data => ({
  type: types.OTP_PREFERENCE_LIST,
  payload: data,
});

export const loadOtpPreferenceList = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/OTP_PREFERENCES`, {
        headers,
      })
      .then(resp => {
        dispatch(getOtpPreferenceList(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Contacts List

export const createLocation = (data, id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/locations/${id ? id+"/update" :"create"}`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {})
      .catch(error => {});
  };
};

//#region Offers List
const getOffersList = data => ({
  type: types.OFFERS_LIST_DATA,
  payload: data,
});

export const loadOffersList = param => {
  var params = {
    per_page: param.limit,
    page_no: param.offset,
    filters: param.filters,
    sort: param.sort,
  };
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/offers?per_page=1000`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getOffersList(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Offers List

//#region Get Offers By Id
const getOffersDataById = data => ({
  type: types.OFFERS_VIEW_DATA,
  payload: data,
});

export const loadOffersDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/offers/` + Id, { headers })
      .then(resp => {
        dispatch(getOffersDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getDeliveryTypeDataById = data => ({
  type: types.DELIVERY_TYPE_LIST,
  payload: data,
});

export const loadDeliveryTypeDataById = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/DELIVERY_TYPE`, {
        headers,
      })
      .then(resp => {
        dispatch(getDeliveryTypeDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getDeliveryPreferencesDataById = data => ({
  type: types.DELIVERY_PREFERENCES_LIST,
  payload: data,
});

export const loadDeliveryPreferencesDataById = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/DELIVERY_TYPE_PREFERENCES`,
        { headers }
      )
      .then(resp => {
        dispatch(getDeliveryPreferencesDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getFulfillmentTypeDataById = data => ({
  type: types.FULFILLMENT_TYPE_LIST,
  payload: data,
});

export const loadFulfillmentTypeDataById = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/SHIPPING_FULFILLMENT_TYPE`, {
        headers,
      })
      .then(resp => {
        dispatch(getFulfillmentTypeDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Offers Data By Id

//variants api
const getProductVariantData = data => ({
  type: types.PRODUCT_VARIANT_LIST,
  payload: data,
});

export const loadProductVariantData = param => {
  return function (dispatch) {
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
      .get(`${BASE_API_SOURCE.url}api/v1/products/variant?per_page=1000`, { params, headers })
      .then(resp => {
        dispatch(getProductVariantData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//End of variants api

const getDiscountType = data => ({
  type: types.DISCOUNT_TYPE,
  payload: data,
});

export const loadDiscountType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/OFFERS_DISCOUNT_TYPE `,
        { headers }
      )
      .then(resp => {
        dispatch(getDiscountType(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getConditions = data => ({
  type: types.TERMS_CONDITIONS_DATA,
  payload: data,
});

export const loadConditions = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/OFFERS_TERMS_AND_CONDTONS`,
        { headers }
      )
      .then(resp => {
        dispatch(getConditions(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//promotions create start

const GetOffer = data => ({
  type: types.CREATE_OFFER,
  payload: data,
});

export const CreateOffer = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/offers/create`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        dispatch(GetOffer(resp.data));
        toast.info("Offer is Created Successfully!", {
          toastId: "Offer is Created Successfully!",
          autoClose: 2000,
        });
      })
      .catch(error => {
        toast.error("Offer is not Created");
        console.log(error);
      });
  };
};

//promotions create end

//promotions create start

const GetUpdateOffer = data => ({
  type: types.UPDATE_OFFER,
  payload: data,
});

export const UpdateOffer = (data, id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/offers/${id}/update`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        dispatch(GetUpdateOffer(resp.data));
        toast.info("Offer is Updated Successfully!", {
          toastId: "Offer is Updated Successfully!",
          autoClose: 2000,
        });
      })
      .catch(error => {
        toast.error("Offer is not Updated");
        console.log(error);
      });
  };
};

//promotions create end

const getAdminSettingsDataById = data => ({
  type: types.ADMIN_SETTINGS_VIEW,
  payload: data,
});

export const loadAdminSettingsDataById = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/company_preferences/${
          JSON.parse(localStorage.getItem("user_data"))?.company_id
            ? JSON.parse(localStorage.getItem("user_data"))?.company_id
            : 1
        }`,
        { headers }
      )
      .then(resp => {
        dispatch(getAdminSettingsDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getCitiesData = data => ({
  type: types.CITIES_LIST,
  payload: data,
});

export const loadCitiesData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.ondcUrl}/api/v1/ondc/cities`, { headers })
      .then(resp => {
        dispatch(getCitiesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#region Get loadRegisteredCompanyAddress
const getRegisteredCompanyAddress = data => ({
  type: types.REGISTERD_ADDRESS,
  payload: data,
});

export const loadRegisteredCompanyAddress = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,

    };

    axios
      .get(
        `${BASE_API_SOURCE.url}/api/v1/locations?filters=[["company_id","=",${
          JSON.parse(localStorage.getItem("user_data"))?.company_id
            ? JSON.parse(localStorage.getItem("user_data"))?.company_id
            : 1
        }],["location_type_id","=",${id ? id : 68}]]`,
        { headers }
      )
      .then(resp => {
        dispatch(getRegisteredCompanyAddress(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get loadRegisteredCompanyAddress

//#region Get loadRegisteredCompanyAddress
const getPickUpAddress = data => ({
  type: types.PICKUP_ADDRESS,
  payload: data,
});

export const loadPickUpAddress = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}/api/v1/locations?filters=[["company_id","=",${
          JSON.parse(localStorage.getItem("user_data"))?.company_id
            ? JSON.parse(localStorage.getItem("user_data"))?.company_id
            : 1
        }],["location_type_id","=",${id ? id : 751}]]`,
        { headers }
      )
      .then(resp => {
        dispatch(getPickUpAddress(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get loadRegisteredCompanyAddress

//#region Get loadRegisteredCompanyAddress
const getFinacialMonth = data => ({
  type: types.FINANCIAL_MONTH,
  payload: data,
});

export const loadFinalcialMonth = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/core/lookup_codes/MONTHS`, {
        headers,
      })
      .then(resp => {
        dispatch(getFinacialMonth(resp.data));
      })
      .catch(error => console.log(error));
  };
};
426333;

//#endregion Get loadRegisteredCompanyAddress

//#region Get loadRegisteredCompanyAddress
const getLookupCodes = data => ({
  type: types.LOOKUP_CODES,
  payload: data,
});

export const loadLookupCodes = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/core/lookup_codes/search`, {
        headers,
      })
      .then(resp => {
        dispatch(getLookupCodes(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get loadRegisteredCompanyAddress

//#region Get Contacts List
const getPriceTypeList = data => ({
  type: types.PRICE_TYPE_LIST,
  payload: data,
});

export const loadPriceTypeList = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/ONDC_BUYER_PREFERENCES`, {
        headers,
      })
      .then(resp => {
        dispatch(getPriceTypeList(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Contacts List

// export const uploadDocument = (data) => {
//   return function (dispatch) {
//     var headers = {
//       "Content-type": "application/json",
//       Authorization: `${BASE_API_SOURCE.token}`,
//     };

//     axios
//       .post(
//         `${BASE_API_SOURCE.url}integrations/ai_data_sync/getlink`,
//         JSON.stringify(data),
//         { headers }
//       )
//       .then(resp => {})
//       .catch(error => {});
//   };
// };


const GetuploadDocument = data => ({
  type: types.GET_UPLOAD_LINK,
  payload: data,
});

export const uploadDocument = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.url}integrations/ai_data_sync/getlink`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        dispatch(GetuploadDocument(resp.data));
        
      })
      .catch(error => {
        console.log(error);
      });
  };
};



export const ondcUpdate = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/core/ondc/update`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
      })
      .catch(error => {
      });
  };
};


//#region Get LOCATIONS
const getLocationsTypes = data => ({
  type: types.LOCATION_TYPES,
  payload: data,
});

export const loadLocationTypes = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}/api/v1/core/lookup_codes/LOCATION_TYPE`,
        { headers }
      )
      .then(resp => {
        dispatch(getLocationsTypes(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get LOCATIONS

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
