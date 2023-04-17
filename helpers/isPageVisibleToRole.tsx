import {getCurrentUserData } from "../lib/session";
import React, { useState ,useEffect} from 'react'

export function isPageVisibleToRole(pageName) {
    const current_user_data = getCurrentUserData(); 
    if(current_user_data.id!=null){
      const pageRoles = {
        "public-page": ["admin", "user", "guest"],
        "admin-page": ["admin"],
        "chef-menu": ["chef"],
      };

      if (pageName in pageRoles) {

        if(pageRoles[pageName].includes(current_user_data.role)){
          return 1;
        }else {

          return 0;
        }
  
      } else {
        return 0;
      }

    } else {
       return 2;
    }
    
  }

  