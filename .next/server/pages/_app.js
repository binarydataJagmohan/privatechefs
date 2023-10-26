(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 9328:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8923);
/* harmony import */ var _lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__]);
_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function Header() {
    const [currentUserData, setCurrentUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [countdata, setCountData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getAllNotify();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .getCurrentUserData */ .Ts)();
        const now = new Date();
        const expirationDate = new Date(userData.expiration);
        if (now > expirationDate) {
            (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .removeToken */ .gy)();
            (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .removeStorageData */ .HB)();
            window.location.href = "/404";
            console.log("yes");
        } else {
            console.log("no");
        }
    }, []);
    const getAllNotify = async ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .getCurrentUserData */ .Ts)();
        setCurrentUserData(userData);
        getNotification(userData.id);
    };
    const getNotification = async (id)=>{
        (0,_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__/* .notificationForUserAdmin */ .SP)(id).then((res)=>{
            if (res.status == true) {
                setTimeout(()=>{
                    setCountData(res.count);
                }, 100);
            } else {
                console.log("error");
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "right-header mt-4 text-right",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-7 col-md-4 col-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "#",
                            className: "bars-icon",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                className: "fa-solid fa-bars"
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-3 col-md-6 col-6"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-1 col-md-1 col-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "mb-0 comments-bell",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/chats",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-comments"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-1 col-md-1 col-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "mb-0 comments-bell",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    href: `/admin/notification/notification?id=${currentUserData.id}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-bell"
                                    })
                                }),
                                countdata ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "badge badge-danger rounded-circle noti-icon-badge",
                                    style: {
                                        backgroundColor: "red",
                                        marginLeft: "5px"
                                    },
                                    children: countdata
                                }) : null
                            ]
                        })
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1027:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9328);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(112);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_2__, _sidebar__WEBPACK_IMPORTED_MODULE_3__]);
([_header__WEBPACK_IMPORTED_MODULE_2__, _sidebar__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function Layout({ children , ...props }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
            className: "header-part",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container-fluid pl-0 pr-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "row ml-0 mr-0",
                    id: "body-row",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sidebar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "right-part",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                                    ...props,
                                    children: children
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 112:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8923);
/* harmony import */ var _lib_userapi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(608);
/* harmony import */ var _lib_chefapi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3734);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_userapi__WEBPACK_IMPORTED_MODULE_3__, _lib_chefapi__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_userapi__WEBPACK_IMPORTED_MODULE_3__, _lib_chefapi__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function Sidebar() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [currentUserData, setCurrentUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [appliedbookingcount, setAppliedBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [hiredbookingcount, setHiredBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getUserData();
    }, []);
    const getUserData = async ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_5__/* .getCurrentUserData */ .Ts)();
        setCurrentUserData(userData);
        getBookingsCountData();
    };
    const getBookingsCountData = async ()=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_5__/* .getCurrentUserData */ .Ts)();
        (0,_lib_chefapi__WEBPACK_IMPORTED_MODULE_4__/* .getBookingsCount */ .ch)(userid.id).then((res)=>{
            if (res.status == true) {
                setAppliedBookingCount(res.available_booking);
                setHiredBookingCount(res.hired_booking);
            } else {
                console.log(res.message);
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    function handleLogout() {
        (0,_lib_userapi__WEBPACK_IMPORTED_MODULE_3__/* .UpdateUserToOffiline */ .Bm)(currentUserData.id).then((res)=>{
            if (res.status == true) {
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_5__/* .removeToken */ .gy)();
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_5__/* .removeStorageData */ .HB)();
                window.location.href = "/";
            } else {
                console.log("error");
            }
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            id: "sidebar-container",
            className: "sidebar-expanded  mobile-view d-md-block",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "fixed-left",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "user-profile",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-lg-3 col-md-4 col-4 pr-0",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/",
                                        children: currentUserData.pic != "null" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "https://privatechefsworld.us/apichef/public/" + "/images/chef/users/" + currentUserData.pic,
                                            alt: "user-menu"
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "https://privatechefsworld.us/apichef/public/" + "/images/chef/users.jpg",
                                            alt: "user-menu"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col-lg-9 col-md-8 col-8",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "user-profile-collapsed",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {}),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: currentUserData.role
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        className: "list-group",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "#",
                                "data-toggle": "sidebar-colapse",
                                className: "list-group-item list-group-item-action d-flex align-items-center icon-arrow",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "d-flex w-100 justify-content-start align-items-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-caret-right"
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-house"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Home"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/dashboard",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/dashboard" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-boxes-stacked"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "General"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/bookings",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/bookings" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-file-lines"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Available Bookings"
                                        }),
                                        appliedbookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "badge badge-danger rounded-circle noti-icon-badge",
                                            style: {
                                                backgroundColor: "#ff4e00d1",
                                                marginLeft: "5px",
                                                height: "25px",
                                                width: "25px",
                                                maxHeight: "25px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex"
                                            },
                                            children: appliedbookingcount
                                        }) : null
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/assigned-booking",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/assigned-booking" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-file-lines"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Assigned Bookings"
                                        }),
                                        hiredbookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "badge badge-danger rounded-circle noti-icon-badge",
                                            style: {
                                                backgroundColor: "#ff4e00d1",
                                                marginLeft: "5px",
                                                height: "25px",
                                                width: "25px",
                                                maxHeight: "25px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex"
                                            },
                                            children: hiredbookingcount
                                        }) : null
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/invoices",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/invoices" || router.pathname == "/admin/invoices/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-file"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Invoices"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/testimonial",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/testimonial" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-file"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Testimonial"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/receipts",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/receipts" || router.pathname == "/admin/receipts/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-credit-card"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Receipts"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/chefs",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/chefs" || router.pathname == "/admin/chefs/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-carrot"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Chefs"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/users",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/users" || router.pathname == "/admin/users/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa fa-user",
                                                "aria-hidden": "true"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Users"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/cuisine",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/cuisine" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-bowl-food"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Cuisine"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/calender",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/calender" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-calendar"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Calendar"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/villas",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/villas" || router.pathname == "/admin/villas2" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-house"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Villas"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/chats",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/chats" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-brands fa-rocketchat"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Chats"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/allergy",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/allergy" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-hand-dots"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Allergy"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/servicechoice",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/servicechoice" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-bell-concierge"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Service choice"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/setting",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/setting" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa fa-cog",
                                                "aria-hidden": "true"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Setting"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/pages",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/pages" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-file"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Pages"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/admin/top-rated-chef",
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                className: router.pathname == "/admin/top-rated-chef" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-star"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Top Rated Chef"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                onClick: handleLogout,
                                "data-toggle": "collapse",
                                "aria-expanded": "false",
                                role: "button",
                                className: router.pathname == "/chef/chats" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "icon-dash",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa fa-sign-out",
                                                "aria-hidden": "true"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "menu-collapsed",
                                            children: "Logout"
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4816:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8923);
/* harmony import */ var _lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_userapi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(608);
/* harmony import */ var _lib_chefapi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3734);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__, _lib_userapi__WEBPACK_IMPORTED_MODULE_4__, _lib_chefapi__WEBPACK_IMPORTED_MODULE_5__]);
([_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__, _lib_userapi__WEBPACK_IMPORTED_MODULE_4__, _lib_chefapi__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function Header() {
    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [countdata, setCountData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        id: 0,
        approved_by_admin: "",
        profile_status: "",
        approval_msg: "",
        created_by: ""
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        getSingleData(userid.id);
        getAllNotify();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        const now = new Date();
        const expirationDate = new Date(userData.expiration);
        if (now > expirationDate) {
            (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .removeToken */ .gy)();
            (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .removeStorageData */ .HB)();
            window.location.href = "/404";
            console.log("yes");
        } else {
            console.log("no");
        }
    }, []);
    const getSingleData = async (id)=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        (0,_lib_userapi__WEBPACK_IMPORTED_MODULE_4__/* .getSingleUserProfile */ .OV)(userid.id).then((res)=>{
            if (res.status == true) {
                setData(res.data);
                window.localStorage.setItem("profile_status", res.data.profile_status);
                window.localStorage.setItem("approved_by_admin", res.data.approved_by_admin);
                console.log(res.data);
            } else {
                console.log(res.message);
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    const approvalMsgStatus = ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        (0,_lib_chefapi__WEBPACK_IMPORTED_MODULE_5__/* .approvalMsg */ .p4)(userData.id).then((res)=>{
            if (res.status == true) {
                setCountData(res.count);
                setIsVisible(false);
            } else {
                console.log("error");
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    const getAllNotify = async ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        setUserData(userData.id);
        getNotification(userData.id);
    };
    const getNotification = async (id)=>{
        (0,_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__/* .notificationForUserAdmin */ .SP)(id).then((res)=>{
            if (res.status == true) {
                setCountData(res.count);
            } else {
                console.log("error");
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "right-header mt-4 text-right",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "col-lg-7 col-md-4 col-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "#",
                                className: "bars-icon",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-bars"
                                })
                            }),
                            data.profile_status === "pending" && data.approved_by_admin === "no" && data.created_by === null && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "alert alert-danger",
                                children: "Complete your profile for pending admin approval."
                            }),
                            data.profile_status === "completed" && data.approved_by_admin === "no" && data.created_by === null && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "alert alert-warning",
                                children: "Profile completed, awaiting admin approval to unlock culinary opportunities."
                            }),
                            isVisible && data.profile_status === "completed" && data.approved_by_admin === "yes" && data.approval_msg === "yes" && data.created_by === null && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "alert alert-success",
                                children: [
                                    "Congratulations! Your profile has been completed and approved by the admin.",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "table-btn1",
                                        value: "no",
                                        onClick: approvalMsgStatus,
                                        children: "OK"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-3 col-md-6 col-6"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-1 col-md-1 col-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "mb-0 comments-bell",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/chef/chats",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-comments"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-1 col-md-1 col-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "mb-0 comments-bell",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    href: `/chef/notification/notification?id=${userData}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-bell"
                                    })
                                }),
                                countdata ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "badge badge-danger rounded-circle noti-icon-badge",
                                    style: {
                                        backgroundColor: "red",
                                        marginLeft: "5px"
                                    },
                                    children: countdata
                                }) : null
                            ]
                        })
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6125:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4816);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6006);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_2__, _sidebar__WEBPACK_IMPORTED_MODULE_3__]);
([_header__WEBPACK_IMPORTED_MODULE_2__, _sidebar__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function Layout({ children , ...props }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
            className: "header-part",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container-fluid pl-0 pr-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "row ml-0 mr-0",
                    id: "body-row",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sidebar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "right-part",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                                    ...props,
                                    children: children
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6006:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8923);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4701);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_userapi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(608);
/* harmony import */ var _lib_chefapi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3734);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_userapi__WEBPACK_IMPORTED_MODULE_4__, _lib_chefapi__WEBPACK_IMPORTED_MODULE_5__]);
([_lib_userapi__WEBPACK_IMPORTED_MODULE_4__, _lib_chefapi__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function Sidebar() {
    const [currentUserData, setCurrentUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        id: "",
        name: "",
        email: "",
        pic: "",
        surname: "",
        role: "",
        approved_by_admin: "",
        profile_status: ""
    });
    const [userData, setUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        id: 0,
        approved_by_admin: "",
        created_by: ""
    });
    const [bookingcount, setBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [appliedbookingcount, setAppliedBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [hiredbookingcount, setHiredBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        getSingleData(userid.id);
        getUserData();
        // getBookingsCountData();
        getAppliedBookingsCountData();
    }, []);
    // const getBookingsCountData = async () => {
    //     getBookingsCount()
    //         .then(res => {
    //             if (res.status == true) {
    //                 setBookingCount(res.available_booking);
    //             } else {
    //                 console.log(res.message);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
    const getAppliedBookingsCountData = async ()=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        (0,_lib_chefapi__WEBPACK_IMPORTED_MODULE_5__/* .getAppliedBookingsCount */ .IA)(userid.id).then((res)=>{
            if (res.status == true) {
                setBookingCount(res.available_booking);
                setAppliedBookingCount(res.applied_booking);
                setHiredBookingCount(res.hired_booking);
            } else {
                console.log(res.message);
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    const getSingleData = async (id)=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        (0,_lib_userapi__WEBPACK_IMPORTED_MODULE_4__/* .getSingleUserProfile */ .OV)(userid.id).then((res)=>{
            if (res.status == true) {
                setUserData(res.data);
                console.log(res.data);
                window.localStorage.setItem("approved_by_admin", res.data.approved_by_admin);
            } else {
                console.log(res.message);
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    const getUserData = async ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .getCurrentUserData */ .Ts)();
        setCurrentUserData({
            ...userData,
            id: userData.id,
            name: userData.name,
            pic: userData.pic,
            surname: userData.surname,
            role: userData.role,
            approved_by_admin: userData.approved_by_admin,
            profile_status: userData.profile_status
        });
    };
    function handleLogout() {
        (0,_lib_userapi__WEBPACK_IMPORTED_MODULE_4__/* .UpdateUserToOffiline */ .Bm)(userData.id).then((res)=>{
            if (res.status == true) {
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .removeToken */ .gy)();
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_6__/* .removeStorageData */ .HB)();
                window.location.href = "/";
            } else {
                console.log("error");
            }
        });
    }
    function AdminApprovalInfoAlert() {
        sweetalert__WEBPACK_IMPORTED_MODULE_3___default()({
            title: "Oops!",
            text: "Your approval is pending at admin end",
            icon: "info"
        });
    }
    function CompleteProfile() {
        sweetalert__WEBPACK_IMPORTED_MODULE_3___default()({
            title: "Oops!",
            text: "First of all please complete your profile then click on other tab",
            icon: "info"
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            id: "sidebar-container",
            className: "sidebar-expanded  mobile-view d-md-block",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "user-profile",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-lg-3 col-md-4 col-4 pr-0",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "/chef/myprofile",
                                    children: currentUserData.pic != "null" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "https://privatechefsworld.us/apichef/public/" + "/images/chef/users/" + currentUserData.pic,
                                        alt: "user-menu"
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "https://privatechefsworld.us/apichef/public/" + "/images/chef/users.jpg",
                                        alt: "user-menu"
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-lg-9 col-md-8 col-8",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "user-profile-collapsed",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: "/chef/myprofile",
                                            className: router.pathname == "/chef/myprofile" ? "active" : "",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h5", {
                                                children: [
                                                    currentUserData.name,
                                                    " ",
                                                    currentUserData.surname != "null" ? currentUserData.surname : ""
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: currentUserData.role
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                    className: "list-group",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "#",
                            "data-toggle": "sidebar-colapse",
                            className: "list-group-item list-group-item-action d-flex align-items-center icon-arrow",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "d-flex w-100 justify-content-start align-items-center",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-caret-right"
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-house"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Home"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/dashboard",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/dashboard" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-boxes-stacked"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "General"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/bookings",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/bookings" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file-lines"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Available Jobs"
                                    }),
                                    bookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "badge badge-danger rounded-circle noti-icon-badge",
                                        style: {
                                            backgroundColor: "#ff4e00d1",
                                            marginLeft: "5px",
                                            height: "25px",
                                            width: "25px",
                                            maxHeight: "25px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex"
                                        },
                                        children: bookingcount
                                    }) : null
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/applied-booking",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/applied-booking" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file-lines"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Applied Jobs"
                                    }),
                                    appliedbookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "badge badge-danger rounded-circle noti-icon-badge",
                                        style: {
                                            backgroundColor: "#ff4e00d1",
                                            marginLeft: "5px",
                                            height: "25px",
                                            width: "25px",
                                            maxHeight: "25px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex"
                                        },
                                        children: appliedbookingcount
                                    }) : null
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/hired-booking",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/hired-booking" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file-lines"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Assigned Jobs"
                                    }),
                                    hiredbookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "badge badge-danger rounded-circle noti-icon-badge",
                                        style: {
                                            backgroundColor: "#ff4e00d1",
                                            marginLeft: "5px",
                                            height: "25px",
                                            width: "25px",
                                            maxHeight: "25px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex"
                                        },
                                        children: hiredbookingcount
                                    }) : null
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/invoices",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/invoices" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (currentUserData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Invoices"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/receipts",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/receipts" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-credit-card"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Receipts"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/menus",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/menus" || router.pathname == "/chef/menu/[id]" || router.pathname == "/chef/menus2" || router.pathname == "/chef/menus3" || router.pathname == "/chef/menus4" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-spoon"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Menus"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/dish",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/dish" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-cutlery"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Dishes"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/calender",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/calender" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-calendar"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Calendar"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/chef/chats",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/chef/chats" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            onClick: (e)=>{
                                if (userData.approved_by_admin === "no" && userData.created_by === null) {
                                    e.preventDefault();
                                    AdminApprovalInfoAlert();
                                } else if (currentUserData.profile_status === "pending" && userData.created_by === null) {
                                    e.preventDefault();
                                    CompleteProfile();
                                }
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-brands fa-rocketchat"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Chats"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            onClick: handleLogout,
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            role: "button",
                            className: router.pathname == "/chef/chats" ? "list-group-item list-group-item-action flex-column align-items-start " : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa fa-sign-out",
                                            "aria-hidden": "true"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Logout"
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9944:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8923);
/* harmony import */ var _lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__]);
_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function Header() {
    const [currentUserData, setCurrentUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [countdata, setCountData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getAllNotify();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .getCurrentUserData */ .Ts)();
        const now = new Date();
        const expirationDate = new Date(userData.expiration);
        if (now > expirationDate) {
            (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .removeToken */ .gy)();
            (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .removeStorageData */ .HB)();
            window.location.href = "/404";
            console.log("yes");
        } else {
            console.log("no");
        }
    }, []);
    const getAllNotify = async ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .getCurrentUserData */ .Ts)();
        setCurrentUserData(userData);
        getNotification(userData.id);
    };
    const getNotification = async (id)=>{
        (0,_lib_notificationapi__WEBPACK_IMPORTED_MODULE_2__/* .getNotificationConcierge */ .a_)(id).then((res)=>{
            if (res.status == true) {
                setTimeout(()=>{
                    setCountData(res.count);
                }, 100);
            } else {
                console.log("error");
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "right-header mt-4 text-right",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-7 col-md-4 col-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "#",
                            className: "bars-icon",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                className: "fa-solid fa-bars"
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-3 col-md-6 col-6"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-1 col-md-1 col-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "mb-0 comments-bell",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                href: "/concierge/chats",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-comments"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-lg-1 col-md-1 col-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "mb-0 comments-bell",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                    href: `/concierge/notification/notification?id=${currentUserData.id}`,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "fa-solid fa-bell"
                                    })
                                }),
                                countdata ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "badge badge-danger rounded-circle noti-icon-badge",
                                    style: {
                                        backgroundColor: "red",
                                        marginLeft: "5px"
                                    },
                                    children: countdata
                                }) : null
                            ]
                        })
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1563:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9944);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9390);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_2__, _sidebar__WEBPACK_IMPORTED_MODULE_3__]);
([_header__WEBPACK_IMPORTED_MODULE_2__, _sidebar__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function Layout({ children , ...props }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
            className: "header-part",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container-fluid pl-0 pr-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "row ml-0 mr-0",
                    id: "body-row",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sidebar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "right-part",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                                    ...props,
                                    children: children
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9390:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8923);
/* harmony import */ var _lib_concierge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8217);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_concierge__WEBPACK_IMPORTED_MODULE_3__]);
_lib_concierge__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function Sidebar() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [currentUserData, setCurrentUserData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [appliedbookingcount, setAppliedBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [hiredbookingcount, setHiredBookingCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getUserData();
    }, []);
    const getUserData = async ()=>{
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .getCurrentUserData */ .Ts)();
        setCurrentUserData(userData);
        getBookingsCountData();
    };
    const getBookingsCountData = async ()=>{
        const userid = (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .getCurrentUserData */ .Ts)();
        (0,_lib_concierge__WEBPACK_IMPORTED_MODULE_3__/* .getConciergeBookingsCount */ .zY)(userid.id).then((res)=>{
            if (res.status == true) {
                setAppliedBookingCount(res.allbooking);
                setHiredBookingCount(res.hired_booking);
            } else {
                console.log(res.message);
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
    // function handleLogout() {
    //     UpdateUserToOffiline(currentUserData.id)
    //     .then(res => {
    //         if (res.status == true) {
    //             removeToken();
    //             removeStorageData();
    //             window.location.href = '/';
    //         } else {
    //             console.log("error");
    //         }
    //     })
    //     }
    function handleLogout() {
        (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .removeToken */ .gy)();
        (0,_lib_session__WEBPACK_IMPORTED_MODULE_4__/* .removeStorageData */ .HB)();
        window.location.href = "/";
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            id: "sidebar-container",
            className: "sidebar-expanded  mobile-view d-md-block",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "user-profile",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-lg-3 col-md-4 col-4 pr-0",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: "/",
                                    children: currentUserData.pic == "null" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "https://privatechefsworld.us/apichef/public/" + "/images/users.jpg",
                                        alt: "user-menu"
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "https://privatechefsworld.us/apichef/public/" + "images/chef/users/" + currentUserData.pic,
                                        alt: "user-menu"
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-lg-9 col-md-8 col-8",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "user-profile-collapsed",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                            children: currentUserData.name
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: currentUserData.role
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                    className: "list-group",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "#",
                            "data-toggle": "sidebar-colapse",
                            className: "list-group-item list-group-item-action d-flex align-items-center icon-arrow",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "d-flex w-100 justify-content-start align-items-center",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-caret-right"
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-house"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Home"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/dashboard",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/dashboard" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-boxes-stacked"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "General"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/bookings",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/bookings" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file-lines"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Available Bookings"
                                    }),
                                    appliedbookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "badge badge-danger rounded-circle noti-icon-badge",
                                        style: {
                                            backgroundColor: "#ff4e00d1",
                                            marginLeft: "5px",
                                            height: "25px",
                                            width: "25px",
                                            maxHeight: "25px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex"
                                        },
                                        children: appliedbookingcount
                                    }) : null
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/assigned-booking",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/assigned-booking" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file-lines"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Assigned Bookings"
                                    }),
                                    hiredbookingcount ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "badge badge-danger rounded-circle noti-icon-badge",
                                        style: {
                                            backgroundColor: "#ff4e00d1",
                                            marginLeft: "5px",
                                            height: "25px",
                                            width: "25px",
                                            maxHeight: "25px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex"
                                        },
                                        children: hiredbookingcount
                                    }) : null
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/invoices",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/invoices" || router.pathname == "/concierge/invoices/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-file"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Invoices"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/receipts",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/receipts" || router.pathname == "/concierge/receipts/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-credit-card"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Receipts"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/chefs",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/chefs" || router.pathname == "/concierge/chefs/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-carrot"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Chefs"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/customers",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/customers" || router.pathname == "/concierge/customers/[id]" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-carrot"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Customers"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/calender",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/calender" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-calendar"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Calendar"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/villas",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/villas" || router.pathname == "/concierge/villas2" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-house"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Villas"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/concierge/chats",
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            className: router.pathname == "/concierge/chats" ? "list-group-item list-group-item-action flex-column align-items-start active" : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-brands fa-rocketchat"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Chats"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            onClick: handleLogout,
                            "data-toggle": "collapse",
                            "aria-expanded": "false",
                            role: "button",
                            className: router.pathname == "/chef/chats" ? "list-group-item list-group-item-action flex-column align-items-start " : "list-group-item list-group-item-action flex-column align-items-start",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "icon-dash",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa fa-sign-out",
                                            "aria-hidden": "true"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "menu-collapsed",
                                        children: "Logout"
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3888:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_frontend_FooterLocation_ChefLocation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6697);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_frontend_FooterLocation_ChefLocation__WEBPACK_IMPORTED_MODULE_3__]);
_components_frontend_FooterLocation_ChefLocation__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function Footer() {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const excludeFooterRoutes = [
        "/user/messages"
    ];
    // Check if the current route should exclude the footer
    const shouldExcludeFooter = excludeFooterRoutes.includes(router.pathname);
    // Render the footer only if shouldExcludeFooter is false
    if (shouldExcludeFooter) {
        return null;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
            className: "footer-main",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "container-fluid",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "footer-part ft-top-border text-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                            className: "color-bs8639 ",
                            children: "Subscribe to our newsletter"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                            className: "email-part mt-2",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                placeholder: "Enter your email"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_frontend_FooterLocation_ChefLocation__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            className: "ft-nav mt-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/contact/#faq",
                                        children: "FAQ"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/contact",
                                        children: "Contact Us"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/whoweare",
                                        children: "Who we are"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/ourchefs",
                                        children: "Our Chefs"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/ourservices",
                                        children: "Our Services"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/ourlocations",
                                        children: "Location"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/privacypolicy",
                                        children: "Privacy Policy"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/termsconditions",
                                        children: "Terms & Conditions"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            className: "ft-social mt-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.facebook.com/",
                                        target: "_blank",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-brands fa-facebook"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.instagram.com/",
                                        target: "_blank",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-brands fa-instagram"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://www.linkedin.com/",
                                        target: " ",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-brands fa-linkedin"
                                        })
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "font-small color-bs8639 mt-3 mb-0",
                            children: "Copyright \xa9 2023 Private Chefs All rights reserved"
                        })
                    ]
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 627:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3590);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7097);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8923);
/* harmony import */ var _components_commoncomponents_PopupModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4675);
/* harmony import */ var _lib_userapi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(608);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_3__, _lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__, _lib_userapi__WEBPACK_IMPORTED_MODULE_7__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_3__, _lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__, _lib_userapi__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function Header({}) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [modalConfirm, setModalConfirm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [modalConfirmTwo, setModalConfirmTwo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [modalConfirmThree, SetModalConfirmThree] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [buttonStatus, setButtonState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [role, setRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [confirmPassword, setConfirmPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [errors, setErrors] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [current_user_id, setCurrentUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [user_id, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const userrole = "admin";
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        checkuser();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const token = window.localStorage.getItem("token");
        const userData = (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .getCurrentUserData */ .Ts)();
        const now = new Date();
        const expirationDate = new Date(userData.expiration);
        if (token) {
            if (now > expirationDate) {
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeToken */ .gy)();
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeStorageData */ .HB)();
                window.location.href = "/404";
                console.log("yes");
            } else {
                console.log("no");
            }
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const token = window.localStorage.getItem("token");
        const role = window.localStorage.getItem("role");
        if (token && role) {
            setIsAuthenticated(true);
            setRole(role);
        }
    }, []);
    //   const { data: session } = useSession() || {};
    //   useEffect(() => {
    //      // if(session){
    //      // 	window.location.href = '/user/dashboard';
    //      // }
    //      if (session) {
    //       console.log(session);
    //       if (session.user.image.indexOf('googleusercontent') >= 0) {
    //          SocialData(session.user, 'google');
    //       } else{
    //              SocialData(session.user, 'facebook');
    //           }
    //      }
    //   }, [session]);
    const SocialData = (user, type)=>{
        const data = {
            name: user.name,
            email: user.email,
            login_type: type,
            password: "12345678"
        };
        // console.log(data);
        (0,_lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__/* .socialDataSave */ .UX)(data).then((res)=>{
            if (res.status == true) {
                if (res.data.token) {
                    window.localStorage.setItem("token", res.data.token);
                    window.localStorage.setItem("id", res.data.user.id);
                    window.localStorage.setItem("name", res.data.user.name);
                    window.localStorage.setItem("email", res.data.user.email);
                    window.localStorage.setItem("role", res.data.user.role);
                    window.localStorage.setItem("pic", res.data.user.pic);
                    window.localStorage.setItem("surname", res.data.user.surname);
                    window.localStorage.setItem("phone", res.data.user.phone);
                    window.localStorage.setItem("address", res.data.user.address);
                    window.localStorage.setItem("expiration", res.data.expiration);
                    window.localStorage.setItem("approved_by_admin", res.data.user.approved_by_admin);
                    window.localStorage.setItem("profile_status", res.data.user.profile_status);
                    window.localStorage.setItem("created_by", res.data.user.created_by);
                    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(res.message, {
                        position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                        closeButton: true,
                        hideProgressBar: false,
                        style: {
                            background: "#ffff",
                            borderLeft: "4px solid #ff4e00d1",
                            color: "#454545",
                            "--toastify-icon-color-success": "#ff4e00d1"
                        },
                        progressStyle: {
                            background: "#ffff"
                        }
                    });
                    setTimeout(()=>{
                        if (res.data.user.role == "user") {
                            window.location.href = "/user/userprofile";
                        }
                    }, 1000);
                } else {
                    setButtonState(false);
                    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info(res.message, {
                        position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                        closeButton: true,
                        hideProgressBar: false,
                        style: {
                            background: "#ffff",
                            borderLeft: "4px solid #e74c3c",
                            color: "#454545",
                            "--toastify-icon-color-success": "#ff4e00d1"
                        },
                        progressStyle: {
                            background: "#ffff"
                        }
                    });
                }
            } else {
                setButtonState(false);
                if (res.status === false && res.errors) {
                    Object.keys(res.errors).forEach(function(key) {
                        res.errors[key].forEach(function(errorMessage) {
                            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(errorMessage);
                        });
                    });
                }
            }
        }).catch((err)=>{});
    };
    const checkuser = async ()=>{
        const user = (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .getCurrentUserData */ .Ts)();
        if (user.id != null) {
            setCurrentUserId(true);
            setUserId(user.id);
        }
    };
    const modalConfirmClose = ()=>{
        setModalConfirm(false);
    };
    const modalConfirmCloseTwo = ()=>{
        setModalConfirmTwo(false);
    };
    const modalConfirmCloseThree = ()=>{
        SetModalConfirmThree(false);
    };
    const signuppopup = ()=>{
        setModalConfirm(false);
        setModalConfirmTwo(true);
        SetModalConfirmThree(false);
        setButtonState(false);
        (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeToken */ .gy)();
        (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeStorageData */ .HB)();
    };
    const signinpopup = ()=>{
        setModalConfirm(true);
        setModalConfirmTwo(false);
        SetModalConfirmThree(false);
        setButtonState(false);
        (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeToken */ .gy)();
        (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeStorageData */ .HB)();
    };
    const forgotpopup = ()=>{
        SetModalConfirmThree(true);
        setModalConfirm(false);
        setModalConfirmTwo(false);
        setButtonState(false);
    };
    function handleLogout() {
        (0,_lib_userapi__WEBPACK_IMPORTED_MODULE_7__/* .UpdateUserToOffiline */ .Bm)(user_id).then((res)=>{
            if (res.status == true) {
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeToken */ .gy)();
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeStorageData */ .HB)();
                (0,_lib_session__WEBPACK_IMPORTED_MODULE_9__/* .removeBookingData */ .Ak)();
                window.location.href = "/";
                setIsAuthenticated(false);
                setRole("");
            } else {
                console.log("error");
            }
        });
    }
    //login submit start
    const handleLoginSubmit = (event)=>{
        event.preventDefault();
        // Validate form data
        const newErrors = {};
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
        setErrors(newErrors);
        // Submit form data if there are no errors
        if (Object.keys(newErrors).length === 0) {
            setButtonState(true);
            // Call an API or perform some other action to register the user
            const data = {
                email: email,
                password: password
            };
            (0,_lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__/* .login */ .x4)(data).then((res)=>{
                if (res.status == true) {
                    if (res.authorisation.token) {
                        setButtonState(false);
                        setIsAuthenticated(true);
                        window.localStorage.setItem("token", res.authorisation.token);
                        window.localStorage.setItem("id", res.user.id);
                        window.localStorage.setItem("name", res.user.name);
                        window.localStorage.setItem("email", res.user.email);
                        window.localStorage.setItem("role", res.user.role);
                        window.localStorage.setItem("pic", res.user.pic);
                        window.localStorage.setItem("surname", res.user.surname);
                        window.localStorage.setItem("phone", res.user.phone);
                        window.localStorage.setItem("address", res.user.address);
                        window.localStorage.setItem("approved_by_admin", res.user.approved_by_admin);
                        window.localStorage.setItem("profile_status", res.user.profile_status);
                        window.localStorage.setItem("expiration", res.authorisation.expiration);
                        window.localStorage.setItem("created_by", res.user.created_by);
                        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(res.message, {
                            position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: "#ffff",
                                borderLeft: "4px solid #ff4e00d1",
                                color: "#454545",
                                "--toastify-icon-color-success": "#ff4e00d1"
                            },
                            progressStyle: {
                                background: "#ffff"
                            }
                        });
                        setTimeout(()=>{
                            if (res.user.role == "admin") {
                                window.location.href = "/admin/dashboard";
                            }
                        }, 1000);
                        setTimeout(()=>{
                            if (res.user.role == "user") {
                                if (res.user.profile_status == "completed") {
                                    window.location.href = "/bookings/step1";
                                } else {
                                    window.location.href = "/user/userprofile";
                                }
                            }
                        }, 1000);
                        setTimeout(()=>{
                            if (res.user.role == "chef") {
                                if (res.user.approved_by_admin == "yes" && res.user.profile_status == "completed") {
                                    window.location.href = "/chef/dashboard";
                                } else {
                                    window.location.href = "/chef/myprofile";
                                }
                            }
                        }, 1000);
                        setTimeout(()=>{
                            if (res.user.role == "concierge") {
                                window.location.href = "/concierge/dashboard";
                            }
                        }, 1000);
                    } else {
                        setButtonState(false);
                        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info(res.message, {
                            position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: "#ffff",
                                borderLeft: "4px solid #e74c3c",
                                color: "#454545",
                                "--toastify-icon-color-info": "#e74c3c"
                            },
                            progressStyle: {
                                background: "#ffff"
                            }
                        });
                    }
                } else {
                    setButtonState(false);
                    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info(res.message, {
                        position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                        closeButton: true,
                        hideProgressBar: false,
                        style: {
                            background: "#ffff",
                            borderLeft: "4px solid #e74c3c",
                            color: "#454545",
                            "--toastify-icon-color-info": "#e74c3c"
                        },
                        progressStyle: {
                            background: "#ffff"
                        }
                    });
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    };
    const handleLoginBlur = (event)=>{
        const { name , value  } = event.target;
        const newErrors = {
            ...errors
        };
        switch(name){
            case "email":
                if (!value) {
                    newErrors.email = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Invalid email address";
                } else {
                    delete newErrors.email;
                }
                break;
            case "password":
                if (!value) {
                    newErrors.password = "Password is required";
                } else if (value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                } else {
                    delete newErrors.password;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };
    //login submit close
    //register submit start
    const handleRegisterSubmit = (event)=>{
        event.preventDefault();
        // Validate form data
        const newErrors = {};
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
        if (!role) {
            newErrors.role = "Role is required";
        }
        setErrors(newErrors);
        // Submit form data if there are no errors
        if (Object.keys(newErrors).length === 0) {
            setButtonState(true);
            // Call an API or perform some other action to register the user
            const data = {
                name: name,
                email: email,
                password: password,
                role: role
            };
            (0,_lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__/* .register */ .z2)(data).then((res)=>{
                if (res.status == true) {
                    if (res.data.token) {
                        window.localStorage.setItem("token", res.data.token);
                        window.localStorage.setItem("id", res.data.user.id);
                        window.localStorage.setItem("name", res.data.user.name);
                        window.localStorage.setItem("email", res.data.user.email);
                        window.localStorage.setItem("role", res.data.user.role);
                        window.localStorage.setItem("pic", res.data.user.pic);
                        window.localStorage.setItem("surname", res.data.user.surname);
                        window.localStorage.setItem("phone", res.data.user.phone);
                        window.localStorage.setItem("address", res.data.user.address);
                        window.localStorage.setItem("expiration", res.data.user.expiration);
                        window.localStorage.setItem("approved_by_admin", res.data.user.approved_by_admin);
                        window.localStorage.setItem("profile_status", res.data.profile_status);
                        window.localStorage.setItem("created_by", res.data.user.created_by);
                        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(res.message, {
                            position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: "#ffff",
                                borderLeft: "4px solid #ff4e00d1",
                                color: "#454545",
                                "--toastify-icon-color-success": "#ff4e00d1"
                            },
                            progressStyle: {
                                background: "#ffff"
                            }
                        });
                        setTimeout(()=>{
                            if (res.data.user.role == "chef") {
                                window.location.href = "/chef/myprofile";
                            }
                        }, 1000);
                        setTimeout(()=>{
                            if (res.data.user.role == "concierge") {
                                window.location.href = "/concierge/dashboard";
                            }
                        }, 1000);
                        setTimeout(()=>{
                            if (res.data.user.role == "user") {
                                window.location.href = "/user/userprofile";
                            }
                        }, 1000);
                    } else {
                        setButtonState(false);
                        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info(res.message, {
                            position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: "#ffff",
                                borderLeft: "4px solid #e74c3c",
                                color: "#454545",
                                "--toastify-icon-color-success": "#ff4e00d1"
                            },
                            progressStyle: {
                                background: "#ffff"
                            }
                        });
                    }
                } else {
                    setButtonState(false);
                    if (res.status === false && res.errors) {
                        Object.keys(res.errors).forEach(function(key) {
                            res.errors[key].forEach(function(errorMessage) {
                                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(errorMessage);
                            });
                        });
                    }
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    };
    const handleRegisterBlur = (event)=>{
        const { name , value  } = event.target;
        const newErrors = {
            ...errors
        };
        switch(name){
            case "name":
                if (!value) {
                    newErrors.name = "Name is required";
                } else {
                    delete newErrors.name;
                }
                break;
            case "email":
                if (!value) {
                    newErrors.email = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Invalid email address";
                } else {
                    delete newErrors.email;
                }
                break;
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
            case "role":
                if (!value) {
                    newErrors.role = "Role is required";
                } else {
                    delete newErrors.role;
                }
                break;
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };
    //register submit close
    //Forgout submit start
    const handleForgotSubmit = (event)=>{
        event.preventDefault();
        // Validate form data
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email address";
        }
        setErrors(errors);
        // Submit form data if there are no errors
        if (Object.keys(errors).length === 0) {
            setButtonState(true);
            // Call an API or perform some other action to register the user
            const data = {
                email: email
            };
            (0,_lib_frontendapi__WEBPACK_IMPORTED_MODULE_5__/* .forgetPassword */ .o9)(data).then((res)=>{
                if (res.status == true) {
                    SetModalConfirmThree(false);
                    setButtonState(false);
                    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(res.message, {
                        position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                        closeButton: true,
                        hideProgressBar: false,
                        style: {
                            background: "#ffff",
                            borderLeft: "4px solid #ff4e00d1",
                            color: "#454545",
                            "--toastify-icon-color-success": "#ff4e00d1"
                        },
                        progressStyle: {
                            background: "#ffff"
                        }
                    });
                } else {
                    setButtonState(false);
                    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info(res.message, {
                        position: react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.POSITION.TOP_RIGHT,
                        closeButton: true,
                        hideProgressBar: false,
                        style: {
                            background: "#ffff",
                            borderLeft: "4px solid #e74c3c",
                            color: "#454545",
                            "--toastify-icon-color-info": "#ff4e00d1"
                        },
                        progressStyle: {
                            background: "#ffff"
                        }
                    });
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    };
    const handleForgotBlur = (event)=>{
        const { name , value  } = event.target;
        const newErrors = {
            ...errors
        };
        switch(name){
            case "email":
                if (!value) {
                    newErrors.email = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Invalid email address";
                } else {
                    delete newErrors.email;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };
    //Forgout submit close
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
                className: "header-part",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "container-fluid",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                        className: "navbar navbar-expand-lg navbar-light bottom-border",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                className: "navbar-brand header-logo",
                                href: "/",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: "http://privatechefsworldwide.com/" + "images/logo.png",
                                    alt: "logo"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "navbar-toggler",
                                type: "button",
                                "data-bs-toggle": "collapse",
                                "data-bs-target": "#navbarSupportedContent",
                                "aria-controls": "navbarSupportedContent",
                                "aria-expanded": "false",
                                "aria-label": "Toggle navigation",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "navbar-toggler-icon"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "collapse navbar-collapse",
                                id: "navbarSupportedContent",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                    className: "navbar-nav ms-auto mt-2 ",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: `nav-item ${router.pathname === "/bookings/step1" ? "active" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/bookings/step1",
                                                children: "Start your journey"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: `nav-item ${router.pathname === "/whoweare" ? "active" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/whoweare",
                                                children: "Who we are"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: `nav-item ${router.pathname === "/ourchefs" ? "active" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/ourchefs",
                                                children: "Our Chefs"
                                            })
                                        }),
                                        role == "user" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: `nav-item ${router.pathname === "/user/messages" ? "active" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/user/messages",
                                                children: "Message"
                                            })
                                        }),
                                        isAuthenticated && role === "admin" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: `nav-item ${router.pathname === "/admin/dashboard" ? "active" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/admin/dashboard",
                                                children: "Dashboard"
                                            })
                                        }),
                                        isAuthenticated && role === "chef" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: `nav-item ${router.pathname === "/chef/dashboard" ? "active" : ""}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/chef/dashboard",
                                                children: "Dashboard"
                                            })
                                        }),
                                        isAuthenticated && role === "user" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: "nav-item",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/user/userprofile",
                                                children: "My Profile"
                                            })
                                        }),
                                        isAuthenticated && role === "concierge" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: "nav-item",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "/concierge/dashboard",
                                                children: "Dashboard"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            className: "user",
                                            children: !current_user_id ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "#",
                                                onClick: ()=>signinpopup(),
                                                children: "SignIn/SignUp"
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "nav-link",
                                                href: "#",
                                                onClick: handleLogout,
                                                children: "Logout"
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_commoncomponents_PopupModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                show: modalConfirm,
                handleClose: modalConfirmClose,
                staticClass: "var-login",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "text-center popup-img",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "http://privatechefsworldwide.com/" + "images/logo.png",
                            alt: "logo"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "all-form",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                onSubmit: handleLoginSubmit,
                                className: "common_form_error",
                                id: "login_form",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "email",
                                                children: "Email:"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "email",
                                                id: "loginemail",
                                                name: "email",
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                onBlur: handleLoginBlur,
                                                autoComplete: "username"
                                            }),
                                            errors.email && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login",
                                                children: errors.email
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "password",
                                                children: "Password:"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "password",
                                                id: "loginpassword",
                                                name: "password",
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                onBlur: handleLoginBlur,
                                                autoComplete: "current-password"
                                            }),
                                            errors.password && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login",
                                                children: errors.password
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "submit",
                                        className: "btn-send w-100",
                                        disabled: buttonStatus,
                                        children: buttonStatus ? "Please wait.." : "Submit"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex justify-content-between sign_up_forgot_password",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-link text-left my-2",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                            href: "#",
                                            onClick: ()=>signuppopup(),
                                            children: [
                                                "Don’t have an account? ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: "Sign up"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-link text-left my-2",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: "#",
                                            onClick: ()=>forgotpopup(),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "Forgot password? "
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "btn-g",
                                onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_8__.signIn)("google"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "http://privatechefsworldwide.com/" + "images/g-logo.png",
                                        alt: "g-logo"
                                    }),
                                    " Continue with Google"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "btn-g",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "http://privatechefsworldwide.com/" + "images/a-logo.jpg",
                                        alt: "a-logo"
                                    }),
                                    " Continue with Apple"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "btn-g",
                                onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_8__.signIn)("facebook"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "http://privatechefsworldwide.com/" + "images/f-logo.png",
                                        alt: "f-logo"
                                    }),
                                    " Continue with Facebook"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_commoncomponents_PopupModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                show: modalConfirmTwo,
                handleClose: modalConfirmCloseTwo,
                staticClass: "var-login",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "text-center popup-img",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "http://privatechefsworldwide.com/" + "images/logo.png",
                            alt: "logo"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "all-form",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                onSubmit: handleRegisterSubmit,
                                className: "common_form_error",
                                id: "register_form",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "name",
                                                children: "Name:"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "text",
                                                id: "name",
                                                name: "name",
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                onBlur: handleRegisterBlur
                                            }),
                                            errors.name && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login ",
                                                children: errors.name
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "email",
                                                children: "Email:"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "email",
                                                id: "registeremail",
                                                name: "email",
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                onBlur: handleRegisterBlur
                                            }),
                                            errors.email && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login",
                                                children: errors.email
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div mb-2",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "email",
                                                children: "Role:"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                className: "login-select",
                                                onChange: (e)=>setRole(e.target.value),
                                                name: "role",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                        value: "",
                                                        children: "Select Role"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                        value: "user",
                                                        children: "User"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                        value: "chef",
                                                        children: "Chef"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                        value: "concierge",
                                                        children: "Concierge"
                                                    })
                                                ]
                                            }),
                                            errors.role && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login",
                                                children: errors.role
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "password",
                                                children: "Password:"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "password",
                                                id: "registerpassword",
                                                name: "password",
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                onBlur: handleRegisterBlur,
                                                autoComplete: "new-password"
                                            }),
                                            errors.password && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login",
                                                children: errors.password
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "login_div",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "confirmPassword",
                                                children: "Confirm Password:"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "password",
                                                id: "confirmPassword text-danger mb-2 d-inline-block",
                                                name: "confirmPassword",
                                                value: confirmPassword,
                                                onChange: (e)=>setConfirmPassword(e.target.value),
                                                onBlur: handleRegisterBlur,
                                                autoComplete: "new-password"
                                            }),
                                            errors.confirmPassword && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "small error text-danger mb-2 d-inline-block error_login",
                                                children: errors.confirmPassword
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "submit",
                                        className: "btn-send w-100",
                                        disabled: buttonStatus,
                                        children: buttonStatus ? "Please wait.." : "Submit"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-link text-left my-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                    href: "#",
                                    onClick: ()=>signinpopup(),
                                    children: [
                                        "Already have account? ",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: "Sign in"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "btn-g",
                                onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_8__.signIn)("google"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "http://privatechefsworldwide.com/" + "images/g-logo.png",
                                        alt: "g-logo"
                                    }),
                                    " Continue with Google"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "btn-g",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "http://privatechefsworldwide.com/" + "images/a-logo.jpg",
                                        alt: "a-logo"
                                    }),
                                    " Continue with Apple"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                className: "btn-g",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "http://privatechefsworldwide.com/" + "images/f-logo.png",
                                        alt: "f-logo"
                                    }),
                                    " Continue with Facebook"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_commoncomponents_PopupModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                show: modalConfirmThree,
                handleClose: modalConfirmCloseThree,
                staticClass: "var-login",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "text-center popup-img",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "http://privatechefsworldwide.com/" + "images/logo.png",
                            alt: "logo"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "all-form",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            onSubmit: handleForgotSubmit,
                            className: "common_form_error",
                            id: "forgot_form",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "login_div",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "email",
                                            children: "Email:"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            type: "email",
                                            id: "email",
                                            name: "email",
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value),
                                            onBlur: handleForgotBlur
                                        }),
                                        errors.email && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "small error text-danger mb-2 d-inline-block error_login",
                                            children: errors.email
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "submit",
                                    className: "btn-send w-100",
                                    disabled: buttonStatus,
                                    children: buttonStatus ? "Please wait.." : "Submit"
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {})
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1084:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(627);
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3888);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_1__, _footer__WEBPACK_IMPORTED_MODULE_2__]);
([_header__WEBPACK_IMPORTED_MODULE_1__, _footer__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function Layout({ children , ...props }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                ...props,
                children: children
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_footer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {})
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4178:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_frontend_layouts_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1084);
/* harmony import */ var _components_admin_layouts_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1027);
/* harmony import */ var _components_chef_layouts_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6125);
/* harmony import */ var _components_concierge_layouts_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1563);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_frontend_layouts_layout__WEBPACK_IMPORTED_MODULE_1__, _components_admin_layouts_layout__WEBPACK_IMPORTED_MODULE_2__, _components_chef_layouts_layout__WEBPACK_IMPORTED_MODULE_3__, _components_concierge_layouts_layout__WEBPACK_IMPORTED_MODULE_4__]);
([_components_frontend_layouts_layout__WEBPACK_IMPORTED_MODULE_1__, _components_admin_layouts_layout__WEBPACK_IMPORTED_MODULE_2__, _components_chef_layouts_layout__WEBPACK_IMPORTED_MODULE_3__, _components_concierge_layouts_layout__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// import '@/styles/globals.css'









function App({ Component , pageProps  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    if (router.pathname.startsWith("/admin")) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "Admin Dashboard"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            charSet: "utf-8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_admin_layouts_layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                })
            ]
        });
    } else if (router.pathname.startsWith("/chef")) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "Chef Dashboard"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            charSet: "utf-8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_chef_layouts_layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                })
            ]
        });
    } else if (router.pathname.startsWith("/concierge")) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "Concierge Dashboard"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            charSet: "utf-8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_concierge_layouts_layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                })
            ]
        });
    } else if (router.pathname.startsWith("/bookings")) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "Bookings"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            charSet: "utf-8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_frontend_layouts_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                })
            ]
        });
    } else {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                            children: "Private Chef"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            charSet: "utf-8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                            name: "viewport",
                            content: "width=device-width, initial-scale=1"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_auth_react__WEBPACK_IMPORTED_MODULE_7__.SessionProvider, {
                    session: pageProps.session,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_frontend_layouts_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    })
                })
            ]
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8819:
/***/ (() => {



/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4701:
/***/ ((module) => {

"use strict";
module.exports = require("sweetalert");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 3590:
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,8923,4675,3734,7097,8217,608,7893,6697], () => (__webpack_exec__(4178)));
module.exports = __webpack_exports__;

})();