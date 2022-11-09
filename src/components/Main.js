import React, { useEffect, useState } from 'react';
export default function Main(){
    
    const [data, setData] = useState([])
    const [heading, setHeading] = useState([])
    const [rmtype, setRmType] = useState([])
    const [todisplay, setToDisplay] = useState({children:[]})

    useEffect(()=>{
        fetch("bp.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
            })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            console.log(res);
            setData(res);
            setHeading(res.tree.name);
            setRmType(res.tree.rmType)
            setToDisplay(res.tree.children[0]);
        })
    }, [])
    return (
        <>
        <h2>{heading}</h2>
        <h3>{rmtype}</h3>
        <h1>&nbsp;</h1>
        {todisplay.children.map((child)=>{
            return (
                <div  key={child.id}>
                    <p>{child.name}  </p><input type="text" name="hello" label={child.name}></input>
                </div>
                )
        })}
        </>
    )
}