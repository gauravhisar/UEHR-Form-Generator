import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputComp from "./InputComp";
import {LangSelector} from "./Selector";




export default function Form({archetype, setArchetype, archetypeLoaded, setArchetypeLoaded}) {
  const [ln, setLanguage] = useState("en")
  const {rmType, archetypeId} = useParams()
  const navigate = useNavigate();

  

  function onLanguageChangeHandler(e) {
    setLanguage(e.target.value);
  }
  function handleFileSubmission(e) {
    navigate("/submission")
  }

  useEffect(() => {
    function fetchFile() {
      fetch(`/${rmType}/${archetypeId}.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then(async (res) => {
          console.log(res);
          await setArchetype(res);
          setArchetypeLoaded(true);
        })
        .catch((e) => {
          console.log(rmType, archetypeId)
          alert("File does not exist!");
        });
    }
    fetchFile()
  }, [rmType, archetypeId,setArchetype, setArchetypeLoaded])
    
  if (!archetypeLoaded){
    return <div></div>
  }
  return (
    <>
        <div className="px-2">
          <div className="row py-2 border-bottom border-secondary rounded-5 rounded-top bg-light">
            <div className="col-sm-10">
              <h2 style={{ display: "inline" }}>{archetype.tree.name}</h2>
              <h3 style={{ display: "inline" }}>({archetype.tree.rmType})</h3>
            </div>
            <div className="col-sm-2">
              <LangSelector
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
          onClick={handleFileSubmission}
        >
          Submit
        </button>
      </div>
    </>
  );
}
