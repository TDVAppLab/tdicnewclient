
import React, { useEffect } from 'react'

type Props = {
  pid : string;
  uid : string;
}

declare global { interface Window { adsbygoogle: any, pushcount: number } }

const GoogleAd = ({pid, uid}: Props) => {
  useEffect(() => {
    if (!window) { return } // Skip during Server side Rendering
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
    } , []);



    return (
      <ins className="adsbygoogle"
      style={{display:"inline-block", width:"300px", height:"250px"}}
      data-ad-client={pid}
      data-ad-slot={uid}></ins>
    );
}
export default GoogleAd;