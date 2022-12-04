import React from "react";
import { useState } from "react";
import "./OtherData.css";
const OtherData = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div
        style={{
          background: "#FFF38C",
          margin: "5px",
          radius: "3px",
          textAlign: "center",
        }}
        onMouseOver={() => setVisible(true)}
        onClick={() => setVisible(false)}
      >
        Other Data
      </div>
      {visible && (
        <div>
          Street:{" "}
          <input
            defaultValue={props.address.street}
            onChange={(e) => props.handleStr(e.target.value)}
          />
          <br />
          City:{" "}
          <input
            defaultValue={props.address.city}
            onChange={(e) => props.handleCity(e.target.value)}
          />
          <br />
          Zipcode:{" "}
          <input
            defaultValue={props.address.zipcode}
            onChange={(e) => props.handleZipcode(e.target.value)}
          />
          <br />
        </div>
      )}
    </div>
  );
};

export default OtherData;
