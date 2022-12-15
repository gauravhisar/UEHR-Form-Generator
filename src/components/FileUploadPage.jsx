
import React, {useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import LangSelector from "./Selector";

export default function FileUploadPage({archetype, setArchetype, archetypeLoaded, setArchetypeLoaded}) {
    const [selectedFile, setSelectedFile] = useState("");
    const [availableFiles, setAvailableFiles] = useState([]);
    const navigate = useNavigate()

    

    useEffect(()=>{
        function fetchAvailableFiles(){
            fetch(`files.json`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then((res) => {
                return res.json();
            })
            .then(res => {
                setAvailableFiles(res.files);
            })
        }
        fetchAvailableFiles();
    }, [])

    function fetchFile(){
        fetch(`${selectedFile}.json`, {
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

    function fileChangeHandler(e) {
      setSelectedFile(e.target.value);
    }

    async function handleFileSubmission() {
        await fetchFile();
        if (archetypeLoaded){
            navigate(`/archetype`)
        }
    }

    function handleKeyDown(e){
        if (e.key === "Enter"){
            handleFileSubmission();
        }
    }
  
    return (
      <div className="col-sm-6">
        <div className="input-group m-3" onKeyDown={handleKeyDown}>
        <span className="input-group-text" id="basic-addon1">Archetype File</span>
         
          <LangSelector
                ln={selectedFile}
                setLanguage={setSelectedFile}
                langs={availableFiles}
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