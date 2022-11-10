import React, { useEffect, useState } from "react";
export default function Main() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("bp.json", {
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
        await setData(res);
        setLoaded(true);
      });
  }, []);
  return (
    <>
      {loaded ? (
        <div className="px-2">
          <h2 style={{ display: "inline" }}>{data.tree.name}</h2>
          <h3 style={{ display: "inline" }}>({data.tree.rmType})</h3>
          <h1>&nbsp;</h1>

          {data.tree.children.map((child) => {
            if (child.rmType.includes("EVENT")) {
              return (
                <div className="row py-2">
                  <div className="col-sm-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{child.name ? child.name : child.id}</h5>
                        <div className="card-text">
                        <ul className="list-group list-group-flush">
                        {child.children.map((child) => {
                          return (
                              <div key={child.id} className="input-group input-group-sm mb-3">
                                <span
                                  className="input-group-text"
                                  id="inputGroup-sizing-sm"
                                >
                                  {child.name ? child.name : child.id}
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  aria-label="Sizing example input"
                                  aria-describedby="inputGroup-sizing-sm"
                                />
                              </div>
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
              return (
                <div key={child.id} className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    {child.name}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>
              );
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
