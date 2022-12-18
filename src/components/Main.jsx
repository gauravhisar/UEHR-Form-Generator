import React, { useState } from "react";
import InputComp from "./InputComp";
import Selector from "./Selector";



export default function Main({archetype, setArchetype, archetypeLoaded, setArchetypeLoaded}) {
  const [ln, setLanguage] = useState("en");

  function onLanguageChangeHandler(e) {
    setLanguage(e.target.value);
  }
    
  if (!archetypeLoaded){
    alert("Archetype Not Loaded");
    return <div></div>
  }
  return (
    <>
        <div className="px-2">
          <div className="row py-2">
            <div className="col-sm-10">
              <h2 style={{ display: "inline" }}>{archetype.tree.name}</h2>
              <h3 style={{ display: "inline" }}>({archetype.tree.rmType})</h3>
            </div>
            <div className="col-sm-2">
              <Selector
                value={ln}
                onValueChangeHandler={onLanguageChangeHandler}
                options={archetype.languages}
              />
            </div>
          </div>

          <h1>&nbsp;</h1>

          {archetype.tree.children.map((child) => {
              return <InputComp key={child.id} ln={ln} child={child} />
          })}
        </div>
        <div className="col-sm-12 text-center">
        <button
          className="btn btn-secondary"
          type="button"
          id="inputGroupFileAddon04"
          // onClick={handleFileSubmission}
        >
          Submit
        </button>
      </div>
    </>
  );
}
