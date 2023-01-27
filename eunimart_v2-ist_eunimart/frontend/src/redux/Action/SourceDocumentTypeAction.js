import * as types from "./actionType";
import axios from "axios";
import { BASE_URL } from "../../Services/api";
// import { config } from "../../services/ProductListApi";

export const fetchSourceDocumentData = () => async dispatch => {
  //   console.log(params,"params")
  try {
    const response = await axios(
      `${BASE_URL}/api/v1/core/lookup_codes/ist_source_document_types`
    );

    console.log("jiji", response.data.data);
    dispatch({
      type: types.FETCH_SOURCE_DOCUMENT_DATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_SOURCE_DOCUMENT_DATA_FAILURE,
      payload: error,
    });
  }
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
