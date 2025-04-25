export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  approved_by_admin: string;
  address: string;
  phone: string;
  passport_no: string;
}

export interface UserData {
  pic: string | null;
}

export interface Errors {
  location?: string;
  heading_one?: string;
  peragraph_one?: string;
  heading_two?: string;
  heading_three?: string;
  peragraph_two?: string;
  heading_box_one?: string;
  peragraph_box_one?: string;
  peragraph_box_two?: string;
  heading_box_two?: string;
  heading_box_three?: string;
  peragraph_box_three?: string;
  heading_box_four?: string;
  peragraph_box_four?: string;
  heading_box_five?: string;
  heading_four?: string;
  peragraph_four?: string;
  peragraph_box_five?: string;
  image?: string;
  heading_five?: string;
  peragraph_five?: string;
  heading_Six?: string;
}

export interface Location {
  id: number;
  address: string;
  location_status: string;
}

export interface Location1 {
  id: number;
  address: string;
  lat: number;
  lng: number;
}

export interface Testimonial {
  id: number;
  stars: number;
  name: string;
  description: string;
  image: string;
}
export interface LocationData {
  pic: string;
  address: string;
  name: string;
  location_pic: string;
  location_status: string;
}
export interface PageSlug {
  name: string;
  slug: string;
  meta_desc: string;
  meta_tag: string;
}
export interface LocationSlug {
  name: string;
  slug: string;
  meta_desc: string;
  meta_tag: string;
  address: any;
}

export interface LocationFields {
  location?: string;
  heading_one?: string;
  peragraph_one?: string;
  heading_two?: string;
  heading_three?: string;
  peragraph_two?: string;
  heading_box_one?: string;
  peragraph_box_one?: string;
  peragraph_box_two?: string;
  heading_box_two?: string;
  heading_box_three?: string;
  peragraph_box_three?: string;
  heading_box_four?: string;
  peragraph_box_four?: string;
  heading_box_five?: string;
  heading_four?: string;
  peragraph_four?: string;
  peragraph_box_five?: string;
  image?: string;
  heading_five?: string;
  peragraph_five?: string;
  heading_Six?: string;
}
