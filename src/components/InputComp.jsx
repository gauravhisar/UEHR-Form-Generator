import React from "react";
export default function InputComp({child, ln}){

    return (
        <>
        <div key={child.id} className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                  {child.localizedNames && child.localizedNames[ln] ? child.localizedNames[ln] : child.id}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>
        </>
    );
}