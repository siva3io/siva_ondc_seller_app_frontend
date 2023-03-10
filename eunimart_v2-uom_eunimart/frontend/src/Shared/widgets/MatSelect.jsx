import React from "react";
import FormControl from "@mui/material/FormControl";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MatSelect(props) {
  const selectOptions = props.data ? props.data : [];

  const theme = createTheme({
    components: {
      // Name of the component
      MuiFormControl: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // overflow: "unset",
            margin: "0px",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "35%", display: "flex", alignItems: "center" }}>
          <Typography
            htmlFor={props.label.toLowerCase().split(" ").join("_")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ color: "#5d5d5d" }}>{props.label}</Typography>
            {props.required ? (
              <Typography
                className="product_required_mark"
                sx={{ color: "red!important" }}
              >
                *
              </Typography>
            ) : null}
          </Typography>
        </Box>
        <Box style={{ width: "100%" }}>
          <FormControl sx={{ width: "100%" }}>
            {props.edit === true ? (
              <>
                {props.defaultVal && props.defaultVal !== "undefined" ? (
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={selectOptions ? selectOptions : []}
                    onChange={props.onChange}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label={`Search ${props.label}`} />
                    )}
                    // defaultValue={props.defaultVal && [props.defaultVal]}
                    // getOptionLabel={(option) => console.log("options", option)}
                    getOptionLabel={(options) => (options ? options.code : "")}
                    value={props.defaultVal && props.defaultVal}
                  />
                ) : (
                  <Autocomplete
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={selectOptions}
                    onChange={props.onChange}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label={`Search ${props.label}`} />
                    )}
                    // defaultValue={props.defaultVal && props.defaultVal}
                    // getOptionLabel={(options) =>
                    //   options.label ? options.label : ""
                    // }
                    // value={props.defaultVal && [props.defaultVal]}
                  />
                )}
              </>
            ) : (
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={selectOptions}
                onChange={props.onChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label={`Search ${props.label}`} />
                )}
              />
            )}

            {/* <Select
            size="small"
            onChange={(event) => {
              // props.resetProperty();
              props.setSelectValue && props.setSelectValue(props.label);
              props.setSelectKey && props.setSelectKey(event.target.value);
              props.setVale && props.setVale(props.tempCount);
              props.setFieldKey && props.setFieldKey(props.fieldKey);
              props.onChange && props.onChange(event);
            }}
            value={props.value}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>{`Select ${props.label}`}</em>
            </MenuItem>
            {selectOptions.map((option) => (
              <MenuItem
                key={option[0]}
                value={option[0]}
                selected={props.value === option[0] ? true : false}
              >
                {option[1]}
              </MenuItem>
            ))}
          </Select> */}
          </FormControl>
        </Box>
      </Box>
    </ThemeProvider>
  );
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