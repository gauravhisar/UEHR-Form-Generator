import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Selector from "./Selector";

export default function FileUploadPage({
  setArchetype,
  archetypeLoaded,
  setArchetypeLoaded,
}) {

  const [allArchetypes, setAllArchetypes] = useState({});
  const [availableRmTypes, setAvailableRmTypes] = useState([]);
  const [availableArchetypes, setAvailableArchetypes] = useState([]);
  const [rmType, setRmType] = useState("");
  const [archetypeId, setArchetypeId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function fetchAvailableArchetypes() {
      fetch(`Archetypes.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((Archetypes) => {
          return Archetypes.json();
        })
        .then((Archetypes) => {
          setAvailableRmTypes(Object.keys(Archetypes));
          setRmType(Object.keys(Archetypes)[0]);
          setAvailableArchetypes(Archetypes[Object.keys(Archetypes)[0]]);
          setArchetypeId(Archetypes[Object.keys(Archetypes)[0]][0]);
          setAllArchetypes({ ...Archetypes });
        });
    }
    fetchAvailableArchetypes();
  }, []);

  function fetchFile() {
    fetch(`${rmType}/${archetypeId}.json`, {
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
        alert("File does not exist!");
      });
  }

  async function handleFileSubmission() {
    await fetchFile();
    if (archetypeLoaded) {
      navigate(`/archetype`);
    }
  }

  function onRmTypeChangeHandler(e) {
    setRmType(e.target.value);
    setAvailableArchetypes(allArchetypes[e.target.value]);
    setArchetypeId(allArchetypes[e.target.value][0]);
  }

  function onArchetypeChangeHandler(e) {
    setArchetypeId(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleFileSubmission();
    }
  }

  return (
    <>
      <div className="row border rounded m-2">
        <div className="col-sm-5">
          <div className="input-group m-3" onKeyDown={handleKeyDown}>
            <span className="input-group-text" id="basic-addon1">
              Resource Type
            </span>

            <Selector
              value={rmType}
              onValueChangeHandler={onRmTypeChangeHandler}
              options={availableRmTypes}
            />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="input-group m-3" onKeyDown={handleKeyDown}>
            <span className="input-group-text" id="basic-addon1">
              Archetype File
            </span>

            <Selector
              value={archetypeId}
              onValueChangeHandler={onArchetypeChangeHandler}
              options={availableArchetypes}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-10 text-center">
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
