import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadAdminSettingsDataById, loadStateDataById, update_settings, loadCitiesData } from "../../redux/action";
import AddForm from "Remote/AddForm"
import { Box, Button } from "@mui/material";
import LocalForm from "../../Components/LocalForm";
import "./style.css"

const ServiceAreaTab = () => {
  let dispatch = useDispatch();
  const [mainData, setMainData] = useState([]);

  useEffect(() => { console.log("mainData", mainData) }, [mainData])
  const [ServiceableAreaDetails, setServiceableAreaDetails] = useState([])
  const [ServiceableAreaDetails1, setServiceableAreaDetails1] = useState([])
  const [load, setLoad] = useState(false);
  const { Statedata,adminSettingsView,CitiesData } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    dispatch(loadAdminSettingsDataById());
    dispatch(loadCitiesData());
    dispatch(loadStateDataById(100));

  }, [])

  useEffect(() => {
    console.log("useruserdata", adminSettingsView);
    // console.log(adminSettingsView?.company_details?.serviceable_areas?.length > 0,"condition")
    if(adminSettingsView?.company_details?.serviceable_areas?.length > 0)
    {    
    var temp = adminSettingsView?.company_details?.serviceable_areas?.map(row => {
      return [
        {
          label: "Select State ",
          type: "select",
          key: "state",
          value: row?.state,
          defaultVal: {},
          data:[]
        },
        {
          label: "Select City",
          type: "select",
          key: "city",
          value:row?.city,
          data:[]
        },
        {
          label: "",
          type: "radio",
          key: "area",
          required: true,
          value: row?.whole_city,
          sub: [
            {
              label: "Service whole City",
              value: true,
            },
            {
              label: "Service with Radius",
              value: false,
            },
          ],
        },

        {
          label: "Enter radius served",
          type: "input",
          numeric: true,
          key: "radius",
          value:row?.radius,
          disabled:row?.city == "false" ? false : true
        },
        {
          label: "GPS location",
          type: "text",
          key: "gps_loc",
          disabled: true,
          value:row?.latitude+","+row?.longitude
        },
      ]
    })
    console.log("temp",temp)
    setServiceableAreaDetails(o=> {return temp})
    setLoad(load+1)
    setMainData(...ServiceableAreaDetails);
  }
  else{
    setServiceableAreaDetails( [[
      {
        label: "Select State ",
        type: "select",
        key: "state",
        defaultVal: {},
      },
      {
        label: "Select City",
        type: "select",
        key: "city",
      },
      {
        label: "",
        type: "radio",
        key: "area",
        required: true,
        value: false,
        sub: [
          {
            label: "Service whole City",
            value: true,
          },
          {
            label: "Service with Radius",
            value: false,
          },
        ],
      },

      {
        label: "Enter radius served",
        type: "input",
        numeric: true,
        key: "radius",
      },
      {
        label: "GPS location",
        type: "text",
        key: "gps_loc",
        disabled: true,
      },
    ]])
    setLoad(load+1)
    // setMainData([])
  }
  setLoad(load+1)


  }, [adminSettingsView])

 
  const handelSelectonChangeDetails = (key, value, index) => {
    console.log(key, value, index, "key, value , index")


    let temp = ServiceableAreaDetails;
    temp = temp?.map((o, i) => {
      if (i == index) {
        return o?.map((x, j) => {
          if (key == "city" && x.key == "gps_loc")
            x.value = value?.gps
          if (x.key == key)
            x.value = value
          return x
        })
      } return o
    })
    console.log(temp, "DummyChecker")
    setServiceableAreaDetails(temp)
    setMainData(temp);
  };

  const handelInputChange = (key, value, index) => {
    console.log(key, value, index, "key, value , index")

    let temp = ServiceableAreaDetails;
    temp = temp?.map((o, i) => {
      if (i == index) {
        return o?.map((x, j) => {
          if (x.key == key)
            x.value = value
          return x
        })
      } return o
    })
    console.log(temp, "DummyChecker")

    setServiceableAreaDetails(temp)
    setMainData(temp);
  }

  const handelRadionButtononChange = (key, value, index) => {
    console.log(key, value, index)
    console.log(key, value, index, "key, value , index")

    let temp = ServiceableAreaDetails;
    temp = temp?.map((o, i) => {
      if (i == index) {
        return o?.map((x, j) => {
          if (x.key == "radius")
            x.disabled= value 
            if (x.key == key)
            x.value = value
          return x
        })
      } return o
    })
    console.log(temp, "DummyChecker")

    setServiceableAreaDetails(o=>{return temp})
    setMainData(temp);
  }

  const handleAddMore = () => {

    // console.log(ServiceableAreaDetails,"ServiceableAreaDetails")
    var temp=[
      ...ServiceableAreaDetails,
      [
        {
          label: "Select State ",
          type: "select",
          key: "state",
          defaultVal: {},
        },
        {
          label: "Select City",
          type: "select",
          key: "city",
        },
        {
          label: "",
          type: "radio",
          key: "area",
          required: true,
          value: false,
          sub: [
            {
              label: "Service whole City",
              value: true,
            },
            {
              label: "Service with Radius",
              value: false,
            },
          ],
        },
  
        {
          label: "Enter radius served",
          type: "input",
          numeric: true,
          key: "radius",
        },
        {
          label: "GPS location",
          type: "text",
          key: "gps_loc",
          disabled: true,
        },
      ]
  
      ]
      console.log(temp)
    setServiceableAreaDetails(temp)
    setLoad(load+1)
    setMainData(...ServiceableAreaDetails);
  }

  const handleUpdate = () => {
    console.log(mainData, "mainDataaaaaaaaaaaaaa")

    var payload = {
      company_details: {
        serviceable_areas: mainData?.map((row) => {
          console.log("sample", row)
          return ({
            state: row[0]?.value,
            city: row[1]?.value,
            whole_city:row[2]?.value,
            radius: row[2]?.value ? row[3]?.value : null,
            latitude:row[4]?.value?.split(",")[0],
            longitude:row[4]?.value?.split(",")[1]
          })
        })
      }
    }
    dispatch(update_settings(payload))
    console.log("updated", payload)
  }


  const handelDeleteRow = (index) => {
    console.log("Index to be deleted", index);
    const temp = ServiceableAreaDetails?.filter((o, ind) => {
      if (ind != index) {
        return o
      }
    })
    setServiceableAreaDetails( sam=>{return temp } )
    setMainData(sam=> {return temp})
    console.log(temp, "asdfghjkl")

  }

  useEffect(()=>{console.log("ServiceableAreaDetails",ServiceableAreaDetails)},[ServiceableAreaDetails])

  return (
    <>

      <Box style={{ width: "100vw", background: "#f5f5f5", minHeight: "100vh", display: "flex", justifyContent: "center" }} >


        <Box style={{ width: "97vw", background: "#fff", borderRadius: "15px", padding: "10px", display: "flex", alignItems: "center", flexDirection: "column" }} >
          <div style={{ width: "100%", margin: "2vh 0" }}>
            <div className="SAD_title" style={{ fontSize: "19px" }}>Serviceable area marking</div>

          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>

            {
              ServiceableAreaDetails?.length > 0 && load &&
              ServiceableAreaDetails?.map((o, index) => {

                return  <LocalForm
                  data={o?.map((field) => {

                    switch (field.key) {
                      case "state":
                        field.data = Statedata.map((o) => {
                          return { id: o.id, label: o.name };
                        });
                        break;
                        case "city":

                        field.data = CitiesData?.filter((city) => city?.State==o[0]?.value?.label).length > 0  ? CitiesData?.filter((city) => city?.State==o[0]?.value?.label).map((row)=>{return { id:row?.Code,label:row?.City,gps:row?.lat_long}}) : []   ;
                        break;
                    }

                    return field;
                  })}
                  handelSelectonChange={handelSelectonChangeDetails}
                  handelInputChange={handelInputChange}
                  handelDeleteRow={handelDeleteRow}
                  handelRadionButtononChange={handelRadionButtononChange}
                  index={index}
                />
              })
            }

          </div>

          <Button variant="contained" onClick={() => { handleAddMore() }} style={{ marginTop: "2vh" }}>Add More</Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            style={{ textTransform: "none", background: "#416BFF", width: "180px", alignSelf: "flex-end" }}
          >
            Update Details
          </Button>
        </Box>
      </Box>

    </>
  );
}

export default ServiceAreaTab;

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