import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { ToastContainer,toast } from 'react-toastify';
import { allergy,getAllergyDetails,allergyDelete } from '../../../lib/adminapi';

export default function Allergy()
{
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editAllergy, seteditAllergy] = useState(null);
  const [deleteAllergy, setdeleteAllergy,] = useState(null);
  const [allergis, setAllergis] = useState([]);

  const handleEdit = (id) => {
    seteditAllergy(id);
  };
  
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }
	
	useEffect(() => {
		getAllergyDetails()
			  .then((res) => {
				if (res.status) {
					console.log(res);
					setAllergis(res.data);
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

		  const handleDelete = (e,id) => {
			e.preventDefault();
			// setdeleteAllergy(id);
			 allergyDelete(id)
					   .then((res) => {
						console.log(res)
						 if (res.status === true) {
							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							  });
							  location.reload();
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
					 };
	//login submit start

	const handlMenuSubmit = (event) => {
		event.preventDefault();
	
		// Validate form data
		const errors = {};
	
		if (!name) {
		  errors.name = "Name is required";
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

		   allergy(data,image[0])
		  .then(res => {
			if(res.status==true){
			  
				setModalConfirm(false);
				setButtonState(false);
				console.log(res);
				setAllergis(res.data);

				toast.success(res.message, {
				  position: toast.POSITION.TOP_RIGHT
				});
			 
			} else {
				setButtonState(false);
				toast.error(res.message, {
					position: toast.POSITION.TOP_RIGHT
				  });
			}
		  })
		  .catch(err => {
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

    return(
        <>
          <div className="table-part">
				<h2>Allergy</h2>
				<ul className="table_header_button_section p-r">
					<li><button className="table-btn">Total</button></li>
					<li className="right-li"><button className="table-btn border-radius round-white" onClick={() => setModalConfirm(true)}>Add </button></li>
					</ul>
				  <div className="table-box">
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
						{allergis.map((allergy) => (
						  <tr key={allergy.id}>
                        <td>{allergy.id}</td>
                      <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_IMAGE_URL+'/images/admin/allergy/'+ allergy.image} alt=""/></td>
                      <td>{allergy.allergy_name}</td>
                      <td>{allergy.description}</td>
                     {/* <td>
						<a href="#" onClick={handleEdit}><i className="fa-solid fa-ellipsis"></i>
						</a>
						</td> */}
						<td>
                      <div className="dropdown">
                      <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-ellipsis"></i>
                      </a>
                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#">Edit</a></li>
                    <li><a className="dropdown-item" href="#" onClick={(e)=>handleDelete(e,allergy.id)}>Delete</a></li>
                   </ul>
                  </div>
                  </td>
                 </tr>
				 ))}
						</tbody>
					</table>
				</div>
			</div>
			{/* // Menu popup start  */}
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
                  {/* <div className="text-center popup-img">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                  </div> */}
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