import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminSettings from "./screens/Admin/AdminSettings";
import Promotions from "./screens/Promotions/Promotions";
import PromotionsCreate from "./screens/Promotions/PromotionsCreate";
import PromotionsHistory from "./screens/Promotions/PromotionsHistory";
import PromotionsView from "./screens/Promotions/PromotionsView";

import Settings from "./screens/Settings";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY3MzU5MzE1MywiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciIsInJvbGVfaWQiOjEsInVzZXJfdHlwZXMiOlt7ImlkIjo2MzQsIm5hbWUiOiJTRUxMRVIifV19.mEcfB3sxIu8DD9nDn0P_YXKl6vUJfUF7vIftTDWh98Q"
    );
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/userSettings">
            <AdminSettings />
          </Route>
          <Route exact path="/promotions">
            <Promotions />
          </Route>
          <Route exact path="/promotions/promotionCreate">
            <PromotionsCreate />
          </Route>
          <Route exact path="/promotionHistory">
            <PromotionsHistory />
          </Route>

          <Route
            exact
            path="/promotions/promotionView/:id"
            render={props => <PromotionsView id={props.match.params.id} />}
          />
        </Switch>
      </div>
    </Router>
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
