import React from 'react'
import MatSelect from "Remote/MatDropDown"
import MatInput from "Remote/MatInput"
import Icon from '@mui/material/Icon';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";


export default function LocalForm({
  data,
  header,
  handelInputChange,
  handelSelectonChange,
  handelCheckBoxonChange,
  handelRadionButtononChange,
  IsCheckboxShowForCopyField,
  CheckboxShowForCopyField_text,
  CheckboxShowForCopyField_value,
  handelCheckboxShowForCopyField_valueChange,
  Islabel_priceSpace,
  IsButtonShow,
  ButtonText,
  handleButtonClick,
  handelToggleChange,
  setimageUpload,
  setfileUpload,
  handelClickChange,
  handelDeleteRow,
  flexDirection,
  index
}) {
  return (
    <>

      <div style={{ border: "1px solid #8B8B8B", borderRadius: "15px", padding: "20px" }}>
        {
          handelDeleteRow != undefined &&
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Icon
              color="error"
              component={DeleteOutlineOutlinedIcon}
              onClick={() => handelDeleteRow(index)}
              style={{ cursor: "pointer" }}
            />
            {/* <DeleteOutlineOutlinedIcon style={{color:"red"}} /> */}
          </div>
        }
        <div style={{ display: "flex",flexDirection : flexDirection ? flexDirection : "row", flexWrap: "wrap", gap: "20px 13%", justifyContent: "flex-start" }}>

          {
            data.map((field) => {

              var isRaidius = false;
              if (field.key == "area") {
                isRaidius = field?.value ? field?.value : false;
              }
              // console.log("field", field);
              const typ = field.type;
              return (typ === "input" )   ? (
                <div style={{ maxWidth: "50%", minWidth: "650px" }}>

                  <MatInput
                    disabled={field.disabled == 'false' ? false : true }
                    required={field.required}
                    errorMessage={field.errorMessage ? field.errorMessage : ""}
                    type={field.type}
                    label={field.label}
                    name={field.label}
                    value={field.value}
                    placeholder={`Enter ${field.label}`}
                    onChange={(e) => {
                      handelInputChange(
                        field?.key,
                        e?.target?.value,
                        index
                      );
                    }}
                  />
                </div>

              ):
              typ == "text" ? (
                <>
                
                <div style={{ maxWidth: "50%", minWidth: "650px",display:"flex" }}>
                 
                 <div style={{width:"25%"}}>
                  {field.label} 
                  </div>
                  
                  <div >
                 
                   {field.value}
                  </div>
                </div>
                </>
              )
                :
                typ === "select" || typ === "dropdown" ? (
                  <div style={{ maxWidth: "50%", minWidth: "650px" }}>

                    <MatSelect
                      disabled={false}
                      label={field.label}
                      data={field.data}
                      placeholder={`Select ${field.label}`}
                      fieldKey={field.key}
                      required={field.required}
                      value={field.value ? field.value : null}
                      onChange={(e, value) => {
                        handelSelectonChange(field.key, value, index);
                      }}
                      defaultVal={field.defaultVal}
                    />
                  </div>
                ) : typ == "radio" ?
                  (
                    <div style={{ maxWidth: "80%", minWidth: "650px" }}>

                      <FormControl className="promotionCreate-FormControl">
                        <FormLabel
                          id="demo-row-radio-buttons-group-label"
                          style={{ display: "flex", gap: "3px" }}
                        >
                          {field?.label}
                        </FormLabel>
                      {console.log(field,"inradio")}
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="radio-buttons-group"
                          // defaultValue={ field?.value ? field?.value : field?.sub[0]?.value}
                          defaultValue={ field?.value ? field?.value : field?.sub[0]?.value}
                          onChange={(e) => {
                            handelRadionButtononChange(field?.key, e.target.value, index);
                          }}
                        >
                          {field?.sub.map((e) => {
                            return (
                              <FormControlLabel
                                value={e?.value}
                                control={<Radio />}
                                label={e?.label}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )

                  : <></>
            })}
        </div>

      </div>
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