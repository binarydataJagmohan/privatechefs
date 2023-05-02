import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { getAllChefDetails } from '../../../lib/adminapi';
import { toast } from 'react-toastify';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";

export default function Chefs() {
	const [modalConfirm, setModalConfirm] = useState(false);
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

		const [chefs, setChefs] = useState([]);

		useEffect(() => {

			const data = isPageVisibleToRole('admin-chefs');
			if (data == 2) {
			  window.location.href = '/login'; // redirect to login if not logged in
			} else if (data == 0) {
			  window.location.href = '/404'; // redirect to 404 if not authorized
			}
		  
			getAllChefDetails()
			  .then((res) => {
				if (res.status) {
					console.log(res);
				  setChefs(res.data);
				} else {
				  toast.error(res.message, {
					position: toast.POSITION.TOP_RIGHT,
				  });
				}
			  })
			  .catch((err) => {
				toast.error(err.message, {
				  position: toast.POSITION.BOTTOM_RIGHT,
				});
			  });
		  }, []);
		

    return (
      <>
        <div className="table-part">
          <h2>Chefs</h2>
          <ul className="table_header_button_section p-r">
            <li>
              <button className="table-btn">Total</button>
            </li>
            <li className="right-li">
              <button
                className="table-btn border-radius round-white"
                onClick={() => setModalConfirm(true)}
              >
                Filter{" "}
              </button>
            </li>
          </ul>

          <div className="table-box">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">Name/Surname</th>
                  <th scope="col">Current Location</th>
                  <th scope="col">Cuisines</th>
                  <th scope="col">Location</th>
                  <th scope="col">Dietary restrictios</th>
                  <th scope="col">Rating</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {chefs.map((chef) => (
                  <tr key={chef.id}>
                    {chef.pic ? (
                      <td className="chefs_pic">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "images/chef/users/" +
                            chef.pic
                          }
                          alt=""
                        />
                      </td>
                    ) : (
                      <td className="chefs_pic">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/placeholder.jpg"
                          }
                          alt=""
                        />
                      </td>
                    )}
                    <td>{chef.name + " " + chef.surname}</td>
                    <td>{chef.address}</td>
                    <td>
                      <ul>
                        <li>{chef.cuisine_name}</li>
                        {/* <li>Italian</li>
                     <li>+4</li> */}
                      </ul>
                    </td>
                    <td>Ut pulvinar.</td>
                    <td>Arcu nibh non.</td>
                    <td>Eu nibh.</td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Cuisines
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
				<div className='container chkbox'>
                  <div className='row'>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Local Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Spanish Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Local Cuisine</label>
					</div>
					</div>
					<div className='row'>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Greek Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Japanese Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Local Cuisine</label>
					</div>
					</div>
					<div className='row'>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Thai Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Mexican Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Local Cuisine</label>
					</div>
					</div>
					<div className='row'>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Chinese Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Italian Cuisine</label>
					</div>
					<div className='col-sm-4'>
						<input type="checkbox" />
						<label>Local Cuisine</label>
					</div>
					</div>
				  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Locations
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element. These
                  classNamees control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Dietaty Restrictions
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element. These
                  classNamees control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </PopupModal>
      </>
    );
}