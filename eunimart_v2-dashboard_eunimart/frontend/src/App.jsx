import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
// import { StrictMode } from "react";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Switch } from "react-router-dom";
import DashBoard from "./screens/DashBoard";
// import CreateProduct from "./screens/ApplicationScreens/CreateProduct";
import View from "./screens/ApplicationScreens/View";
import CreateProductIndex from "./screens/ApplicationScreens/CreateProductIndex";

const App = () => {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY3NDI3ODM2NiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciIsInJvbGVfaWQiOjEsInVzZXJfdHlwZXMiOlt7ImlkIjo2MzQsIm5hbWUiOiJTRUxMRVIifV19.2HrPzI9r0CeN371BNKheSnrmwn3MHHzOFUwwFJajyuw"
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/catalog" element={<View />} />
          <Route exact path="/dashboard" element={<DashBoard />} />
          {/* <Route exact path="/createProduct" element={<CreateProduct />} /> */}
          <Route exact path="/createProduct" element={<CreateProductIndex />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
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
