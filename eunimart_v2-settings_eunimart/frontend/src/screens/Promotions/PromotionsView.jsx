import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOffersDataById, UpdateOffer } from "../../redux/action";
import "./PromotionsView.css";
import { Button } from "@mui/material";

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PromotionViewPage from "./PromotionViewPage";




const PromotionsView = (props) => {
    const Id = props.id;
    const [value, setValue] = React.useState("1");
    let payloadupdate={}

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let dispatch = useDispatch();
    const { OffersViewData } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(loadOffersDataById(Id));
    }, [OffersViewData.is_active]);

    const sendUpdateData = () => {
        if (OffersViewData?.is_active == true) {
             payloadupdate = {
                is_active: false

            }
        }
        else {
            payloadupdate = {
                is_active: true

            }
        }
        dispatch(UpdateOffer(payloadupdate,Id))
        setTimeout(()=>{
            dispatch(loadOffersDataById(Id));
        },1000)

    }

    console.log(OffersViewData, "OffersViewData")


    return (
        <>
            <div className="promoView-allbody">
                <div className="promoView-header">
                    <div className="promoView-innerBody">
                        <div className="promoView-Header1">{OffersViewData?.promotional_details?.name}</div>
                        <div className="promoView-statusbody">
                            <FiberManualRecordIcon style={{ color: "#416BFF" }} />
                            <div className="promoView-status">
                                {OffersViewData?.is_active == true ? "Active" : "Inactive"}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button style={{ background: "#416BFF" }} onClick={() => { sendUpdateData() }} variant="contained">{OffersViewData?.is_active == true ? "Deactivate" : "Activate"}</Button>
                    </div>
                </div>
                {OffersViewData && (
                    <PromotionViewPage OffersViewData={OffersViewData} />
                )}
            </div>




        </>

    );

}


export default PromotionsView;

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