import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function AddMarker({ setSerViceArea }) {
  const [coord, setPosition] = useState([]);

  useMapEvents({
    click: (e) => {
      // setPosition([...coord, e.latlng]);
      setPosition([e.latlng]);
    },
  });

  useEffect(() => {
    console.log(coord);
    setSerViceArea(coord);
  }, [coord]);

  const removeMarker = (pos) => {
    setPosition((prevCoord) =>
      prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(pos))
    );
  };

  return (
    <div>
      {coord.map((pos, idx) => (
        <Marker
          key={`marker-${idx}`}
          position={pos}
          draggable={true}
          eventHandlers={{
            click: (e) => {
              console.log("ok", e.latlng);
            },
          }}
        >
          <Popup>
            <button onClick={() => removeMarker(pos)}>Remove marker</button>
          </Popup>
        </Marker>
      ))}
    </div>
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