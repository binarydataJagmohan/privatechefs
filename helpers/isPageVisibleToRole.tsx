import {getCurrentUserData } from "../lib/session";
import React, { useState ,useEffect} from 'react'

export function isPageVisibleToRole(pageName) {
    const current_user_data = getCurrentUserData(); 
    if(current_user_data.id!=null){
      const pageRoles = {
        "public-page": ["admin", "user", "guest"],
        "admin-page": ["admin"],
        "chef-menu": ["chef"],
        "chef-edit-profile": ["chef"],
        "chef-single-menu": ["chef"],
        "admin-chefs": ["admin"],
        "user-edit-profile": ["user"],
        "notification": ["admin","chef","user"],
      };

      if (pageName in pageRoles) {

        if(pageRoles[pageName].includes(current_user_data.role)){
          return 1; ////authorised user and owner of this page
        }else {

          return 0; //authorised user but not able to access this page due to role
        }
  
      } else {
        return 0 ; //authorised user but not able to access this page due to role
      }

    } else {
       return 2 ; //unauthorised user redirect to home page
    }
    
  }

  
