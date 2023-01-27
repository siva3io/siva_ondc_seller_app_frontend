import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FolderIcon from "@mui/icons-material/Folder";
import LOGO from "../Assets/Images/Logo.png";
import CLOSE from "../Assets/Icons/open.svg";
import { ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import menuService from "../Services/menuService";
import {
  CardMedia,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatBot from "../Components/ChatBot";
import logo from "../Components/Chatbot.png";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { theme1 } from "../theme";
import GLOBAL_API_SOURCE from "../GlobalApi";
import "../Components/popup.css";
import UserProfile from "../Components/UserProfile";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationPopUp from "../Components/NotificationPopUp";
import Settings from "@mui/icons-material/Settings";
const base_url = GLOBAL_API_SOURCE.url;

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const reloadPage = () =>{
const reloadPage = () => {
  window.location.reload();
  console.log("reloadPage");
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // {...other}
    >
      {value === index && (
        <Box>
          {/* sx={{ p: 1, background: "#f9f9f9 !important" }} */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MiniDrawer({ sessionId }) {
  const [state, setState] = useState({});
  const [display, setDisplay] = useState(false);
  const navigate = useHistory();
  const [value, setValue] = React.useState(0);
  const products = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const askSessionIdHandler = (name, ref) => {
    let details = { type: name, data: localStorage.getItem("token") };
    postCrossDomainMessage(details, ref);
  };

  const postCrossDomainMessage = (msg, ref) => {
    let win = ref.current.contentWindow;
    setTimeout(() => {
      win.postMessage(msg, "*");
    }, 2000);
  };

  const handleAppStoreClick = () => {
    setState({
      ...state,
      selectMenu: { route_path: "https://frontend.eunimart.com/appStore" },
      tabs: null,
    });
  };

  const handleSettings = () => {
    setState({
      ...state,
      selectMenu: { route_path: "https://frontend.eunimart.com/userSettings" },
      tabs: null,
    });
  };

  const menuChange = (item, index, tabs) => {
    console.log(item);
    setState({ ...state, selectMenu: item, tabs });
    setValue(index);
  };

  const logOut = () => {
    console.log("logOut");
    localStorage.clear();
    navigate.push("/login");
  };
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme1}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <MainMenu onChange={menuChange} />

          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <DrawerHeader style={{ minHeight: "8px" }} />
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {state.tabs &&
                  state.tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab.module_name}
                      onClick={() => menuChange(tab, index, state.tabs)}
                    />
                  ))}

                <Box sx={{ marginLeft: "auto" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    sx={{
                      marginRight: 1,
                      color: "#001661",
                      // ...(open && { display: "contents"}),
                    }}
                    onClick={() => {
                      handleSettings();
                    }}
                  >
                    <Settings />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={() => {
                      handleAppStoreClick();
                    }}
                    sx={{
                      marginRight: 1,
                      marginLeft: 1,
                      // color: "#001661",
                      // ...(open && {  display: "flex",marginRight:"240px" }),
                    }}
                  >
                    <GridViewIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={() => {
                      setShowModal1(true);
                    }}
                    sx={{
                      marginRight: 2,
                      // color: "#001661",
                      // ...(open && {  display: "flex",marginRight:"240px" }),
                    }}
                  >
                    <NotificationsOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={() => {
                      setShowModal(true);
                    }}
                    sx={{
                      marginRight: 2,
                      // color: "#001661",
                      // ...(open && {  display: "flex",marginRight:"240px" }),
                    }}
                  >
                    <PersonRoundedIcon />
                  </IconButton>
                </Box>
              </Tabs>
            </Box>
            <iframe
              src={state.selectMenu?.route_path}
              onLoad={() => {
                askSessionIdHandler("products", products);
              }}
              ref={products}
              id="products"
              title="products"
              style={{
                width: "100%",
                padding: "0px",
                border: "none",
                margin: "0px",

                height: "92vh",
                overflow: "auto",
              }}
            ></iframe>
          </Box>
        </Box>
      </ThemeProvider>

      <div className="App1">
        <div style={{ margin: "20px" }}>
          {display ? (
            <ChatBot setDisplay={setDisplay} />
          ) : (
            <InactiveBot setDisplay={setDisplay} />
          )}
          {/* <ChatBot /> */}
        </div>
      </div>
      {showModal && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <UserProfile />
          </div>
        </>
      )}
      {showModal1 && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setShowModal1(false)}
          ></div>
          <div className="modal">
            <NotificationPopUp />
          </div>
        </>
      )}
    </>
  );
}

const InactiveBot = ({ setDisplay }) => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="deactive_bot1">
      {showText && (
        <div className="textWrapper1">
          <div style={{ padding: " 13px 25px 0px 25px" }}>
            <div className="chatbot_top_text1">Ask EuniBot</div>
            <div className="chatbot_top_text_sec2">Here to help you</div>
          </div>
        </div>
      )}

      <div
        className="bot_cirlce1"
        onMouseLeave={() => {
          setShowText(false);
        }}
        onMouseOver={() => {
          setShowText(true);
        }}
        onClick={() => {
          setDisplay((prevState) => !prevState);
        }}
      >
        <img src={logo} className="eunimart_logo1" alt="Bot_logo" />
      </div>
    </div>
  );
};

const MainMenu = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [state, setState] = useState({});
  const [test, setTest] = useState(9);

  useEffect(() => {
    menuService().then((resp) => {
      if (resp.status == 200 && resp.data && resp.data.data) {
        var selectMenu = resp.data.data.filter((o) => o.parent_module_id)[0];
        var tabs = resp.data.data.filter(
          (o) => o.parent_module_id == selectMenu.parent_module_id
        );
        props.onChange(selectMenu, 0, tabs);
        //menuPress(selectMenu,0)
        setState({ ...state, data: resp.data.data });
      }
    });
  }, [test]);

  const menuPress = (item, index) => {
    console.log("menuPress", item);

    if (
      state.selectMenu &&
      item &&
      (item.id == state.selectMenu.id ||
        (state.selectMenu.parent_module_id &&
          item.id == state.selectMenu.parent_module_id))
    ) {
      setState({ ...state, collasped: !state.collasped });
      return;
    }

    setState({
      ...state,
      open: item ? true : !state.open,
      collasped: true,
      selectMenu: item,
    });
    if (item.parent_module_id) {
      var tabs = state.data.filter(
        (o) => o.parent_module_id == item.parent_module_id
      );
      props.onChange(item, index, tabs);
    } else {
      var selectMenu = state.data.filter(
        (o) => o.parent_module_id == item.id
      )[0];
      var tabs = state.data.filter((o) => o.parent_module_id == item.id);
      props.onChange(selectMenu, 0, tabs);
    }
  };

  return (
    <>
      <Drawer variant="permanent" open={state.open}>
        <DrawerHeader style={{ background: "#FAFAFA" }}>
          <ListItemButton
            className="header_image"
            sx={{
              minHeight: 48,
              justifyContent: state.open ? "initial" : "center",
              px: 2.5,
              background: "#FAFAFA",
            }}
          >
            <ListItemIcon
              sx={{
                maxWidth: "10px",
                mr: state.open ? 3 : "auto",
                justifyContent: "center",
                height: "47px",
                // color: "#54DFFF",
                // ...(state.open && { display: "none" }),
              }}
            >
              <img src={LOGO} onClick={reloadPage} />
            </ListItemIcon>
            {/* <CardMedia
              sx={{
                objectFit: "contain",
                background: "#FAFAFA",
                height: "47px",
                width: "210px",
              }}
              component="img"
              image={LOGO}
              alt="Paella dish"
              onClick={reloadPage}
            /> */}
          </ListItemButton>
        </DrawerHeader>

        <List style={{ backgroundColor: "#001661" }} className="nav_wrapper">
          <IconButton
            style={{ color: "#54DFFF", marginLeft: "10px" }}
            aria-label="open drawer"
            onClick={() => menuPress(null, 0)}
            edge="start"
            sx={{
              marginLeft: "3px",
              color: "#001661",
              ...(state.open && { display: "none" }),
            }}
          >
            <img src={CLOSE} />
          </IconButton>
          <IconButton
            onClick={() => menuPress(null, 0)}
            style={{ color: "#54DFFF", marginLeft: "190px" }}
          >
            <MenuOpenIcon color="#54DFFF" />
          </IconButton>

          {state.data &&
            state.data
              .filter((o) => o.parent_module_id == null)
              .map((item, index) => (
                <>
                  <ListItemButton
                    onClick={() => menuPress(item, index)}
                    sx={{
                      minHeight: 48,
                      justifyContent: state.open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: state.open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#54DFFF",
                      }}
                    >
                      {/* <FolderIcon /> */}
                      <img
                        src={`${base_url}/${item.image_option}`}
                        onError={({ e }) => {
                          e.onerror = null; // prevents looping
                          e.src =
                            "https://dev-api.eunimart.com/files/icons/MDM.svg";
                        }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={item.module_name}
                      value={item.module_name}
                      sx={{
                        display: state.open ? "block" : "none",
                        overflow: "hidden",
                      }}
                    />

                    {(state.open &&
                      state.selectMenu &&
                      (state.selectMenu.id == item.id ||
                        (item.ParentModule &&
                          state.selectMenu.parent_module_id == item.id)) && (
                        <KeyboardArrowUpIcon />
                      )) ||
                      (state.open && <KeyboardArrowDownIcon />)}
                  </ListItemButton>

                  <Collapse
                    in={
                      state.open &&
                      state.collasped &&
                      state.selectMenu &&
                      (item.id == state.selectMenu.id ||
                        (state.selectMenu.ParentModule &&
                          item.id == state.selectMenu.parent_module_id))
                    }
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {state.data &&
                        state.data
                          .filter(
                            (o) =>
                              o.ParentModule && o.parent_module_id == item.id
                          )
                          .map((sitem, sindex) => (
                            <ListItemButton
                              onClick={() => menuPress(sitem, sindex)}
                              sx={{ pl: 4, background: "#001661" }}
                            >
                              <ListItemText
                                primary={sitem.module_name}
                                value={sitem.module_name}
                              />
                            </ListItemButton>
                          ))}
                    </List>
                  </Collapse>
                </>
              ))}
          {/* {["Settings", "Profile", "Help"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: state.open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: state.open ? 2 : "auto",
                  justifyContent: "center",

                  color: "#54DFFF",
                }}
              >
                {index === 0 && <SettingsIcon />}
                {index === 1 && <PersonIcon />}
                {index === 2 && <HelpOutlineRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: state.open ? 1 : 0 }} />
            </ListItemButton>
          ))} */}
        </List>
      </Drawer>
    </>
  );
};

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