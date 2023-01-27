import * as types from "./ActionType";
import axios from "axios";
import { DeliveryTimeConfig } from "../../Services/CurrencyList";

export const fetchDeliveryTimeRequest = () => {
  return {
    type: types.FETCH_DELIVERY_TIME_REQUEST,
  };
};
export const fetchDeliveryTimeSuccess = (time) => {
  return {
    type: types.FETCH_DELIVERY_TIME_SUCCESS,
    payload: time,
  };
};

export const fetchDeliveryTimeFailure = (error) => {
  return {
    type: types.FETCH_DELIVERY_TIME_FAILURE,
    payload: error,
  };
};



export const searchDeliveryTime = () => {
  return (dispatch) => {
    dispatch(fetchDeliveryTimeRequest);
    axios(DeliveryTimeConfig())
      .then((response) => {
        const time = response.data.data;
        console.log(time,"time")
        dispatch(fetchDeliveryTimeSuccess(time));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchDeliveryTimeFailure(errorMsg));
      });
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
