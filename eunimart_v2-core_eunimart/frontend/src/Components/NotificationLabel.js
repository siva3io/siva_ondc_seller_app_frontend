import React from 'react'

export default function NotificationLabel({props}) {
  return (
    <div style={{borderRadius:"8px",padding:"10px",background:"#fff",width:"93vw",height:"100px",display:"flex"}}>
      <div style={{height:"100%",width:"10%",minWidth:"50px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
        <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png" style={{width:"50px"}} />
      </div>
      <div style={{width:"80%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly",alignItems:"start"}}>
        <span className='nbTitle'>
        {props?.title}
        </span>
        <span className='nbMessage'>
       {props?.message}
        </span>
        <span className='nbTime'>
        {props?.time}
        </span>
      </div>
      <div style={{height:"100%",width:"10%",minWidth:"50px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",alignSelf:"flex-end"}}>
        <img src={props?.product} style={{width:"50px"}} />
      </div>
    </div>
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