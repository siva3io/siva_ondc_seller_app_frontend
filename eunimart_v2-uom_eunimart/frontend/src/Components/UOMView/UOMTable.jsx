import React, { useState } from "react";
import ModalView from "../../Shared/widgets/Modal/ModalView";
import ListMenu from "../../Shared/widgets/ListMenu";
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { fetchSearchProduct } from "../../redux/Action/SearchOutput";
import {
  postDeleteUOM,
  postfavouriteProduct,
} from "../../redux/Action/MiscAction";

import { getUOMData } from "../../redux/Action/FetchUOMAction";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "UOMCode",
    numeric: false,
    disablePadding: true,
    label: "UOM Code",
  },
  {
    id: "UOMName",
    numeric: true,
    disablePadding: false,
    label: "UOM Name",
  },
  {
    id: "UOMDescripton",
    numeric: true,
    disablePadding: false,
    label: "UOM Description",
  },
  {
    id: "UOMClass",
    numeric: true,
    disablePadding: false,
    label: "UOM Class",
  },
  {
    id: "BaseUOM",
    numeric: true,
    disablePadding: false,
    label: "Base UOM",
  },
  {
    id: "ConversioType",
    numeric: true,
    disablePadding: false,
    label: "Conversion Type",
  },
  {
    id: "ConversionFactor",
    numeric: true,
    disablePadding: false,
    label: "Conversion Factor",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ background: "#E7F0FD" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            sx={{ color: "#001661", padding: "0px 6px" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function UOMTable({
  products_data,
  info,
  setParams,
  handleChangeDyanmicAppBar,
  setProductId,
  handleDeleteModalOpen,
}) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(info.page_no - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products_data.map((n) => n.id);
      handleChangeDyanmicAppBar(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    handleChangeDyanmicAppBar([]);
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    handleChangeDyanmicAppBar(newSelected);
    if (newSelected.length > 1) {
      setCustomOptions([
        {
          label: "Delete",
          func: (uom_id) => handleDeleteModalOpen(uom_id),
        },
      ]);
    }
    if (newSelected.length === 1) {
      setCustomOptions([
        {
          label: "View",
          func: (uom_id) => handleViewUOM(uom_id),
        },
        {
          label: "Edit",
          func: (uom_id) => handleEdit(uom_id),
        },
        {
          label: "Delete",
          func: (uom_id) => handleDeleteModalOpen(uom_id),
        },
      ]);
    }
    if (newSelected.length === 0) {
      setCustomOptions([
        {
          label: "View",
          func: (uom_id) => handleViewUOM(uom_id),
        },
        {
          label: "Delete",
          func: (uom_id) => handleDeleteModalOpen(uom_id),
        },
        {
          label: "Edit",
          func: (uom_id) => handleEdit(uom_id),
        },
      ]);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setParams({
      limit: Number(info.per_page),
      offset: Number(newPage + 1),
    });
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setParams({
      limit: Number(parseInt(event.target.value, 10)),
      offset: 1,
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleViewUOM = (uom_id) => {
    history(`/uom/View/${uom_id}`);
  };

  const handleEdit = (uom_id) => {
    dispatch(getUOMData(uom_id));
    setTimeout(() => {
      history(`/uom/editUOM/${uom_id}`);
    }, 500);
  };

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (uom_id) => handleViewUOM(uom_id),
    },
    {
      label: "Delete",
      func: (uom_id) => handleDeleteModalOpen(uom_id),
    },
    {
      label: "Edit",
      func: (uom_id) => handleEdit(uom_id),
    },
  ]);

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "12px",
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // fontWeight: "400",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "0px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
      MuiTableRow: {
        // styleOverrides: {
        hover: {
          // backgroundColor: "green",
        },
        // },
      },
    },
  });

  //render function
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Paper>
          <TableContainer sx={{ minHeight: "80vh" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products_data && products_data.length}
              />
              <TableBody>
                {products_data && products_data.length > 0 ? (
                  products_data.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            sx={{
                              color: "#001661",
                              padding: "5px!important",
                            }}
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row?.code}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row["name"]
                            ? row["name"].length > 20
                              ? `${row["name"].substring(0, 20)}...`
                              : row["name"]
                            : "--"}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row["description"]
                            ? row["description"].length > 25
                              ? `${row["description"].substring(0, 25)}...`
                              : row["description"]
                            : "--"}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row?.uom_class_name}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row?.base_uom}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row["conversion_type"]
                            ? row["conversion_type"].display_name
                            : "--"}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(event) => {
                            handleClick(event, row.name);
                            history(`/uom/View/${row.id}`);
                          }}
                        >
                          {row["conversion_factor"]
                            ? row["conversion_factor"]
                            : "--"}
                        </TableCell>

                        <TableCell align="center">
                          <ListMenu
                            customOptions={customOptions}
                            uom_id={row.id && row.id}
                            setProductId={setProductId}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <Box
                    style={{
                      width: "max-content",
                    }}
                  >
                    No data found
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={info.total_rows}
            rowsPerPage={info.per_page}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
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