import React, { useState } from 'react'
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

import SelectServiceableArea from '../Components/SelectServiceableArea';

export default function Factory_Office({ data, edit }) {


  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const locationDetails = [
    {
      label: "Location Name",
      text: data?.name,
      type: "input"
    },
    {
      label: "Location Type",
      text: data?.LocationType?.display_name,
      type: "input"
    },
    {
      label: "Location ID",
      text: data?.LocationType?.id,
      type: "input"
    },
    {
      label: "Parent Location",
      text: data?.parent_location?.name,
      type: "input"
    },

    {
      label: "Address Line 1",
      text: data?.address?.address_line_1,
      type: "input"
    },
    {
      label: "Address Line 2",
      text: data?.address?.address_line_2,
      type: "input"
    },
    {
      label: "Address Line 3",
      text: data?.address?.address_line_3,
      type: "input"
    },
    {
      label: "Landmark",
      text: data?.address?.land_mark,
      type: "input"
    },
    {
      label: "Pincode",
      text: data?.address?.pin_code,
      type: "input"
    },
    {
      label: "Country",
      text: data?.address?.country?.name,
      type: "input"
    },
    {
      label: "State",
      text: data?.address?.state?.name,
      type: "input"
    },
    {
      label: "City",
      text: data?.address?.city,
      type: "input"
    },
    {
      label: "GST Number",
      url: data?.location_docs?.gst_doc?.link,
      name: data?.location_docs?.gst_doc?.name,
      type: "download"
    },
  ];

  const sld = [
    {
      label: "Latitude",
      text: data?.latitude,
      type: "input"
    },
    {
      label: "Longitude",
      text: data?.longitude,
      type: "input"
    },
    //   {
    //     label:"Drop Location Pin",
    //     text:data?.id,
    //     type:"map"
    //   }
  ];


  const inchargeDetails = [
    {
      label: "Incharge Name",
      text: data?.location_details?.location_incharge_details?.incharge_name,
      type: "input"
    },
    {
      label: "Email",
      text: data?.location_details?.location_incharge_details?.email,
      type: "input"
    },
    {
      label: "Company Name",
      text: data?.location_details?.location_incharge_details?.company_name,
      type: "input"
    },
    {
      label: "Mobile No.",
      text: data?.location_details?.location_incharge_details?.mobile_number,
      type: "input"
    },
    {
      label: "Upload Profile Picture",
      text: data?.location_details?.location_incharge_details?.mobile_number,
      type: "image"
    }
  ]



  return (
    <>
      <RemoteViewBox view_data={locationDetails} header={"Location Details"} />
      <RemoteViewBox view_data={sld} header={"SetLocation Details"} />

      {
        data && data?.serviceable_area_ids
          ?
          (
            <SelectServiceableArea data={data?.serviceable_area_ids} />
          ) :
          <></>
      }
      <RemoteViewBox view_data={inchargeDetails} header={"Location Incharge Details"} />


    </>
  )
}

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