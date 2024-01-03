import React, { useEffect, useState } from "react";

const PopupModal = ({ handleClose, show, children, staticClass, clientIdExists }: any) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let showHideClassName = '';
  if (staticClass === 'var-login') {
    showHideClassName = show ? "modal modal-part var-login d-block" : "modal modal-part d-none";
  } else {
    showHideClassName = show ? "modal modal-part d-block same-here" : "modal modal-part d-none";
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.className === "modal modal-part d-block") {
        handleClose();
      }
    };

    if (isClient) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (isClient) {
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, [handleClose, isClient]);

  const shouldShowCloseButton = clientIdExists ? false : true;

  return (
    <div className={showHideClassName} id="location_popup">
      <div className="modal-dialog user-book" id="chef-booking">
        <div className="modal-content">
          <div className="modal-header">
            {isClient && shouldShowCloseButton && (
              <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            )}
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
