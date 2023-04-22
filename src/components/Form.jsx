import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputComp from "./InputComp";
import {LangSelector} from "./Selector";


export default function Form({archetype, setArchetype, archetypeLoaded, setArchetypeLoaded}) {
  const [ln, setLanguage] = useState("en")
  const {rmType, archetypeId} = useParams()
  const navigate = useNavigate()

  function getSnomedData(node) {
  let snomedData = {};
  // console.log(" Find Term Bindings for this node -,", node)
  
  axios.request({
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/MAIN/concepts',
    headers: { 
      'accept': 'application/json', 
      'Accept-Language': 'en',
    },
    params: {
      term: node.name ? node.name : node.id,
      offset:0 ,
      limit: 1
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    snomedData = response.data.items.length !== 0 ? response.data.items[0] : {}
  })
  .catch((error) => {
    console.log(error);
  });
  return snomedData;
  }

function getTermBindings(node) {
  if (node.termBindings && node.termBindings["SNOMED-CT"]) {
      return node.termBindings
  }
  let termBindings = {};
  let snomedData = getSnomedData(node)
  if (Object.keys(snomedData).length !== 0) {
    termBindings["SNOMED-CT"] = snomedData
  }
  return termBindings;

}

  function filterUtil(node){
    let data = {};
    if (node.children !== undefined){
      data["children"] = {}
      node.children.forEach(child => data["children"][child.id] = filterUtil(child))
      if (Object.values(data["children"]).join("") === "") return ""
    } else {
      let termBindings = {};
      termBindings = getTermBindings(node)
      if (Object.keys(termBindings).length !== 0) {
        data["termBindings"] = termBindings
      }
        if (node.inputs) {
          data["inputs"] = node.inputs.map(input => input.value)
          if (data["inputs"].join("") === "") return "" 
        }
        else {
          data.value =  node.value === undefined ? "" : node.value
        }
    }
    return data
  }
  
  function filter(archetype) {
    const data = {};
    data["archetypeId"] = archetype.tree.id;
    data["name"] = archetype.tree["name"];
    data["rmType"] = archetype.tree.rmType;
    data["ln"] = ln;
    data["patient"] = {}
    archetype.patient.forEach(p => data["patient"][p.id] = p)
    data["data"] = filterUtil(archetype.tree);
    return data;
  }

  async function handleFileSubmission(e) {
    const response = await axios.post("http://localhost:5001/",filter(archetype));
    alert("Form Submitted Successfully")
    navigate("/")
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
          res["patient"] = [
            {
              id: "patient_id",
              name: "Patient ID",
              value: ""
            },
            {
              id: "patient_name",
              name: "Patient Name",
              value: ""
            }
          ]
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
          {archetype.patient.map(child => <InputComp key={child.id} ln={ln} child={child} />)}
          {archetype.tree.children.map(child => <InputComp key={child.id} ln={ln} child={child} />)}
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
