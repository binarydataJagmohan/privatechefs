import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { ToastContainer,toast } from 'react-toastify';
import { saveService,getServiceDetails,serviceDelete,getSingleServiceDetail } from '../../../lib/adminapi';
import swal from "sweetalert";
import { paginate } from "../../../helpers/paginate";
import Pagination from "../../commoncomponents/Pagination";

export default function ServiceChoice()
{
	const [errors, setErrors] = useState({});
	const [buttonStatus, setButtonState] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
	const [editmodalConfirm, editsetModalConfirm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
	const[services,setService] = useState([]);
	const [services2, setService2] = useState([]);
	//const [serviceDelete, setdeleteservice,] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;
 
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

	const editmodalConfirmOpen = () => {
		editsetModalConfirm(true);
	  };
	  const editmodalConfirmClose = () => {
		editsetModalConfirm(false);
	  };

	useEffect(() => {
		fetchServiceDetails();
	  }, [currentPage, pageSize]);
	
	  const fetchServiceDetails = async () => {
		try {
		  const res = await getServiceDetails();
		  if (res.status) {
			setService2(res.data);
			const paginatedPosts = paginate(res.data, currentPage, pageSize);
			setService(paginatedPosts);
		  } else {
			toast.error(res.message, {
			  position: toast.POSITION.TOP_RIGHT,
			});
		  }
		} catch (err) {
		  toast.error(err.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		  });
		}
	  };
	
	  const onPageChange = (page) => {
		setCurrentPage(page);
	  };

	  const handleDelete = (e, id) => {
		e.preventDefault();
		swal({
		  title: "Are you sure?",
		  text: "You want to delete the Allergy detail",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		  buttons: ["Cancel", "Yes, I am sure!"],
		  confirmButtonColor: "#062B60",
		}).then((willDelete) => {
		  if (willDelete) {
			serviceDelete(id)
			  .then((res) => {
				if (res.status === true) {
				  swal("Your Allergy Details has been deleted!", {
					icon: "success",
				  });
				  fetchServiceDetails();
				  setService([]);
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
		  } else {
			// handle cancel
		  }
		});
	  };

    //login submit start

	const handlMenuSubmit = (event) => {
		event.preventDefault();
	
		// Validate form data
		const errors = {};
	
		if (!name) {
		  errors.name = "Name is required";
		}
	
		if (!description) {
		  errors.description = "description is required";
		}
	
		setErrors(errors);
	
		// Submit form data if there are no errors
		if (Object.keys(errors).length === 0) {
		  setButtonState(true);
		  // Call an API or perform some other action to register the user
		  const data = {
			name: name,
			description: description,
		  };
	
		  saveService(data, image[0])
			.then((res) => {
			  if (res.status == true) {
				setModalConfirm(false);
				setButtonState(false);
				//console.log(res);
				const paginatedPosts = paginate(res.data, currentPage, pageSize);
				setService(paginatedPosts);
				//setService([]);
				toast.success(res.message, {
				  position: toast.POSITION.TOP_RIGHT,
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
		}
	  };

	  const handleMenuBlur = (event) => {
		const { name, value } = event.target;
		const newErrors = { ...errors };
	
		switch (name) {
		  
		  case "name":
			if (!value) {
			  newErrors.name = "Name is required";
			} else {
			  delete newErrors.name;
			}
			break;
		 
		  default:
			break;
		}
	
		setErrors(newErrors);
	  };
	  //login submit close

	  const editService = (e, id) => {
		e.preventDefault();
		editsetModalConfirm(true);
		getSingleServiceDetail(id).then((res) => {
		  //console.log(res);
		  setAllergyList(res.allergy);
		});
	  };
    return(
        <>
          <div className="table-part">
				<h2>Service Choice</h2>
				<ul className="table_header_button_section p-r">
					{/* <li><button className="table-btn">Total</button></li> */}
					<li className="right-li"><button className="table-btn border-radius round-white" onClick={() => setModalConfirm(true)}>Add </button></li> 
					</ul> 

				
				<div className="table-box" id='ffff'>
					<table className="table table-borderless">
						<thead>
							<tr>
                                <th scope="col">ID</th>
								<th scope="col">Photo</th>
								<th scope="col">Name</th>
								<th scope="col">Description</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
						          
								  
					    {services.map((service) => (
                        <tr key={service.id}>
                        <td>{service.id}</td>
                      <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_IMAGE_URL+'/images/admin/service/'+service.image} alt=""/></td>
                      <td>{service.service_name}</td>
                      <td>{service.description}</td>
					  <td>
                      <div className="dropdown" id='none-class'>
                      <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-ellipsis"></i>
                      </a>
                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#" onClick={(e) => editService(e, allergy.id)}>Edit</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e)=>handleDelete(e,service.id)}>Delete</a></li>
                   </ul>
                  </div>
                  </td>
                    </tr>
					 ))}
						</tbody>
					</table>
				</div>
				<Pagination
          items={services2.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
			</div>
			
			{/* // Menu popup start  */}
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
                  <div className="text-center popup-img">
                  </div>
                  <div className="all-form" > 
                  <form onSubmit={handlMenuSubmit}  className="common_form_error" id="menu_form">
                      <div className='login_div'>
                          <label htmlFor="name">Name:</label>
                          <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} onBlur={handleMenuBlur} autoComplete="username"/>
                          {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                      </div>
                      <div className='login_div'>
                          <label htmlFor="Description">Description:</label>
                          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={handleMenuBlur} ></textarea>
                      </div>
                      <div className='login_div'>
                          <label htmlFor="Image">Image:</label>
                            <input type="file" name="image"  onChange={ (e) => setImage(e.target.files) } accept="jpg,png"/>
                      </div>
                    
                      <button type="submit" className="btn-send w-100" disabled={buttonStatus}>Submit</button>
                  </form>
                              
                  </div>

              </PopupModal>

            {/* // Menu popup end  */}
            <ToastContainer/>
        </>
    )
}