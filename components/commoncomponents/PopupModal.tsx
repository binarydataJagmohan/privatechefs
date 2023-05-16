import React, { useEffect } from "react";

const PopupModal = ({ handleClose, show, children, staticClass }: any) => {
  let showHideClassName = '';
  if(staticClass == 'var-login'){
    showHideClassName = show ? "modal modal-part var-login  d-block" : "modal modal-part d-none";
  } else {
    showHideClassName = show ? "modal modal-part d-block same-here" : "modal modal-part d-none";
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.className === "modal  modal-part d-block") {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className={showHideClassName}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
              <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
