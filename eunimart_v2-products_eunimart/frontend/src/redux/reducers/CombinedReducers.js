import * as types from "../Action/ActionType";

const initialState = {
  salesPriceListData: [],
  purchasePriceListData: [],
  purchaseReturnsData: [],
  salesReturnsData: [],
  salesHistoryData: [],
  productBundleData: [],
  productsListData: [],
  product_meta_data: {},

  //   Admin
  productsAdminListData: [],
  productsAdminViewData: [],

  productsdetailsViewData: [],
  time_withinData: [],
  product_fulfilment_Data: [],

  statesListData: [],

  FullfillData: [],
  FoodTypeData: [],
  PaymentTypeData: [],
  hsncode: [],

  // rating and review

  ratingCategoryData: [],
  feedbackData: [],
};

const ProductsCombinedReducers = (state = initialState, action) => {
  console.log("action.payload1", action.payload, types);
  switch (action.type) {
    case types.PRICING_VIEW_DATA:
      return {
        ...state,
        salesPriceListData: action?.payload?.data?.sales_price_list,
        purchasePriceListData: action?.payload?.data?.purchase_price_list,
        loading: false,
      };
    case types.PURCHASE_RETURNS_DATA:
      return {
        ...state,
        purchaseReturnsData: action?.payload?.data,
        loading: false,
      };
    case types.HSN_CODE:
      return {
        ...state,
        hsncode: action?.payload?.data,
        loading: false,
      };
    case types.SALES_RETURNS_DATA:
      return {
        ...state,
        salesReturnsData: action?.payload?.data,
        loading: false,
      };
    case types.SALES_HISTORY_DATA:
      return {
        ...state,
        salesHistoryData: action?.payload?.data,
        loading: false,
      };
    case types.PRODUCT_BUNDLE_VIEW_DATA:
      return {
        ...state,
        productBundleData: action?.payload?.data,
        loading: false,
      };
    case types.PRODUCT_WHOLE_DATA:
      return {
        ...state,
        productsListData: action?.payload?.data,
        product_meta_data: action?.payload?.meta,
        loading: false,
      };
    case types.STATE_LIST:
      return {
        ...state,
        statesListData: action?.payload?.data,
        loading: false,
      };

    //   Admin
    case types.PRODUCT_ADMIN_LIST_DATA:
      return {
        ...state,
        productsAdminListData: action?.payload?.data,
        loading: false,
      };
    case types.PRODUCT_ADMIN_VIEW_DATA:
      return {
        ...state,
        productsAdminViewData: action?.payload?.data,
        loading: false,
      };
    case types.PRODUCT_DETAILS_VIEW_DATA:
      return {
        ...state,
        productsdetailsViewData: action?.payload,
        loading: false,
      };
    case types.TIME_WITHIN_DATA:
      return {
        ...state,
        time_withinData: action?.payload?.data,
        loading: false,
      };
    case types.PRODUCT_FULFILMENT_DATA:
      return {
        ...state,
        product_fulfilment_Data: action?.payload?.data,
        loading: false,
      };

    case types.FULLFILLMENT_DATA:
      return {
        ...state,
        FullfillData: action.payload.data,
        loading: false,
      };
    case types.FOOD_TYPE_DATA:
      return {
        ...state,
        FoodTypeData: action.payload.data,
        loading: false,
      };
    case types.PAYMENT_TYPE_DATA:
      return {
        ...state,
        PaymentTypeData: action.payload.data,
        loading: false,
      };

    // rating and review
    case types.RATING_CATEGORY_LIST:
      return {
        ...state,
        ratingCategoryData: action.payload.data,
        loading: false,
      };
    case types.FEEDBACK_LIST:
      return {
        ...state,
        feedbackData: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
export default ProductsCombinedReducers;

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
