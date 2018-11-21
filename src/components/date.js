import React from "react";

const myDate = new Date();

const MyDate = () => (
    <div>
      {myDate.toLocaleDateString()}
    </div>
)
export default MyDate;