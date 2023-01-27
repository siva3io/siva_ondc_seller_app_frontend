import React, { Suspense, useEffect, useState } from "react";
// import LabeledText from "../../shared/OtherCommon/CommonLabel/LabeledText";
import "./ExternaDetails.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
const RemoteRating = React.lazy(() => import("Remote/Rating"));

import ErrorBoundary from "../../../../ErrorBoundary";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  boxShadow: " 0px 2px 2px rgba(0, 0, 0, 0.1)",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ReviewAndRatingPage = ({ user, mode, locationdata, data }) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [feedback, setfeedback] = useState([]);

  console.log(data, "data");
  useEffect(() => {
    data &&
      data[0] &&
      data[0].feedback &&
      data[0].feedback.feedback_form &&
      data[0].feedback.feedback_form.length > 0 &&
      setfeedback(data[0].feedback.feedback_form);
  }, [data]);

  return (
    feedback.length > 0 && (
      <>
        <div className="appStoreDetails">
          <div className="appStoreDetails-leftsec-reviews">
            <div className="companyDetailsOrder">
              <div className="companyDetailsOrderHeader">
                <div style={{ paddingLeft: "70%" }}>
                  {/* <div>
                    Top rated reviews
                  </div> */}
                  {/* <Button
                      // variant={"outlined"}
                      style={{
                        textTransform: "none",
                        backgroundColor: "#FD7789",
                        color: "white",
                      }}
                    >
                      Top rated reviews
                    </Button> */}
                  <Suspense fallback={<div>Loading...</div>}>
                    <RemoteWrapper>
                      <RemoteRating
                        rating={data && data[0] && data[0]?.rating_value}
                        color="#FABA1E"
                      />
                    </RemoteWrapper>
                  </Suspense>
                </div>
              </div>
              <div className="companyDetailsOrder_card">
                {feedback.length > 0 ? (
                  <div>
                    <p>{feedback[0]?.question}</p>
                    <p>{feedback[0]?.answer}</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="appStoreDetails-rightsec-reviews">
            <div className="rating-top-sec">
              <div className="rating-top-sec-left">Ratings</div>
              {/* <div className="seeAll">{"see all >"}</div> */}
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ fontSize: "64px" }}>4.3</div>
            </div>
          </div>
        </div>

        {feedback.length > 0 &&
          feedback?.map((eachdata, i) => {
            return i >= 0 ? (
              <div className="companyDetailsOrder">
                <div className="companyDetailsOrderHeader"></div>
                <div className="companyDetailsOrder_card">
                  <div>
                    <p>{eachdata?.question}</p>
                    <p>{eachdata?.answer}</p>
                  </div>
                </div>
                {/* <div className="share-reply">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant={"contained"}
                    style={{
                      textTransform: "none",
                      margin: "5px",
                      backgroundColor: "#416BFF",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    variant={"outlined"}
                    style={{
                      textTransform: "none",
                      margin: "5px",
                      color: "#416BFF",
                    }}
                  >
                    Reply
                  </Button>
                </Stack>
              </div> */}
                <div className="companyDetails_bottom"></div>
              </div>
            ) : null;
          })}
      </>
    )
  );
};

export default ReviewAndRatingPage;

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
