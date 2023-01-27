import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { loadProductVariantData } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const RemoteWrapper = ({ children }) => (
    <div>
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
);


const PromotionViewPage = ({OffersViewData}) => {
    let dispatch = useDispatch();
    const [customOptions, setCustomOptions] = useState([]);
    // console.log(OffersViewData, "OffersViewData11")
    const OfferTableData =OffersViewData?.offer_product_details
    console.log(OfferTableData,"OfferTableData")

    var startdate=moment(OffersViewData?.promotional_details?.start_date_and_time).format(" MM-DD-yyyy")+" "+moment(OffersViewData?.promotional_details?.start_date_and_time).format("hh:mm A")
    var enddate=moment(OffersViewData?.promotional_details?.end_date_and_time).format(" MM-DD-yyyy")+" "+moment(OffersViewData?.promotional_details?.end_date_and_time).format("hh:mm A")

  

    const PromotionDetails = [
        {
            label: "Start Date and Time",
            text:startdate,
            type: "input"
        },
        {
            label: "End Date and Time",
            text: enddate,
            type: "input"
        },


    ]

    const TermsAndConditions = [
        {
            label: "Terms And Conditions",
            text: OffersViewData?.other_details?.terms_and_conditions?.display_name,
            type: "input"
        },
        {
            label: "Description",
            text: OffersViewData?.other_details?.descriptions,
            type: "input"
        },


    ]


    const staticFields=[
        {
            label: "Select for",
            type: "textArea",
            text:OffersViewData?.is_applied_for_all?"All Products":"Selected Products",
            key: "description",
            required: true,
            errorMessage: "Please enter descriptdata.sales_order_linesion",
        },
        {
            label: "Select for",
            type: "textArea",
            text:OffersViewData?.is_same_discount_for_all?"Product for same discount":"Manually adding discount",
            key: "description",
            required: true,
            errorMessage: "Please enter description",
        },
     
    ];
    const Orderlineitem2=[
        {
            label: "Selected Discount Type",
            type: "textArea",
            key:"description",
            text:OffersViewData?.discount_type?.display_name,
            required: true,
            errorMessage: "Please enter description",
        },
        {
            label: "Discount Value",
            type: "textArea",
            key: "description",
            text:OffersViewData?.discount_value,
            required: true,
            errorMessage: "Please enter description",
        },
     
    ];


    const promotionsHeadCells = [
        {
            key: "Product_SKU",
            numeric: true,
            type: "text",
            data: useSelector((state) => state.data.productVariantData.map(o=>{return{id:o.id, label:o.sku_id}})),
            label: "Product SKU",
        },
        {
            key: "Product_Name",
            numeric: false,
            type: "text",
            label: "Product Name",
        },
        {
            key: "Variant_Name",
            // count:2,
            numeric: true,
            type: "text",
            label: "Variant Name",
        },
        {
            key: "MRP",
            numeric: true,
            type: "text",
            label: "MRP",
        },
        {
            key: "Sale_Rate",
            numeric: true,
            type: "text",
            label: "Sale Rate",
        },
        {
            key: "Discount_Type",
            numeric: true,
            type: "text",
            label: "Discount Type",
        },
        {
            key: "Discounted_Price",
            numeric: true,
            type: "text",
            label: "Discounted Price",
        },
       
    ];

    return (
        <>
            <RemoteViewBox view_data={PromotionDetails} header={"Promotion Details"} />

            <Box className="promotionCreate-productsBlock">
                <div className="promotionCreate-Header">Order Line item</div>
                <div className="promotion_line_items_view">
                    {staticFields.map((field) => {
                        const val = field.label;
                        const typ = field.type;
                        return typ === "textArea" ? (
                            <Suspense fallback={<div>Loading... </div>}>
                                <RemoteWrapper>
                                    <RemoteViewTextField
                                        card
                                        label={field.label}
                                        text={field.text}
                                        disabled_y={true}
                                        name={field.label}
                                        // onInputChange={onInputChange}
                                    />
                                </RemoteWrapper>
                            </Suspense>
                        ) : (
                            <></>
                        )
                    })}
               

                </div>

                {OfferTableData &&
      <RemoteViewBox_Table headCells={promotionsHeadCells} table_data={OfferTableData.map(item=>{
          return {
            Product_SKU: (item && item.product_details && item.product_details.sku_id?item.product_details.sku_id : "--"),
            Product_Name: (item && item.product_details && item.product_details.product_name?item.product_details.product_name : "--"),
            Variant_Name: (item &&  item.product_details?.product_name ?item.product_details?.product_name : "--"),
            MRP: (item && item.mrp?item.mrp : 0),
            Sale_Rate: (item && item.sale_rate?item.sale_rate: "--"),
            Discount_Type: (item && item.discount_type && item.discount_type.display_name?item.discount_type.display_name: 0),
            Discounted_Price: (item && item.discounted_price?item.discounted_price : 0),
          }
        })}/>
    }

                {/* {OffersViewData  && (
                        <Suspense fallback={<div>Loading... </div>}>
                            <RemoteWrapper>
                                <RemoteDynamicTable
                                    table_data={OffersViewData}
                                    headCells={promotionsHeadCells}
                                    customOptions={customOptions}
                                    setCustomOptions={setCustomOptions}
                                    info={{}}
                                    //   setParams={setParams}
                                    //   handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                                    //   setId={setId}
                                    enablepagination={false}
                                    checkDisable={false}

                                />
                            </RemoteWrapper>
                        </Suspense>
                    )} */}
                    <div className="promotion_line_items_view">
                         {Orderlineitem2.map((field) => {
                        const val = field.label;
                        const typ = field.type;
                        return typ === "textArea" ? (
                            <Suspense fallback={<div>Loading... </div>}>
                                <RemoteWrapper>
                                    <RemoteViewTextField
                                        card
                                        label={field.label}
                                        text={field?.text}
                                        disabled_y={true}
                                        name={field.text}
                                        // onInputChange={onInputChange}
                                    />
                                </RemoteWrapper>
                            </Suspense>
                        ) : (
                            <></>
                        )
                    })}
                    </div>
                  
               </Box>
              <RemoteViewBox view_data={TermsAndConditions} header={"Other Details"} />
        </>
    )
}

export default PromotionViewPage;

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