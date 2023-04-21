import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';

export default function Dish()
{

  const [errors, setErrors] = useState({});

  const [modalConfirm, setModalConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

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
  return(
    <>
        <div className="table-part">
				<h2>Dishes</h2>
        <div className="d-flex justify-content-space-between">
				<button className="table-btn">Starter</button>
        <button className="table-btn"  onClick={() => setModalConfirm(true)}>Add Dish</button>
        </div>
				<div className="table-box">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" className='text-end'>Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td className='text-end'>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td className='text-end'>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td className='text-end'>@twitter</td>
    </tr>
  </tbody>
</table>
				</div>
			</div>
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
      <div className="all-form">
          <form
            
            className="common_form_error"
            id="menu_form"
            
          >
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
               
               
                onBlur={handleMenuBlur}
                autoComplete="username"
              />
              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea
                name="description"
               
               
                onBlur={handleMenuBlur}
              ></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input
                type="file"
                name="image"
                
                accept="jpg,png"
              />
            </div>

            <button
              type="submit"
              className="btn-send w-100"
              disabled={buttonStatus}
            >
              Submit
            </button>
          </form>
        </div>
			</PopupModal>
    </>
  )
}