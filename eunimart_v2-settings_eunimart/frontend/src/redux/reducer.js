import * as types from "./actionType";

const initialState = {
  salesdata: [],
  salesdata_meta: {},
  Currencydata: [],
  Countrydata: [],
  Statedata: [],
  Lookupdata: [],
  generalSettings: [],
  invoice_details: [],
  fileCodes: [],
  file_preference: [],
  SalesMsg: {},
  contactsdata: [],
  businessTypes: [],
  authData: [],
  contactsdata_meta: {},
  promotionHistorydata: [],
  deliveryPreferenceList: [],
  deliveryTypeList: [],
  fulfillmentTypeList: [],
  loading: false,
  otpPreferenceList: [],
  OffersViewData: [],
  OfferListData: [],
  productVariantData: [],
  discountTypedata: [],
  conditionsdata: [],
  createOfferdata: [],
  promotionHistorydata_meta: [],
  updateOfferdata: [],
  adminSettingsView: [],
  CitiesData: [],
  registeredCompanyAddress: [],
  months: [],
  pickupAddress: [],
  lookupdata: [],
  priceTypes: [],
  uploadlinkdata:[],
  locationTypes:[]
};

const SalesdataReducers = (state = initialState, action) => {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case types.SALES_LIST:
      return {
        ...state,
        salesdata: action.payload.data,
        salesdata_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_VIEW:
      return {
        ...state,
        salesdata: action.payload.data,
        loading: false,
      };
    case types.AUTH_ME:
      return {
        ...state,
        authData: action.payload.data,
        loading: false,
      };
    case types.CURRENCY_TYPE:
      return {
        ...state,
        Currencydata: action.payload.data,
        loading: false,
      };
    case types.COUNTRY_LIST:
      return {
        ...state,
        Countrydata: action.payload.data,
        loading: false,
      };
    case types.STATE_LIST:
      return {
        ...state,
        Statedata: action.payload.data,
        loading: false,
      };
    case types.PAYMENT_TERMS_LIST:
      return {
        ...state,
        Lookupdata: action.payload.data,
        loading: false,
      };
    case types.GENERAL_SETTINGS:
      return {
        ...state,
        generalSettings: action.payload.data,
        loading: false,
      };
    case types.INVOICE_DETAILS:
      return {
        ...state,
        invoice_details: action.payload.data,
        loading: false,
      };
    case types.BUSINES_TYPES:
      return {
        ...state,
        businessTypes: action.payload.data,
        loading: false,
      };

    case types.FILE_CODES:
      return {
        ...state,
        fileCodes: action.payload.data,
        loading: false,
      };
    case types.FILE_PREFERENCE:
      return {
        ...state,
        file_preference: action.payload.data,
        loading: false,
      };
    case types.SAVE_SALES_ORDER:
      return {
        ...state,
        SalesMsg: action.payload.meta,
        loading: false,
      };
    case types.CONTACTS_LIST:
      return {
        ...state,
        contactsdata: action.payload.data,
        contactsdata_meta: action.payload.meta,
        loading: false,
      };
    case types.PROMOTION_HISTORY_LIST:
      return {
        ...state,
        promotionHistorydata: action.payload.data,
        promotionHistorydata_meta: action.payload.meta,
        loading: false,
      };
    case types.OTP_PREFERENCE_LIST:
      return {
        ...state,
        otpPreferenceList: action.payload.data,
        loading: false,
      };
    case types.OFFERS_VIEW_DATA:
      return {
        ...state,
        OffersViewData: action.payload.data,
        loading: false,
      };

    case types.OFFERS_LIST_DATA:
      return {
        ...state,
        OfferListData: action.payload.data,
        loading: false,
      };

    case types.DELIVERY_PREFERENCES_LIST:
      return {
        ...state,
        deliveryPreferenceList: action.payload.data,
        loading: false,
      };
    case types.DELIVERY_TYPE_LIST:
      return {
        ...state,
        deliveryTypeList: action.payload.data,
        loading: false,
      };
    case types.FULFILLMENT_TYPE_LIST:
      return {
        ...state,
        fulfillmentTypeList: action.payload.data,
        loading: false,
      };
    case types.PRODUCT_VARIANT_LIST:
      return {
        ...state,
        productVariantData: action.payload.data,
        loading: false,
      };
    case types.DISCOUNT_TYPE:
      return {
        ...state,
        discountTypedata: action.payload.data,
        loading: false,
      };

    case types.TERMS_CONDITIONS_DATA:
      return {
        ...state,
        conditionsdata: action.payload.data,
        loading: false,
      };
    case types.CREATE_OFFER:
      return {
        ...state,
        createOfferdata: action.payload.data,
        loading: false,
      };

    case types.UPDATE_OFFER:
      return {
        ...state,
        updateOfferdata: action.payload.data,
        loading: false,
      };

    case types.ADMIN_SETTINGS_VIEW:
      return {
        ...state,
        adminSettingsView: action.payload.data,
        loading: false,
      };
    case types.CITIES_LIST:
      return {
        ...state,
        CitiesData: action.payload.data,
        loading: false,
      };
    case types.REGISTERD_ADDRESS:
      return {
        ...state,
        registeredCompanyAddress: action.payload.data,
        loading: false,
      };

    case types.PICKUP_ADDRESS:
      return {
        ...state,
        pickupAddress: action.payload.data,
        loading: false,
      };

    case types.FINANCIAL_MONTH:
      return {
        ...state,
        months: action.payload.data,
        loading: false,
      };

    case types.LOOKUP_CODES:
      return {
        ...state,
        lookupdata: action.payload.data,
        loading: false,
      };
    case types.PRICE_TYPE_LIST:
      return {
        ...state,
        priceTypes: action.payload.data,
        loading: false,
      };
      
      case types.GET_UPLOAD_LINK:
        return {
          ...state,
          uploadlinkdata: action.payload.data,
          loading: false,
        };

      case types.LOCATION_TYPES:
        return{
          ...state,
          locationTypes:action.payload.data,
          loading:false,
        };
    default:
      return state;
  }
};
export default SalesdataReducers;

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
