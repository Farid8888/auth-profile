import React from 'react'


export default function Img({source,name}) {
    


  return (
    <>
    <div className="chip">
    <img src={source} alt="" />
    {name}
  </div>
  </>
  )
}
