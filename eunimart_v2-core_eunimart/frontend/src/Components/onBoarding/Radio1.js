import React from 'react'

export default function Radio1(props) {
    console.log(props,"props")
  return (
    <div style={{fontSize:"16px",fontFamily:"Inter"}}>
        {props.label}
        <form style={{display:"flex",flexDirection:"column",alignItems:"flex-start",fontSize:"14px",gap:"2vh",marginTop:"2vh"}}>
    
        {
            props.options?.map((feild)=>{
                return (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <input type="radio" name ={props.name} value={feild.value}  id={feild.label} onClick={(e)=>{props.handelRadioBtn(props.name, e.target.value)}} />
                        <label for={feild.label}>{feild.label}</label>
                    </div>
                )
            })
        }
       
            
        </form>
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