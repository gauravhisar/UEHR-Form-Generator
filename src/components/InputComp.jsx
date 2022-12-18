import React, { useState } from "react";
import Selector from "./Selector";

function Plaintext({ index, input, value, setValue }) {
  function onValueChangeHandler(e) {
    setValue((prev) => {
      let a = [...prev];
      a[index] = e.target.value;
      return a;
    });
  }
  return (
    <input
      type="text"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      value={value[index]}
      onChange={onValueChangeHandler}
    />
  );
}
function CodedText({ index, ln, input, value, setValue }) {
  function onValueChangeHandler(e) {
    setValue((prev) => {
      let a = [...prev];
      a[index] = e.target.value;
      return a;
    });
  }
  let options = input.list.map((ele) =>
    ele.localizedLabels ? ele.localizedLabels[ln] : ele.label
  );
  return (
    <Selector
      value={value[index]}
      onValueChangeHandler={onValueChangeHandler}
      options={options}
    />
  );
}

function SubInput({ index, ln, input, value, setValue }) {
  if (input.type === "CODED_TEXT") {
    return (
      <CodedText
        key={index}
        index={index}
        input={input}
        ln={ln}
        value={value}
        setValue={setValue}
      />
    );
  } else if (input.type === "TEXT") {
    return (
      <Plaintext
        key={index}
        index={index}
        input={input}
        ln={ln}
        value={value}
        setValue={setValue}
      />
    );
  }
  return (
    <Plaintext
      key={index}
      index={index}
      input={input}
      ln={ln}
      value={value}
      setValue={setValue}
    />
  );
}
export default function InputComp({ child, ln }) {
  const [value, setValue] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  if (
    [
      "EVENT",
      "INTERNAL_EVENT",
      "CLUSTER",
      "ELEMENT",
      "DV_INTERVAL",
      "ISM_TRANSITION",
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
                index={index}
                input={input}
                ln={ln}
                value={value}
                setValue={setValue}
              />
            );
          })
        ) : (
          <>
            <Plaintext ln={ln} index={0} value={value} setValue={setValue} />
          </>
        )}
      </div>
    </>
  );
}
