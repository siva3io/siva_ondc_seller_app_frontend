import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { loadPromotionHistoryData } from "../../redux/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../../index.css";

const PromotionsHistory = () => {
  let dispatch = useDispatch();

  const { promotionHistorydata, promotionHistorydata_meta } = useSelector(state => state.data);
  console.log("promotionHistorydata", promotionHistorydata)
  // useEffect(() => {
  //   dispatch(loadPromotionHistoryData(params));
  // }, []);

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);
  const navigate = useHistory();
  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleButtonClick = () => {
    // navigate("/manageUser/create");
  };

  useEffect(() => {
    dispatch(loadPromotionHistoryData(params));
  }, [params]);

  const sortOptions = [
    {
      label: "status",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],

      func: value => {
        dispatch(
          loadPromotionHistoryData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["promotional_status", value]]),
          })
        );
      },
    },

    {
      label: "Clear All",
      endIcon: null,
      func: value => {
        dispatch(loadPromotionHistoryData({ "": "" }));
      },
    },
  ];

  const searchOptions = [{ label: "Date : ", value: "date" }];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Status",
      collapseState: false,
      value: "promotional_status",
    },
  ]);
  const [searchType, setSearchType] = useState("promotional_status");

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadPromotionHistoryData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadPromotionHistoryData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const headCells = [
    // {
    //   key: "promotional_details.end_date_and_time",
    //   numeric: true,
    //   label: "Date",
    //   type: "date",
    // },
    {
      key: "promotional_details.start_date_and_time",
      numeric: true,
      label: "Applicable from",
      type: "date",
    },
    {
      key: "promotional_details.end_date_and_time",
      numeric: true,
      label: "Applicable To",
      type: "date",
    },
    {
      key: "is_applied_for_all",
      numeric: true,
      label: "Applied to",
      type: "text",
    },
    {
      key: "discount_type.display_name",
      numeric: true,
      label: "Discount Type",
      type: "text",
    },
    {
      key: "promotional_status",
      numeric: true,
      label: "Status",
      type: "text",
    },
  ];
  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {
        promotionHistorydata && promotionHistorydata_meta?.info &&
        (
          <>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteDynamicAppBar
                handleModalOpen={handleModalOpen}
                dynamicAppBar={dynamicAppBar}
                sortOptions={sortOptions}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                filterSearchItems={filterSearchItems}
                buttons={[
                  { name: "Create", handleButtonClick: handleButtonClick, flag: 0 },
                ]}
              />
            </Suspense>

            <div>

              <RemoteDynamicTable
                // table_data={promotionHistorydata}
                table_data={promotionHistorydata.map((o) => { return { ...o, promotional_status: o.promotional_status == true ? "Accepted" : "Rejected", is_applied_for_all: o.is_applied_for_all == false ? "All Products" : "Selected Products" } })}
                headCells={headCells}
                setParams={setParams}
                info={promotionHistorydata_meta.info}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
            </div>
          </>
        )}
    </Box>
  );
};
export default PromotionsHistory;

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
