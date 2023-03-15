import React, { useState } from "react";
import Selector from "./Selector";

function Plaintext({input}) {
  const [value, setValue] = useState("")
  input.value = ""
  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  return (
    <input
      type="text"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      value={value}
      onChange={onValueChangeHandler}
    />
  );
}
function CodedText({ ln, input }) {
  let options = input.list.map((ele) =>
    ele.localizedLabels ? ele.localizedLabels[ln] : ele.label
  );
  const [ value, setValue ] = useState(options[0])
  input.value = options[0]

  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  
  return (
    <Selector
      value={value}
      onValueChangeHandler={onValueChangeHandler}
      options={options}
    />
  );
}

function DateTime({input}) {
  const [value, setValue] = useState("")
  input.value = ""
  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  return (
    <input
      type="datetime-local"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      value={value}
      onChange={onValueChangeHandler}
    />
  );
}

function Decimal({input}) {
  const [value, setValue] = useState("")
  input.value = ""
  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  return (
    <input
      type="number"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      value={value}
      onChange={onValueChangeHandler}
    />
  );
}

function SubInput({ index, ln, input, value, setValue }) {
  console.log(input.type)

  if (input.type === "DECIMAL"){
    return <Decimal
    key={index}
    index={index}
    input={input}
    ln={ln}
  />
  }
  
  if (input.type === "CODED_TEXT" && input.list) {
    return <CodedText
        key={index}
        index={index}
        input={input}
        ln={ln}
      />
  } 
  
  if (input.type === "TEXT") {
    return (
      <Plaintext
        key={index}
        index={index}
        input={input}
        ln={ln}
      />
    );
  }

  if (input.type === "DATETIME") {
    return (
      <DateTime
        key={index}
        index={index}
        input={input}
        ln={ln}
      />
    );
  }


  return (
    <Plaintext
      key={index}
      index={index}
      input={input}
      ln={ln}
    />
  );
}
export default function InputComp({ child, ln }) {
  if (
    [
      "EVENT",
      "INTERVAL_EVENT",
      "CLUSTER",
      "ELEMENT",
      "DV_INTERVAL",
      "ISM_TRANSITION",
      "ACTIVITY"
    ].indexOf(child.rmType) >= 0
  ) {
    return (
      <>
        <div key={child.id} className="row py-2">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title pb-2">
                  {child.localizedNames && child.localizedNames[ln]
                    ? child.localizedNames[ln]
                    : child.name
                    ? child.name
                    : child.id}
                </h5>
                <div className="card-text">
                  <ul className="list-group list-group-flush">
                    {child.children.map((child) => {
                      return <InputComp key={child.id} ln={ln} child={child} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div key={child.id} className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          {child.localizedNames && child.localizedNames[ln]
            ? child.localizedNames[ln]
            : child.name
            ? child.name
            : child.id}
        </span>
        {child.inputs ? (
          child.inputs.map((input, index) => {
            return (
              <SubInput
                key={index}
                input={input}
                ln={ln}
              />
            );
          })
        ) : (
            <Plaintext ln={ln} input = {child}/>
        )}
      </div>
    </>
  );
}
