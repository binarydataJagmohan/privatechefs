import React from "react";
interface EmptyStateProps {
  iconClass: string;
  heading: string;
  subText: string;
}

const PageFound: React.FC<EmptyStateProps> = ({ iconClass, heading, subText }) => {
  return (
    <div className="empty_state">
      <i className={iconClass}></i>
      <h3>
        {heading}
        <br />
        {subText}
      </h3>
    </div>
  );
};

export default PageFound;
