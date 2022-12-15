
import React from "react";
export default function FileUploadPage({setSelectedFile, fetchFile}) {
  
    async function fileChangeHandler(e) {
      console.log(e.target.value);
      await setSelectedFile(e.target.value);
    }
  
    function handleFileSubmission() {
        fetchFile();
    }
  
    return (
      <div className="col-sm-6">
        <div className="input-group m-3">
        <span className="input-group-text" id="basic-addon1">Archetype File</span>
          <input
            type="text"
            aria-label="Filename"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            onChange = {fileChangeHandler}
          />
          <button
            className="btn btn-secondary"
            type="button"
            id="inputGroupFileAddon04"
            onClick={handleFileSubmission}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }