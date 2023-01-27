import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Modal from "./Modal";
// import "../../screens/OnBoarding.css";

function TokenCard({
  show,
  setShow,
  moveToApplication,
  setmoveToApplication,
  tokenOndcData,
  ...props
}) {
  // copy of token
  const token1 = tokenOndcData?.ondc?.encryption_private_key
    ? tokenOndcData?.ondc?.encryption_private_key
    : "token123";
  const token2 = tokenOndcData?.ondc?.encryption_public_key
    ? tokenOndcData?.ondc?.encryption_public_key
    : "token435";
  // console.log(props, "poiuytr");
  const handleClose = () => {
    setShow(false);
  };

  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  const handleSave = (e) => {
    navigator.clipboard.writeText("Token 1");

    setShow(false);
    setmoveToApplication(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleTooltipClose2 = () => {
    setOpen2(false);
  };

  const handleTooltipOpen2 = () => {
    setOpen2(true);
  };

  // const [copySuccess, setCopySuccess] = useState("");
  // const textAreaRef = useRef(null);

  // function copyToClipboard(e) {
  //   textAreaRef.current.select();
  //   document.execCommand("copy");
  //   // This is just personal preference.
  //   // I prefer to not show the whole text area selected.
  //   e.target.focus();
  //   setCopySuccess("Copied!");
  // }
  return (
    <>
      {show && (
        <Modal show={show} onClose={handleClose}>
          <Box className="modalHeaderBlock">
            <Box
              className="modalHeaderBtnDiv"
              style={{ marginRight: "-200px" }}
            >
              <Box>
                <label>Important</label>
              </Box>
              <Box>
                <ClearOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClose()}
                />
              </Box>
            </Box>
          </Box>
          <Box className="image_upload_popup">
            <Box
              className="upldImgLinkProduct"
              style={{ textAlign: "center", lineHeight: "1.6" }}
            >
              <div>
                Your access key (access key ID and secret access key) has been
                created successfully.
              </div>
              <div style={{ color: "red" }}>
                Copy your key now.
                <br /> If you do not copy the key file now, you will not be able
                to retrieve your secret access key again.
              </div>
              <Box
                className="image_upload_popup"
                style={{ background: "white" }}
              >
                <Box
                  className="upldImgLinkProduct"
                  style={{
                    textAlign: "center",
                    lineHeight: "1.6",
                    borderColor: "greenyellow",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "60px" }}>Token ID 1</div>
                    <div
                      style={{
                        marginRight: tokenOndcData?.ondc?.private_key ? 0 : "60px",
                        color: "darkgrey",
                        maxWidth: "500px",
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {tokenOndcData?.ondc?.encryption_private_key
                        ? tokenOndcData?.ondc?.encryption_private_key
                        : "Token1"}
                    </div>
                    <div style={{ color: "#416BFF", cursor: "pointer" }}>
                      <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div>
                          <Tooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied token id1"
                          >
                            <div
                              onClick={() => {
                                navigator.clipboard.writeText(token1);
                                handleTooltipOpen();
                              }}
                            >
                              Copy
                            </div>
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "60px" }}>Token ID 2</div>
                    <div
                      style={{
                        marginRight: tokenOndcData?.ondc?.public_key ? 0 : "60px",
                        color: "darkgrey",
                        maxWidth: "500px",
                        whiteSpace: "pre-wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {tokenOndcData?.ondc?.encryption_public_key
                        ? tokenOndcData?.ondc?.encryption_public_key
                        : "Token2"}
                    </div>
                    <div style={{ color: "#416BFF", cursor: "pointer" }}>
                      <ClickAwayListener onClickAway={handleTooltipClose2}>
                        <div>
                          <Tooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            onClose={handleTooltipClose2}
                            open={open2}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied token id2"
                          >
                            <div
                              onClick={() => {
                                navigator.clipboard.writeText(token2);
                                handleTooltipOpen2();
                              }}
                            >
                              Copy
                            </div>
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                    </div>
                  </div>

                  {props.sandboxUrl && (
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <div style={{ width: "30%" }}>Sand Box URL</div>
                      <div
                        style={{
                          width: "80%",
                          color: "darkgrey",
                          // maxWidth: "500px",
                          whiteSpace: "pre-wrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {props.sandboxUrl ? props.sandboxUrl : "url "}
                      </div>
                      <div style={{ color: "#416BFF" }}>Copy</div>
                    </div>
                  )}
                </Box>
              </Box>
              <div>
                To help protect your security. store your secret access key
                securely and do not share it.
                <br /> Hide Access Key
              </div>
            </Box>
          </Box>
          <Box className="modalFooterBlock">
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ margin: "0px 5px", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              //   disabled={tempImages.length === 0 ? true : false}
              style={{ textTransform: "none" }}
            >
              Next
            </Button>
            {/* </Box> */}
          </Box>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}

export default TokenCard;

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