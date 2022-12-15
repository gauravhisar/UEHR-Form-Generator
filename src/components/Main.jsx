import React, { useState } from "react";
import InputComp from "./InputComp";
import LangSelector from "./Selector";



export default function Main({archetype, setArchetype, archetypeLoaded, setArchetypeLoaded}) {
  const [ln, setLanguage] = useState("en");
    
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
              <LangSelector
                ln={ln}
                setLanguage={setLanguage}
                langs={archetype.languages}
              />
            </div>
          </div>

          <h1>&nbsp;</h1>

          {archetype.tree.children.map((child) => {
            if (child.rmType.includes("EVENT")) {
              return (
                <div key={child.id} className="row py-2">
                  <div className="col-sm-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title pb-2">
                          {child.localizedNames[ln]
                            ? child.localizedNames[ln]
                            : child.id}
                        </h5>
                        <div className="card-text">
                          <ul className="list-group list-group-flush">
                            {child.children.map((child) => {
                              return (
                                <InputComp
                                  key={child.id}
                                  ln={ln}
                                  child={child}
                                />
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return <InputComp key={child.id} ln={ln} child={child} />;
            }
          })}
        </div>
    </>
  );
}
