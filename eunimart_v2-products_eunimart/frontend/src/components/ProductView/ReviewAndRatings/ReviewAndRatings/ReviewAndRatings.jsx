import React, { useEffect } from "react";
import ReviewAndRatingTable from "./ReviewAndRatingTable";
//mui
import { Box } from "@mui/material";
import ReviewAndRatingPage from "./ReviewAndRatingPage";

import { useSelector } from "react-redux";

function ReviewAndRatings() {
  const feedbackData = useSelector(state => state.data.feedbackData);
  console.log("feedbackData", feedbackData);
  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Review and Ratings</p>
      </Box>
      <Box className="companyDetailsOrder_card">
        <Box className="variantDetailsCard_card_left" sx={{ py: 2 }}>
          {/* <ReviewAndRatingTable /> */}
          <ReviewAndRatingPage data={feedbackData} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewAndRatings;

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
