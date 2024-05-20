import React, { useState, useEffect } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { getReceipt, getSingleReceiptAdmin } from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { useRouter } from "next/router";
import { es } from "date-fns/locale";
import PageFound from "../../pageFound";

export default function Receipts() {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [getreceipt, setGetReceipt] = useState("");
  const [totalMenu, setTotalMenu]: any = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };
  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  // useEffect(() => {
  // 	getUserData();
  // }, []);

  useEffect(() => {
    const bookingId = router.query.booking_id;
    if (bookingId !== undefined) {
      getUserData();
    } else {
      getUserData();
    }
  }, [router.query]);

  const getUserData = async () => {
    const data = isPageVisibleToRole("admin-receipt");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      getReceiptData();
    }
  };

  const getReceiptData = async () => {
    // alert(router.query.booking_id)
    getReceipt()
      .then((res) => {
        if (res.status == true) {
          let filteredReceipts = res.data;
          if (router.query.booking_id) {
            filteredReceipts = res.data.filter((receipt: any) => receipt.booking_id == router.query.booking_id);
          }

          setTotalMenu(filteredReceipts);
          const paginatedPosts = paginate(filteredReceipts, currentPage, pageSize);
          setGetReceipt(paginatedPosts);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="table-part">
        <h2>Receipts</h2>
        <button className="table-btn">Total</button>
        <div className="table-box mt-4">
          {getreceipt.length > 0 ? (
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Recipient Name</th>
                  <th scope="col">Chef Name</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Amount</th>
                  {/* <th scope="col">Payment Details</th>
								<th scope="col">Payment Details</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(getreceipt) &&
                  getreceipt.map((receipt, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{receipt.username}</td>
                      <td>{receipt.chefname}</td>
                      <td>{receipt.order_date ? new Date(receipt.order_date).toLocaleDateString() : ""}</td>
                      <td>#{receipt.booking_id}</td>
                      <td>{receipt.amount}</td>
                      {/* <td>{new Date(receipt.booking_date).toLocaleDateString()}</td> */}
                      <td style={{ paddingLeft: "25px" }}>
                        <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/receipts/" + receipt.id}>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <>
              <PageFound iconClass={"fa-solid fa-receipt"} heading={" No receipts  "} subText={"available"} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
