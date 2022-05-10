import React from "react";

export default function UserBannerItem() {
  const firstWordOfName = localStorage.getItem("username").substring(0, 1);
  return (
    <div className="user-banner-item text-uppercase rounded-circle m-auto font-weight-bold d-flex justify-content-center align-items-center">
      {firstWordOfName}
    </div>
  );
}
