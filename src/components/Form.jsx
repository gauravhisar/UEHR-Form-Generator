import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputComp from "./InputComp";
import {LangSelector} from "./Selector";


export default function Form({archetype, setArchetype, archetypeLoaded, setArchetypeLoaded}) {
  const [ln, setLanguage] = useState("en")
  const {rmType, archetypeId} = useParams()

  function filterUtil(node){
    if (node.children !== undefined){
      let data = {};
      data["children"] = node.children.map(child => filterUtil(child))
      return data;
    } else {
      if (node.inputs) {
        let data = {}
        data["inputs"] = node.inputs.map(input => input.value)
        return data
      }
      else {
        return node.value
      }
    }
  }
  
  function filter(archetype) {
    console.log(archetype)
    const data = {};
    data["archetypeId"] = archetype.tree.id;
    data["name"] = archetype.tree["name"];
    data["rmType"] = archetype.tree.rmType;
    data["ln"] = ln;
    data["data"] = filterUtil(archetype.tree);
    return data;
  }

  async function handleFileSubmission(e) {
    const response = await axios.post("http://localhost:5001/",filter(archetype));
  }

  function onLanguageChangeHandler(e) {
    setLanguage(e.target.value);
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
