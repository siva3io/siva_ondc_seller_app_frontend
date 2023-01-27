import React from 'react'
import "./DashCard.css"
import { Button } from "@material-ui/core";

export default function DashCard(props) {
  return (
    <div className='boxCon'>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"98%",}} >
            <span className='title'>{props.title}</span>
            <hr style={{width:"100%"}}></hr>
            <img style={{margin:"15px 0",height:"150px"}} src={props?.url} />
            <p style={{fontSize:"16px"}}>
            {props?.desc}
            </p>
            <Button variant="contained" color="primary" style={{marginTop:"16px"}} onClick={(()=>{console.log("sample")})}>
                <a href={props.link} style={{textDecoration:"none",color:"#fff"}} target="_blank">Read more</a>
              </Button>
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