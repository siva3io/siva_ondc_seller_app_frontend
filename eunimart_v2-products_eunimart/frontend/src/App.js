import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";  
import "./index.css"; 
import { Provider } from 'react-redux';
import store from "./redux/store";
import { BrowserRouter } from 'react-router-dom'; 
import Url_Routes from './url_routes';
// import axios from "axios";

export const App = () => {    


  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY3NDg4NTc0NywiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciIsInJvbGVfaWQiOjEsInVzZXJfdHlwZXMiOlt7ImlkIjo2MzQsIm5hbWUiOiJTRUxMRVIifV19.9NoxIcpJQ-dl-0k0uOQL9SZnqSKPRJPmZ_XkSNEevEo");
} 

  // axios.interceptors.request.use(
  //   (req) => {
  //     req.headers["Authorization"] = "Bearer " + localStorage.getItem('token');
  //     console.log("NOT EXPIRED");
  //     return req;
  //   },
  //   (err) => {
  //     if (window.self !== window.top) {
  //       window.parent.location.href = websiteUrl;
  //     } else {
  //       window.location.href = websiteUrl;
  //     }
  //   }
  // );

return(  
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <Provider store={store}>  
         <Url_Routes/> 
      </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));

export default App;

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
