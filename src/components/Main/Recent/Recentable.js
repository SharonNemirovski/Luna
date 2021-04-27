import React,{ useEffect, useState } from "react";
import Fult from "../History/Fault"
import FultTopics from "../History/Tablecontant"


export default function Recentable({token , IsEditor}) {
  const [fults, setFults] = useState([]);
  const pharseDate = (oldDate) =>{
    if ((oldDate)===""){
      return ""
    }
    if (oldDate !== "סטטוס לא עודכן מעולם"){
      let newtime = oldDate.split("T" );
      newtime = newtime[0].replace("-", "/").replace("-", "/");
      newtime = newtime.split("/");
      return newtime[2] + "/" + newtime[1] + "/" + newtime[0];
    }
    return "סטטוס לא עודכן מעולם";
  };
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:80/luna/getRecentFults/${token}`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
          "authorization" : "Bearer " + token
        }});
      let data = [];
      data = await res.json();
      let temp_arry = [...fults];
      data.map((entity) => {
        const time = pharseDate(entity.created_at);
        const updatetime = pharseDate(entity.last_changed);
        const closedate = pharseDate(entity.closed_at)
        let tempFult = {
          Num: data.findIndex((element) => element === entity) + 1,
          key: entity.id,
          Place: entity.place,
          By: entity.by,
          time: time,
          Network: entity.network,
          Description: entity.description,
          Company:entity.company,
          Status: entity.status,
          Tech: entity.emp,
          Id: entity._id,
          Is_close: entity.closed,
          LastChange:updatetime,
          Actions: entity.actions,
          filetype:entity.filetype,
          providerfiletype:entity.providertypefile,
          avanch_num:entity.avanch_num,
          lastUpdateBy : entity.lastUpdateBy,
          future_actions : entity.future_actions,
          hold_time: entity.hold_time,
          closed_at:closedate,
          pre_status:entity.pre_status
        };
        temp_arry.push(tempFult);
      });
      setFults(temp_arry);
    })();
  }, []);
    return (
        <div className="Recentparenttable">
            <FultTopics />
        <div className="Recenttable">
          {fults.map((entity) => (
            <Fult
              token = {token}
              key={ fults.findIndex((element) => element === entity)+1}
              number={ fults.findIndex((element) => element === entity)+1}
              place={entity.Place}
              createdby={entity.By}
              createdat={entity.time}
              network={entity.Network}
              status={entity.Status}
              description={entity.Description}
              company = {entity.Company}
              techname={entity.Tech}
              ID={entity.Id}
              LastChange = {entity.LastChange}
              is_close={entity.Is_close}
              actions = {entity.Actions}
              filetype = {entity.filetype}
              providerfiletype = {entity.providerfiletype}
              avanch_num = {entity.avanch_num}
              IsEditor = {false}
              lastUpdateBy= {entity.lastUpdateBy}
              future_actions= {entity.future_actions}
              hold_time = {entity.hold_time}
              closed_at = {entity.closed_at}
              pre_status = {entity.pre_status}

            />
          ))}
        </div>
        </div>
    )
}

