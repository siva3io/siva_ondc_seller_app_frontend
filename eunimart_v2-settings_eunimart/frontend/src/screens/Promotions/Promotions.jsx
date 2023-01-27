import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import PromotionsCard from "./PromotionsCard";
import moment from "moment";
import { Box } from "@mui/material";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import { loadOffersList } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Promotions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const {OfferListData} = useSelector(
    (state) => state.data
  );
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });

  useEffect(() => {
    dispatch(loadOffersList(params));
  }, []);

  console.log(OfferListData,"OfferListData")


  const [promotionsData, setpromotionsData] = useState([
    {
      promotionName: "Promotion name",
      status: "Active",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Active",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Active",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Active",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Inactive",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Inactive",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Inactive",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
    {
      promotionName: "Promotion name",
      status: "Inactive",
      products: 52,
      offerValue: "Flat Value- INR",
      fromTime: "12-12-2021",
      toTime: "12-12-2021",
    },
  ]);

  const sortOptions = [
    {
      label: "Sort by Promotion Name",
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
      func: (value) => {
        dispatch(
          loadOffersList({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["name", value]]),
          })
        );
      },
    },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Promotion Name",
      value: "name",
      collapseState: false,
    },
  ]);

  const searchOptions = [
    // { label: "Promotion Name :", value: "name" },
  ];

  const [searchType, setSearchType] = useState("name");

  const searchItems = (searchValue) => {
    console.log("sample searchItems");
    if (searchValue.length === 0) {
      dispatch(loadOffersList({ "": "" }, "search"));
    } else {
      dispatch(
        loadOffersList({
          limit: params.limit,
          offset: params.offset,
          filters: JSON.stringify([[searchType, "ilike", searchValue]]),
        })
      );
    }
  };

  const filterSearchItems = (searchValue, searchType) => {
    console.log("sample filterSearchItems");
    if (searchValue.length === 0) {
      dispatch(loadOffersList({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadOffersList({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };

  const handleButtonClick = () => {
    console.log("clicked");
    history.push("/promotions/promotionCreate");
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteDynamicAppBar
          dynamicAppBar={dynamicAppBar}
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          filterSearchItems={filterSearchItems}
          searchItems={searchItems}
          searchOptions={searchOptions}
          searchType={searchType}
          setSearchType={setSearchType}
          // handleButtonClick={handleButtonClick}
          buttons={[
            {
              name: "New Promotion",
              handleButtonClick: handleButtonClick,
              flag: 1,
            },
          ]}
        />
      </Suspense>

      <div
        style={{

          margin: "10px",
          display: "grid",
          flexDirection: "row",
          flexWrap: "wrap",
          gridTemplateColumns:"auto auto auto auto",
        }}
      >
        {OfferListData.map((o) => {
          return <PromotionsCard Elemdata={o} />;
        })}
      </div>
    </Box>
  );
};

export default Promotions;


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