import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserData } from "../../../lib/session";
import {
  UpdateChefResumeByAdmin,
  SaveChefLocationByAdmin,
  getSingleLocationByAdmin,
  UpdateLocationStatusByAdmin,
  deleteSingleLocationofchefByAdmin,
  updateChefProfileByAdmin,
  getChefDetailByAdmin,
  getCurrentLocationofchefByAdmin,
  getChefResumeByAdmin,
  getChefLocationByAdmin,
} from "../../../lib/adminapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Loader } from "@googlemaps/js-api-loader";
import { showToast } from "../../commoncomponents/toastUtils";
import PopupModal from "../../commoncomponents/PopupModal";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  approved_by_admin: string;
  address: string;
  phone: string;
  passport_no: string;
}

interface UserData {
  pic: string | null;
}

interface Errors {
  email?: string;
  name?: string;
  surname?: string;
  address?: string;
  phone?: string;
  passport_no?: string;
  password?: string;
  confirmPassword?: string;
  locationaddress?: string;
}
interface Location {
  id: number;
  address: string;
  location_status: string;
}
interface Location1 {
  id: number;
  address: string;
  lat: number;
  lng: number;
}
export default function UpdateChefByAdmin(props: any) {
  const chefid = props.userId;
  const [name, setFullName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [passport_no, setPassportNo] = useState("");
  const [image, setImage] = useState("");
  const [buttonStatus, setButtonState] = useState(false);
  const [errors, setChefErrors] = useState<Errors>({});
  const [BIC, setBIC] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [bank_name, setBankName] = useState("");
  const [holder_name, setHolderName] = useState("");
  const [bank_address, setBankAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentUserData, setCurrentUserData] = useState<User>({
    id: 0,
    name: "",
    surname: "",
    email: "",
    approved_by_admin: "",
    address: "",
    phone: "",
    passport_no: "",
  });
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState<any>([]);
  const [services_type, setServicesType] = useState<any>([]);
  const [languages, setLanguages] = useState<any>([]);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<any>([]);
  const [favorite_chef, setFavoriteChef] = useState("");
  const [favorite_dishes, setFavoriteDishes] = useState<any>([]);
  const [love_cooking, setLoveCooking] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  const [instagram_link, setInstagramLink] = useState("");
  const [twitter_link, setTwitterLink] = useState("");
  const [linkedin_link, setLinkedinLink] = useState("");
  const [youtube_link, setYoutubeLink] = useState("");
  const [cookingSecret, setCookingSecret] = useState("");
  const [knowMeBetter, setKnowMeBetter] = useState("");
  const [locationaddress, setLocationaddress] = useState("");
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [location_status, setLocationStatus] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [chefLocation, setChefLocation] = useState<Location[]>([]);
  const [getsingledata, setGetSingleData]: any = useState([]);
  const [currentlocation, setCurrentLocation] = useState<Location1>({
    id: 0,
    address: "",
    lat: 0,
    lng: 0,
  });
  const [userData, setUserData] = useState<UserData>({ pic: "" });
  const mapRef = useRef(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const imageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const [vat_no, setVatNo] = useState("");
  const [tax_id, setTaxId] = useState("");

  const getUserData = async () => {
    const data = isPageVisibleToRole("chefprofile");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      const userData: User = getCurrentUserData() as User;
      setCurrentUserData(userData);
      getChefDetailData(chefid);
      getChefResumeData(chefid);
      getChefLocationData(chefid);
      getCurrentLocationData(chefid);
    }
  };
  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();
    // Validate form data
    const newErrors: Errors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setChefErrors(newErrors);
    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const userData: any = getCurrentUserData();
      setButtonState(true);
      // Call an API or perform some other action to register the user

      const data = {
        name: name || "",
        surname: surname || "",
        email: email || "",
        phone: phone || "",
        address: address || "",
        password: password || "",
        passport_no: passport_no || "",
        BIC: BIC || "",
        IBAN: IBAN || "",
        bank_name: bank_name || "",
        holder_name: holder_name || "",
        bank_address: bank_address || "",
        vat_no: vat_no || "",
        tax_id: tax_id || "",
        lat: lat || "",
        lng: lng || "",
        created_by: chefid,
      };

      updateChefProfileByAdmin(chefid, data)
        .then((res) => {
          if (res.status == true) {
            setButtonState(false);
            // setTimeout(() => {
            //   router.push("/admin/chefs");
            // }, 1000);
            showToast("success", res.message);
          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: "#ffff",
                borderLeft: "4px solid #e74c3c",
                color: "#454545",
              },
              progressStyle: {
                background: "#ffff",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegisterBlur = (event: any) => {
    const { name, value } = event.target; // Use 'name' to identify the field
    const newErrors = { ...errors };
    switch (name) {
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break; // Don't forget to add 'break' here
      default:
        break;
    }
    setChefErrors(newErrors);
  };
  const resumeUpdate = async (e: any) => {
    e.preventDefault();

    const formattedDescription = Object.keys(description)
      .filter((key: any) => description[key])
      .join(", ");

    const formattedService = Object.keys(services_type)
      .filter((key: any) => services_type[key])
      .join(", ");

    const formattedLanguages = Object.keys(languages)
      .filter((key: any) => languages[key])
      .join(", ");

    const formattedFavoriteDishes = Object.keys(favorite_dishes)
      .filter((key: any) => favorite_dishes[key])
      .join(", ");

    const formattedSkills = Object.keys(skills)
      .filter((key: any) => skills[key])
      .join(", ");

    // console.log(formattedDescription);

    setButtonState(true);

    const data = {
      about: about || "",
      description: formattedDescription || "",
      services_type: formattedService || "",
      languages: formattedLanguages || "",
      experience: experience || "",
      skills: formattedSkills || "",
      favorite_chef: favorite_chef || "",
      favorite_dishes: formattedFavoriteDishes || "",
      love_cooking: love_cooking || "",
      facebook_link: facebook_link || "",
      instagram_link: instagram_link || "",
      twitter_link: twitter_link || "",
      linkedin_link: linkedin_link || "",
      youtube_link: youtube_link || "",
      cooking_secret: cookingSecret || "",
      know_me_better: knowMeBetter || "",
    };
    console.log(data);
    UpdateChefResumeByAdmin(chefid, data)
      .then((res) => {
        setButtonState(false);
        console.log(res.data);
        showToast("success", res.message);
      })
      .catch((err) => {
        setButtonState(false);
        toast.error(err, {
          position: toast.POSITION.BOTTOM_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: "#ffff",
            borderLeft: "4px solid #e74c3c",
            color: "#454545",
          },
          progressStyle: {
            background: "#ffff",
          },
        });
      });
  };
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    function setupAddressAutocomplete(inputId: string) {
      const input: HTMLInputElement | null = document.getElementById(
        inputId
      ) as HTMLInputElement | null;
      if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (
            place &&
            place.formatted_address &&
            place.geometry &&
            place.geometry.location
          ) {
            const address = place.formatted_address;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // Set the values for the corresponding input field

            setAddress(address);
            setLat(lat.toString());
            setLng(lng.toString());
          }
        });
      }
    }

    loader
      .load()
      .then(() => {
        setupAddressAutocomplete("address-input");
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API", error);
      });
  }, []);

  const handleDescribesChange = (value: string) => {
    setDescription((prevDescription: any) => {
      const updatedDescription = { ...prevDescription };

      // Toggle the value in the object
      updatedDescription[value] = !updatedDescription[value];

      // Convert the object keys to a comma-separated string
      const descriptionString = Object.keys(updatedDescription)
        .filter((key) => updatedDescription[key])
        .join(", ");

      // Save the string in the state or send it to the database
      // setState or saveToDatabase(descriptionString);

      return updatedDescription;
    });
  };

  const handleServiceChange = (value: string) => {
    setServicesType((prevService: any) => {
      const updatedService = { ...prevService };

      // Toggle the value in the object
      updatedService[value] = !updatedService[value];

      // Convert the object keys to a comma-separated string
      const serviceString = Object.keys(updatedService)
        .filter((key) => updatedService[key])
        .join(", ");

      // Save the string in the state or send it to the database
      // setState or saveToDatabase(descriptionString);

      return updatedService;
    });
  };

  const handleLanguagesChange = (value: string) => {
    setLanguages((prevLanguages: any) => {
      const updatedLanguages = { ...prevLanguages };

      // Toggle the value in the object
      updatedLanguages[value] = !updatedLanguages[value];

      // Convert the object keys to a comma-separated string
      const languagesString = Object.keys(updatedLanguages)
        .filter((key) => updatedLanguages[key])
        .join(", ");

      // Save the string in the state or send it to the database
      // setState or saveToDatabase(descriptionString);

      return updatedLanguages;
    });
  };

  const handleCuisinesChange = (value: string) => {
    setFavoriteDishes((prevCuisines: any) => {
      const updatedCuisines = { ...prevCuisines };

      // Toggle the value in the object
      updatedCuisines[value] = !updatedCuisines[value];

      // Convert the object keys to a comma-separated string
      const cuisinesString = Object.keys(updatedCuisines)
        .filter((key) => updatedCuisines[key])
        .join(", ");

      // Save the string in the state or send it to the database
      // setState or saveToDatabase(descriptionString);

      return updatedCuisines;
    });
  };

  const handleSkillsChange = (value: string) => {
    setSkills((prevSkills: any) => {
      const updatedSkills = { ...prevSkills };

      // Toggle the value in the object
      updatedSkills[value] = !updatedSkills[value];

      // Convert the object keys to a comma-separated string
      const cuisinesString = Object.keys(updatedSkills)
        .filter((key) => updatedSkills[key])
        .join(", ");

      // Save the string in the state or send it to the database
      // setState or saveToDatabase(descriptionString);

      return updatedSkills;
    });
  };

  const saveLocation = async (e: any) => {
    const errors: any = {};
    if (!locationaddress) {
      errors.locationaddress = "Address is required";
    }
    setChefErrors(errors);

    if (Object.keys(errors).length === 0) {
      e.preventDefault();
      setButtonState(true);
      // const userData: User = getCurrentUserData() as User;
      //console.log(user_id)
      const data = {
        user_id: chefid,
        address: locationaddress,
        lat: lat,
        lng: lng,
      };
      SaveChefLocationByAdmin(data)
        .then((res) => {
          if (res.status == true) {
            getChefLocationData(chefid);
            setModalConfirm(false);
            setButtonState(false);
            showToast("success", res.message);
          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: "#ffff",
                borderLeft: "4px solid #e74c3c",
                color: "#454545",
              },
              progressStyle: {
                background: "#ffff",
              },
            });
          }
        })
        .catch((err) => {
          setButtonState(false);
          console.log("error");
          toast.error("Maximum limit of locations reached", {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: "#ffff",
              borderLeft: "4px solid #e74c3c",
              color: "#454545",
            },
            progressStyle: {
              background: "#ffff",
            },
          });
        });
    }
  };

  const resetFields = () => {
    setLocationStatus("");
    setLocationaddress("");
  };

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };
  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  const editmodalConfirmOpen = () => {
    editsetModalConfirm(true);
  };
  const editmodalConfirmClose = () => {
    editsetModalConfirm(false);
  };

  useEffect(() => {
    getUserData();

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    function setupAddressAutocomplete(inputId: string) {
      const input: HTMLInputElement | null = document.getElementById(
        inputId
      ) as HTMLInputElement | null;
      if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (
            place &&
            place.formatted_address &&
            place.geometry &&
            place.geometry.location
          ) {
            const address = place.formatted_address;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // Set the values for the corresponding input field
            if (inputId === "address-input") {
              setAddress(address);
              setLat(lat.toString());
              setLng(lng.toString());
            } else if (inputId === "address-input1") {
              setLocationaddress(address);
              setLat(lat.toString());
              setLng(lng.toString());
            } else if (inputId === "address-input2") {
              setLocationaddress(address);
              setLat(lat.toString());
              setLng(lng.toString());
            }
          }
        });
      }
    }

    loader
      .load()
      .then(() => {
        setupAddressAutocomplete("address-input");
        setupAddressAutocomplete("address-input1");
        setupAddressAutocomplete("address-input2");
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API", error);
      });
  }, []);

  const getChefDetailData = async (id: any) => {
    getChefDetailByAdmin(id)
      .then((res) => {
        setButtonState(false);
        if (res.status == true) {
          setFullName(res.data.name);
          setSurName(res.data.surname);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setAddress(res.data.address);
          setPassportNo(res.data.passport_no);
          setBIC(res.data.BIC);
          setIBAN(res.data.IBAN);
          setBankName(res.data.bank_name);
          setHolderName(res.data.holder_name);
          setBankAddress(res.data.bank_address);
          setUserData(res.data);
          setVatNo(res.data.vat_no);
          setTaxId(res.data.tax_id);
          setPassword(res.data.view_password);
          setConfirmPassword(res.data.view_password);
        } else {
          setButtonState(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: "#ffff",
              borderLeft: "4px solid #e74c3c",
              color: "#454545",
            },
            progressStyle: {
              background: "#ffff",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentLocationData = async (id: any) => {
    try {
      const res = await getCurrentLocationofchefByAdmin(id);
      if (res.status == true) {
        setModalConfirm(false);
        setCurrentLocation(res.data);
        //console.log(res.data.address);
        // Display the map for the selected location
        let lat, lng;

        // Update the property access based on the response structure
        if (res.data.geometry && res.data.geometry.location) {
          lat = res.data.geometry.location.lat;
          lng = res.data.geometry.location.lng;
        } else if (res.data.lat && res.data.lng) {
          lat = res.data.lat;
          lng = res.data.lng;
        } else {
          // Handle the case when the location coordinates are not available
          console.log("Location coordinates not found");
          return;
        }

        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lng);

        // Check if the parsed lat and lng are valid numbers
        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
          const mapOptions = {
            center: { lat: parsedLat, lng: parsedLng },
            zoom: 12,
          };

          // Ensure google is defined before creating the map
          if (typeof google !== "undefined" && mapRef.current !== null) {
            const map = new google.maps.Map(mapRef.current, mapOptions);
            const marker = new google.maps.Marker({
              position: { lat: parsedLat, lng: parsedLng },
              map: map,
              title: res.data.address,
            });
          }
        }
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChefResumeData = async (id: any) => {
    getChefResumeByAdmin(id)
      .then((res) => {
        if (res.status == true) {
          setAbout(res.data.about);
          if (res.data.description) {
            const descriptionArray = res.data.description
              .split(",")
              .map((item: any) => item.trim());

            // Set the description state based on the array
            setDescription({
              "Private Chef": descriptionArray.includes("Private Chef"),
              "Yacht Chef": descriptionArray.includes("Yacht Chef"),
              "Private Cook": descriptionArray.includes("Private Cook"),
            });
          }

          if (res.data.services_type) {
            const servicesTypeArray = res.data.services_type
              .split(",")
              .map((item: any) => item.trim());
            // Set the description state based on the array
            setServicesType({
              "In-House Chef": servicesTypeArray.includes("In-House Chef"),
              "Full time chef": servicesTypeArray.includes("Full time chef"),
              "Cooking Classes": servicesTypeArray.includes("Cooking Classes"),
              "Event Catering": servicesTypeArray.includes("Event Catering"),
            });
          }

          if (res.data.languages) {
            const languagesTypeArray = res.data.languages
              .split(",")
              .map((item: any) => item.trim());
            // Set the description state based on the array
            setLanguages({
              Greek: languagesTypeArray.includes("Greek"),
              English: languagesTypeArray.includes("English"),
              Spanish: languagesTypeArray.includes("Spanish"),
              French: languagesTypeArray.includes("German"),
              Italian: languagesTypeArray.includes("Italian"),
              German: languagesTypeArray.includes("German"),
            });
          }

          if (res.data.favorite_dishes) {
            const FavoriteDishesTypeArray = res.data.favorite_dishes
              .split(",")
              .map((item: any) => item.trim());
            // Set the description state based on the array
            setFavoriteDishes({
              Greek: FavoriteDishesTypeArray.includes("Greek"),
              Mediterranean: FavoriteDishesTypeArray.includes("Mediterranean"),
              Italian: FavoriteDishesTypeArray.includes("Italian"),
              French: FavoriteDishesTypeArray.includes("French"),
              Asian: FavoriteDishesTypeArray.includes("Asian"),
              Japanese: FavoriteDishesTypeArray.includes("Japanese"),
              Thai: FavoriteDishesTypeArray.includes("Thai"),
              Ethnic: FavoriteDishesTypeArray.includes("Ethnic"),
              BBQ: FavoriteDishesTypeArray.includes("BBQ"),
              Vegetarian: FavoriteDishesTypeArray.includes("Vegetarian"),
              Vegan: FavoriteDishesTypeArray.includes("Vegan"),
              "Fine Dining": FavoriteDishesTypeArray.includes("Fine Dining"),
            });
          }

          if (res.data.skills) {
            const SkillsTypeArray = res.data.skills
              .split(",")
              .map((item: any) => item.trim());

            // Set the description state based on the array
            setSkills({
              Kosher: SkillsTypeArray.includes("Kosher"),
              Halal: SkillsTypeArray.includes("Halal"),
              Hindu: SkillsTypeArray.includes("Hindu"),
              None: SkillsTypeArray.includes("None"),
            });
          }
          setExperience(res.data.experience);
          setFavoriteChef(res.data.favorite_chef);
          setLoveCooking(res.data.love_cooking);
          setFacebookLink(res.data.facebook_link);
          setInstagramLink(res.data.instagram_link);
          setTwitterLink(res.data.twitter_link);
          setLinkedinLink(res.data.linkedin_link);
          setYoutubeLink(res.data.youtube_link);
          setCookingSecret(res.data.cooking_secret);
          setKnowMeBetter(res.data.know_me_better);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: "#ffff",
              borderLeft: "4px solid #e74c3c",
              color: "#454545",
            },
            progressStyle: {
              background: "#ffff",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocation = async (id: any) => {
    try {
      const res = await getSingleLocationByAdmin(id);
      if (res.status == true) {
        setModalConfirm(false);
        // Display the map for the selected location
        let lat, lng;

        // Update the property access based on the response structure
        if (res.data.geometry && res.data.geometry.location) {
          lat = res.data.geometry.location.lat;
          lng = res.data.geometry.location.lng;
        } else if (res.data.lat && res.data.lng) {
          lat = res.data.lat;
          lng = res.data.lng;
        } else {
          // Handle the case when the location coordinates are not available
          console.log("Location coordinates not found");
          return;
        }

        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lng);

        // Check if the parsed lat and lng are valid numbers
        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
          const mapOptions = {
            center: { lat: parsedLat, lng: parsedLng },
            zoom: 12,
          };

          // Ensure google is defined before creating the map
          if (typeof google !== "undefined" && mapRef.current !== null) {
            const map = new google.maps.Map(mapRef.current, mapOptions);
            const marker = new google.maps.Marker({
              position: { lat: parsedLat, lng: parsedLng },
              map: map,
              title: res.data.address,
            });
          }
        }
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getChefLocationData = async (id: any) => {
    getChefLocationByAdmin(id)
      .then((res) => {
        setButtonState(false);
        if (res.status == true) {
          setChefLocation(res.data);
          //console.log(res.data);
          const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
            version: "weekly",
            libraries: ["places"],
          });
          loader.load().then(() => {
            if (res.data && res.data.length > 0) {
              const firstData = res.data[0];
              if (mapRef.current) {
                const map = new google.maps.Map(mapRef.current, {
                  center: {
                    lat: parseFloat(res.data[0].lat),
                    lng: parseFloat(res.data[0].lng),
                  },
                  zoom: 12,
                });

                const marker = new google.maps.Marker({
                  position: {
                    lat: parseFloat(res.data[0].lat),
                    lng: parseFloat(res.data[0].lng),
                  },
                  map: map,
                  title: res.data[0].address,
                });
                //console.log(res.data[0].address);
              }
            } else {
              // handle case where res.data is undefined or empty
            }
          });
        } else {
          setButtonState(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateLocationStatus = async (id: number, location_status: string) => {
    setButtonState(true);
    const data = {
      location_status: location_status,
    };
    UpdateLocationStatusByAdmin(id, data)
      .then((res) => {
        if (res.status == true) {
          getChefLocationData(chefid);
          setModalConfirm(false);
          setButtonState(false);
          showToast("success", res.message);
        } else {
          setButtonState(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: "#ffff",
              borderLeft: "4px solid #e74c3c",
              color: "#454545",
            },
            progressStyle: {
              background: "#ffff",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetSingleLocation = async (id: any) => {
    getSingleLocationByAdmin(id)
      .then((res) => {
        if (res.status == true) {
          setModalConfirm(false);
          editsetModalConfirm(true);
          setGetSingleData(res.data);
          setLocationaddress(res.data.address);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReceiptData = (id: any) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the Address",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleLocationofchefByAdmin(id)
          .then((res) => {
            if (res.status == true) {
              getChefLocationData(chefid);
              swal("Your Address has been deleted!", {
                icon: "success",
              });
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((err) => {});
      } else {
      }
    });
  };

  return (
    <>
      <div className="table-part">
        <h2>Update Chef</h2>
        <div className="tab-part change-btn-colors">
          <div className="border-bottom pb-3">
            <ul
              className="nav nav-pills text-left-j "
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Chef Profile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Chef Resume
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Chef Locations
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content mt-4" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <form onSubmit={handleRegisterSubmit}>
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="text-left">
                      <h5>Personal Information</h5>
                      <p className="f-12">
                        Please add Full name, contact details and your
                        ID/Passport no. This is required for legal purposes.
                      </p>
                      <div className="picture-profile">
                        <div className="row">
                          <div className="col-lg-4 col-md-5 col-4 pr-0">
                            <div className="user-img1 set-change-img">
                              {selectedImage ? (
                                <img
                                  src={URL.createObjectURL(selectedImage)}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                    "/images/chef/users.jpg"
                                  }
                                  alt=""
                                />
                              )}

                              <label>
                                <input
                                  type="file"
                                  name="image"
                                  id="uploadfile"
                                  className="d-none"
                                  onChange={imageChange}
                                  accept=".jpg, .jpeg, .gif, .png, .webp"
                                />
                                <i className="fa-solid fa-camera"></i>
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-7 col-8">
                            <div className="user-profile-collapsed mt-3">
                              <h6>Profile Picture</h6>
                              <p className="f-10-2">Chef</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="all-form">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            value={name || ""}
                            onChange={(e) => setFullName(e.target.value)}
                            maxLength={50}
                          />
                          {errors.name && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.name}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Surname</label>
                          <input
                            type="text"
                            name="surname"
                            value={surname || ""}
                            onChange={(e) => setSurName(e.target.value)}
                            maxLength={30}
                          />
                          {errors.surname && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.surname}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            // onChange={(e) => setEmail(e.target.value)}
                            maxLength={50}
                            value={email}
                            readOnly
                          />

                          {errors.email && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.email}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Phone Number</label>
                          <PhoneInput
                            country={"us"}
                            onChange={(phone) => setPhone(phone)}
                            value={phone}
                          />
                          {errors.phone && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-5 col-md-6">
                          <label>Address</label>
                          <input
                            id="address-input"
                            type="text"
                            name="address"
                            value={address || ""}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {errors.address && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.address}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-3 col-md-6">
                          <label>ID/Passport No.</label>
                          <input
                            type="text"
                            name="passport_no"
                            onChange={(e) => setPassportNo(e.target.value)}
                            maxLength={15}
                            value={passport_no || ""}
                          />

                          {errors.passport_no && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.passport_no}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="text-left">
                      <h5>Bank Details</h5>
                      <p className="f-12">
                        Please add bank details in order for chef payments to be
                        processed.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="all-form">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <label>IBAN</label>
                          <input
                            type="text"
                            name="IBAN"
                            onChange={(e) => setIBAN(e.target.value)}
                            maxLength={50}
                            value={IBAN || ""}
                          />
                          {/* {errors.IBAN && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.IBAN}
														</span>
													)} */}
                        </div>
                        <div className="col-lg-8 col-md-7">
                          <label>Bank Holder Name</label>
                          <input
                            type="text"
                            name="holder_name"
                            onChange={(e) => setHolderName(e.target.value)}
                            maxLength={50}
                            value={holder_name || ""}
                          />
                          {/* {errors.holder_name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.holder_name}
														</span>
													)} */}
                        </div>
                        <div className="col-lg-4 col-md-5">
                          <label>Bank Name</label>
                          <input
                            type="text"
                            name="bank_name"
                            onChange={(e) => setBankName(e.target.value)}
                            maxLength={50}
                            value={bank_name || ""}
                          />
                          {/* {errors.bank_name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.bank_name}
														</span>
													)} */}
                        </div>
                        <div className="col-lg-8 col-md-7">
                          <label>Bank Address</label>
                          <input
                            type="text"
                            name="bank_address"
                            onChange={(e) => setBankAddress(e.target.value)}
                            maxLength={50}
                            value={bank_address || ""}
                          />
                          {/* {errors.bank_address && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.bank_address}
														</span>
													)} */}
                        </div>

                        <div className="col-lg-4 col-md-5">
                          <label>VAT Number</label>
                          <input
                            type="text"
                            defaultValue="vat_no"
                            value={vat_no || ""}
                            maxLength={15}
                            onChange={(e) => setVatNo(e.target.value)}
                          />
                          {/* {errors.vat_no && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.vat_no}</span>} */}
                        </div>
                        <div className="col-lg-8 col-md-7">
                          <label>TAX ID</label>
                          <input
                            type="text"
                            defaultValue="tax_id"
                            value={tax_id || ""}
                            maxLength={15}
                            onChange={(e) => setTaxId(e.target.value)}
                          />
                          {/* {errors.tax_id && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.tax_id}</span>} */}
                        </div>

                        <div className="col-lg-4 col-md-5">
                          <label>BIC</label>
                          <input
                            type="text"
                            name="BIC"
                            value={BIC || ""}
                            onChange={(e) => setBIC(e.target.value)}
                            maxLength={8}
                          />
                          {/* {errors.BIC && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.BIC}
														</span>
													)} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="text-left">
                      <h5>Create Password</h5>
                      <p className="f-12">
                        Please add password and confirm password details in
                        order for chef to login.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="all-form">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <label>Password</label>
                          <div className="position-relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="registerpassword"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={handleRegisterBlur}
                              autoComplete="new-password"
                            />
                            <span
                              className="eye-password"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <i className="fas fa-eye-slash"></i>
                              ) : (
                                <i className="fa-solid fa-eye"></i>
                              )}
                            </span>
                            {errors.password && (
                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                {errors.password}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                          <label>Confirm Password</label>
                          <div className="position-relative">
                            <input
                              type={showconfirmPassword ? "text" : "password"}
                              id="confirmPassword text-danger mb-2 d-inline-block"
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              onBlur={handleRegisterBlur}
                              autoComplete="new-password"
                            />
                            <span
                              className="eye-password"
                              onClick={() =>
                                setShowConfirmPassword(!showconfirmPassword)
                              }
                            >
                              {showconfirmPassword ? (
                                <i className="fas fa-eye-slash"></i>
                              ) : (
                                <i className="fa-solid fa-eye"></i>
                              )}
                            </span>
                            {errors.confirmPassword && (
                              <span className="small error text-danger mb-2 d-inline-block error_login">
                                {errors.confirmPassword}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button className="table-btn" disabled={buttonStatus}>
                    {buttonStatus
                      ? "Please wait.."
                      : "Save Profile Information"}
                  </button>
                </div>
                <hr />
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <form onSubmit={resumeUpdate}>
                <>
                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      <div className="text-left">
                        <h5>Professional Profile</h5>
                        <p className="f-12">
                          {" "}
                          In this section you are creating the profile that you
                          will be able to share with your clients. Make sure you
                          make it clear and exciting for the client to read.
                        </p>
                        <div className="picture-profile">
                          <div className="row">
                            <div className="col-lg-4 col-md-5 col-4 pr-0">
                              <div className="user-img1">
                                {userData.pic ? (
                                  <img
                                    src={
                                      image && typeof image !== "string"
                                        ? URL.createObjectURL(image)
                                        : userData.pic
                                        ? process.env.NEXT_PUBLIC_IMAGE_URL +
                                          "/images/chef/users/" +
                                          userData.pic
                                        : ""
                                    }
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src={
                                      image && typeof image !== "string"
                                        ? URL.createObjectURL(image)
                                        : process.env.NEXT_PUBLIC_IMAGE_URL +
                                          "/images/chef/users.jpg"
                                    }
                                    // crop={{ ratio: "1/1", position: "center" }}
                                    alt=""
                                  />
                                )}

                                <label>
                                  {" "}
                                  <input
                                    type="file"
                                    name="image"
                                    id="uploadfile"
                                    className="d-none"
                                    onChange={imageChange}
                                    accept=".jpg, .jpeg, .gif, .png, .webp"
                                  />
                                  <i className="fa-solid fa-camera"></i>
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-8 col-md-7 col-8">
                              <div className="user-profile-collapsed mt-3">
                                <h6>Profile Picture</h6>
                                <p className="f-10-2">{currentUserData.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <div className="all-form">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <label>Tell us about you</label>
                            <textarea
                              name="about"
                              value={about || ""}
                              onChange={(e) => setAbout(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="col-lg-12 col-md-6 mt-2 ">
                            <label className="mb-3"> Know Me Better </label>
                            <input
                              type="text"
                              name="know_me_better"
                              value={knowMeBetter || ""}
                              onChange={(e: any) =>
                                setKnowMeBetter(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <label className="mb-4 d-block">
                              What describes you best?
                            </label>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox1"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleDescribesChange("Private Chefs")
                                }
                                checked={description["Private Chefs"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox1"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Private Chefs
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleDescribesChange("Yacht Chef")
                                }
                                checked={description["Yacht Chef"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox2"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Yacht Chef
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox3"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleDescribesChange("Private Cook")
                                }
                                checked={description["Private Cook"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox3"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Private Cook
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-6 mt-2 ">
                            <label className="mb-3">
                              Type of services you offer?
                            </label>
                            {/* <input type="text" name="services_type" value={services_type || ''} onChange={(e) => setServicesType(e.target.value)} /> */}

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox4"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleServiceChange("In-House Chef")
                                }
                                checked={services_type["In-House Chef"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox4"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                In-House Chef
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox5"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleServiceChange("Full time chef")
                                }
                                checked={services_type["Full time chef"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox5"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                {" "}
                                Full time chef
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox6"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleServiceChange("Cooking Classes")
                                }
                                checked={services_type["Cooking Classes"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox6"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Cooking Classes
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox7"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleServiceChange("Event Catering")
                                }
                                checked={services_type["Event Catering"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox7"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Event Catering
                              </label>
                            </div>
                          </div>

                          {/* <div className="col-lg-6 col-md-6 col-6">
														<label>Employment Status</label>
														<input type="text" name="employment_status" value={employment_status || ''} onChange={(e) => setEmploymentStatus(e.target.value)} />
													</div> */}
                          {/* <div className="col-lg-6 col-md-6 col-6">
														<label>Your website</label>
														<input type="text" name="website" value={website || ''} onChange={(e) => setWebsite(e.target.value)} />
													</div> */}
                          {/* <div className="col-lg-6 col-md-6 col-6">
														<label>Languages</label>
														<input type="text" name="languages" value={languages || ''} onChange={(e) => setLanguages(e.target.value)} />
													</div> */}

                          <div className="col-lg-12 col-md-6 mt-2 ">
                            <label className="mb-3">
                              Languages I can speak/understand.
                            </label>
                            {/* <input type="text" name="services_type" value={services_type || ''} onChange={(e) => setServicesType(e.target.value)} /> */}

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox8"
                                style={{ width: "auto" }}
                                onChange={() => handleLanguagesChange("Greek")}
                                checked={languages["Greek"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox8"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Greek
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox9"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleLanguagesChange("English")
                                }
                                checked={languages["English"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox9"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                {" "}
                                English
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox10"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleLanguagesChange("Spanish")
                                }
                                checked={languages["Spanish"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox10"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Spanish
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox11"
                                style={{ width: "auto" }}
                                onChange={() => handleLanguagesChange("French")}
                                checked={languages["French"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox11"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                French
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox12"
                                style={{ width: "auto" }}
                                onChange={() => handleLanguagesChange("German")}
                                checked={languages["German"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox12"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                German
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox13"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleLanguagesChange("Italian")
                                }
                                checked={languages["Italian"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox13"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Italian
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      <div className="text-left">
                        <h5>Professional Experience</h5>
                        <p className="f-12">
                          Showcase your professional experience to clients.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <div className="all-form">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <label>I love cooking because</label>
                            <textarea
                              name="love_cooking"
                              value={love_cooking || ""}
                              onChange={(e) => setLoveCooking(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <label>Culinary experience</label>
                            <textarea
                              name="experience"
                              value={experience || ""}
                              onChange={(e) => setExperience(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <label>Tell us about your favorite chefs</label>
                            <textarea
                              name="favorite_chef"
                              value={favorite_chef || ""}
                              onChange={(e) => setFavoriteChef(e.target.value)}
                            ></textarea>
                          </div>
                          {/* <div className="col-lg-12 col-md-12">
														<label>Tell us about your favorite cuisines</label>
														<textarea name="favorite_dishes" value={favorite_dishes || ''} onChange={(e) => setFavoriteDishes(e.target.value)}></textarea>
													</div> */}

                          <div className="col-lg-12 col-md-6 mt-2 ">
                            <label className="mb-3">
                              {" "}
                              Cuisines you can offer.
                            </label>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox14"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("Greek")}
                                checked={favorite_dishes["Greek"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox14"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Greek
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox15"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleCuisinesChange("Mediterranean")
                                }
                                checked={favorite_dishes["Mediterranean"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox15"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                {" "}
                                Mediterranean
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox16"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("Italian")}
                                checked={favorite_dishes["Italian"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox16"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Italian
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox17"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("French")}
                                checked={favorite_dishes["French"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox17"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                French
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox18"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("Asian")}
                                checked={favorite_dishes["Asian"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox18"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Asian
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox19"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleCuisinesChange("Japanese")
                                }
                                checked={favorite_dishes["Japanese"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox19"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Japanese
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox20"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("Thai")}
                                checked={favorite_dishes["Thai"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox20"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Thai
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox21"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("Ethnic")}
                                checked={favorite_dishes["Ethnic"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox21"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Ethnic
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox22"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("BBQ")}
                                checked={favorite_dishes["BBQ"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox22"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                BBQ
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox23"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleCuisinesChange("Vegetarian")
                                }
                                checked={favorite_dishes["Vegetarian"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox23"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Vegetarian
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox24"
                                style={{ width: "auto" }}
                                onChange={() => handleCuisinesChange("Vegan")}
                                checked={favorite_dishes["Vegan"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox24"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Vegan
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox25"
                                style={{ width: "auto" }}
                                onChange={() =>
                                  handleCuisinesChange("Fine Dining")
                                }
                                checked={favorite_dishes["Fine Dining"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox25"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Fine Dining
                              </label>
                            </div>
                          </div>

                          {/* <div className="col-lg-12 col-md-12">
														<label>Any special skills?</label>
														<textarea name="skills" value={skills || ''} onChange={(e) => setSkills(e.target.value)}></textarea>
													</div>
												</div> */}

                          <div className="col-lg-12 col-md-6 mt-2 ">
                            <label className="mb-3">
                              {" "}
                              Any special skills, knowledge?{" "}
                            </label>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox26"
                                style={{ width: "auto" }}
                                onChange={() => handleSkillsChange("Kosher")}
                                checked={skills["Kosher"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox26"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Kosher
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox27"
                                style={{ width: "auto" }}
                                onChange={() => handleSkillsChange("Halal")}
                                checked={skills["Halal"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox27"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                {" "}
                                Halal
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox28"
                                style={{ width: "auto" }}
                                onChange={() => handleSkillsChange("Hindu")}
                                checked={skills["Hindu"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox28"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                Hindu
                              </label>
                            </div>

                            <div className="form-check form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox29"
                                style={{ width: "auto" }}
                                onChange={() => handleSkillsChange("None")}
                                checked={skills["None"]}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineCheckbox29"
                                style={{ width: "auto", paddingLeft: "8px" }}
                              >
                                None
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-6 mt-2 ">
                            <label className="mb-3"> A cooking secret </label>
                            <input
                              type="text"
                              name="cooking_secret"
                              value={cookingSecret || ""}
                              onChange={(e: any) =>
                                setCookingSecret(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <hr />
									<div className="row">
										<div className="col-lg-4 col-md-12">
											<div className="text-left">
												<h5>Chef Services</h5>
												<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
											</div>
										</div>
										<div className="col-lg-8 col-md-12">
											<div className="all-form">
												<div className="row">
													<div className="col-lg-6 col-md-6 col-6">
														<label>Service One</label>
														<textarea name="servicetitleone" value={servicetitleone || ''} onChange={(e) => setServiceTitleOne(e.target.value)} maxLength={50}></textarea>
													</div>
													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Description One</label>
														<textarea name="servicedescriptionone" value={servicedescriptionone || ''} onChange={(e) => setServiceDescriptionOne(e.target.value)}></textarea>
													</div>
													
													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Two</label>
														<textarea name="servicetitletwo" value={servicetitletwo || ''} onChange={(e) => setServiceTitleTwo(e.target.value)} maxLength={50}></textarea>
													</div>
													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Description Two</label>
														<textarea name="servicedescriptiontwo" value={servicedescriptiontwo || ''} onChange={(e) => setServiceDescriptionTwo(e.target.value)}></textarea>
													</div>

													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Three</label>
														<textarea name="favorite_chef" value={servicetitlethree || ''} onChange={(e) => setServiceTitleThree(e.target.value)} maxLength={50}></textarea>
													</div>
													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Description Three</label>
														<textarea name="favorite_chef" value={servicedescriptionthree || ''} onChange={(e) => setServiceDescriptionThree(e.target.value)}></textarea>
													</div>


													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Four</label>
														<textarea name="favorite_dishes" value={servicetitlefour || ''} onChange={(e) => setServiceTitleFour(e.target.value)} maxLength={50}></textarea>
													</div>
													<div className="col-lg-6 col-md-6 col-6">
														<label>Service Description Four</label>
														<textarea name="favorite_dishes" value={servicedescriptionfour || ''} onChange={(e) => setServiceDescriptionFour(e.target.value)}></textarea>
													</div>
												</div>
											</div>
										</div>
									</div> */}

                  <hr />
                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      <div className="text-left">
                        <h5>Social Networks</h5>
                        <p className="f-12">
                          Share your social networks with clients.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <div className="all-form">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-6">
                            <label>Facebook</label>
                            <input
                              type="url"
                              name="facebook_link"
                              value={facebook_link || ""}
                              onChange={(e) => setFacebookLink(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-6">
                            <label>Instagram</label>
                            <input
                              type="url"
                              name="instagram_link"
                              value={instagram_link || ""}
                              onChange={(e) => setInstagramLink(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-6">
                            <label>Twitter</label>
                            <input
                              type="url"
                              name="twitter_link"
                              value={twitter_link || ""}
                              onChange={(e) => setTwitterLink(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-6">
                            <label>Linkedin</label>
                            <input
                              type="url"
                              name="linkedin_link"
                              value={linkedin_link || ""}
                              onChange={(e) => setLinkedinLink(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-6">
                            <label>Youtube</label>
                            <input
                              type="text"
                              name="youtube_link"
                              value={youtube_link || ""}
                              onChange={(e) => setYoutubeLink(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="table-btn" disabled={buttonStatus}>
                      {buttonStatus
                        ? "Please wait.."
                        : "Save Profile Resume Information"}
                    </button>{" "}
                  </div>
                  <hr></hr>
                </>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <div className="row">
                <div className="col-lg-5 col-md-12 position-r">
                  {Array.isArray(chefLocation) && chefLocation.length > 0 ? (
                    // Render the locations if the data is available
                    chefLocation.map((location, index) => (
                      <div className="location-name" key={index}>
                        <div className="row">
                          <div className="col-7">
                            <a onClick={() => getLocation(location.id)}>
                              <p className="f-16" style={{ cursor: "pointer" }}>
                                {location.address}
                              </p>
                            </a>
                          </div>
                          <div className="col-2">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="location_status"
                                value={location_status}
                                checked={location.location_status === "visible"}
                                onChange={(e) => {
                                  setLocationStatus(
                                    e.target.checked ? "visible" : "unvisible"
                                  );
                                  updateLocationStatus(
                                    location.id,
                                    e.target.checked ? "visible" : "unvisible"
                                  );
                                }}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="col-3 social">
                            <a
                              onClick={() => GetSingleLocation(location.id)}
                              id={`myCheckbox_${location.id}`}
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </a>
                            <a onClick={() => deleteReceiptData(location.id)}>
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Render a single item when the data is not available
                    <div className="location-name">
                      <div className="row">
                        <div className="col-7">
                          <a>
                            <p className="f-16" style={{ cursor: "pointer" }}>
                              {currentlocation.address}
                            </p>
                          </a>
                        </div>
                        <div className="col-2">
                          <label className="switch">
                            <input type="checkbox" name="location_status" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="banner-btn position-top">
                        <a
                          onClick={() => {
                            modalConfirmOpen();
                            resetFields();
                          }}
                          style={{ cursor: "pointer", color: "white" }}
                        >
                          Add New Location
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12">
                  <div ref={mapRef} style={{ height: "400px" }}></div>
                </div>
              </div>
              <PopupModal
                show={modalConfirm}
                handleClose={modalConfirmClose}
                staticClass="var-login"
              >
                <div className="all-form" id="form_id">
                  <form onSubmit={saveLocation}>
                    <h5>Add Location</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Address</label>
                        <input
                          id="address-input1"
                          type="text"
                          name="locationaddress"
                          onChange={(e) => setLocationaddress(e.target.value)}
                        />
                        {errors.locationaddress && (
                          <span className="small error text-danger mb-2 d-inline-block error_login">
                            {errors.locationaddress}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="table-btn" disabled={buttonStatus}>
                        {buttonStatus
                          ? "Please wait.."
                          : "Save Profile Location Information"}
                      </button>
                    </div>
                  </form>
                </div>
              </PopupModal>

              <PopupModal
                show={editmodalConfirm}
                handleClose={editmodalConfirmClose}
                staticClass="var-login"
              >
                <div className="all-form" id="form_id">
                  <form>
                    <h5>Edit Location</h5>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Address</label>
                        <input
                          id="address-input2"
                          type="text"
                          name="address"
                          defaultValue={locationaddress || ""}
                          onChange={(e) => setLocationaddress(e.target.value)}
                        />
                        {errors.locationaddress && (
                          <span className="small error text-danger mb-2 d-inline-block error_login">
                            {errors.locationaddress}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="table-btn" disabled={buttonStatus}>
                        {buttonStatus ? "Please wait.." : "Update"}
                      </button>
                    </div>
                  </form>
                </div>
              </PopupModal>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
