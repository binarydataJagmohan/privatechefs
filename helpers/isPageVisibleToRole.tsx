import { getCurrentUserData } from "../lib/session";
import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  role: string;
  // Other properties of the user data object
}

export function isPageVisibleToRole(pageName: string): number {
  const user: User = getCurrentUserData() as User;

  if (user.id != null) {
    
    const pageRoles: { [key: string]: string[] } = {
      "public-page": ["admin", "user", "guest"],
      "admin-page": ["admin"],
      "chef-menu": ["chef"],
      "chef-edit-profile": ["chef"],
      "chef-single-menu": ["chef"],
      "admin-chefs": ["admin"],
      "admin-allergy": ["admin"],
      "admin-servicechoice": ["admin"],
      "user-edit-profile": ["user"],
      "notification": ["admin", "chef", "user"],
      "villas": ["admin"],
      "chef-dish": ["chef"],
      "admin-cuisine": ['admin'],
      "admin-bookings": ['admin'],
      "chef-bookings": ['chef'],
      "user-bookings": ['user'],
      "receipt": ["chef"],
    };

    if (pageName in pageRoles) {
      if (pageRoles[pageName].includes(user.role)) {
        return 1; // Authorised user and owner of this page
      } else {
        return 0; // Authorised user but not able to access this page due to role
      }
    } else {
      return 0; // Authorised user but not able to access this page due to role
    }
  } else {
    return 2; // Unauthorised user redirect to home page
  }
}