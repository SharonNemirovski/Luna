import React, { useEffect, useState } from "react";
import Fult from "./fult";
import FultTopics from "./Tablecontant";
import fetch from "node-fetch";
import "./Faults.scss";
import FultViewer from "./FualtViewer/FualtViewer"
import SearchIcon from '@material-ui/icons/Search';
export default function FultsTable({token,IsEditor}) {
  const [BigView , SetView] = useState(false);
  const [fults, setFults] = useState([]);
  const [FilterBy , SetFilterValue] = useState("");
  const Swal = require("sweetalert2");
  const pharseDate = (oldDate) =>{
    if (oldDate !== "סטטוס לא עודכן מעולם"){
      let newtime = oldDate.split("T");
      newtime = newtime[0].replace("-", "/").replace("-", "/");
      newtime = newtime.split("/");
      return newtime[2] + "/" + newtime[1] + "/" + newtime[0];
    }
    return "סטטוס לא עודכן מעולם";
  };
  useEffect(() => {
    try{
      (async () => {
        const res = await fetch(`http://106.0.4.171:80/luna/getFults/${token}`,      
        {
          headers: {
          "Content-type": "application/json", // Indicates the content
        }});
        let data = [];
        data = await res.json();
        let temp_arry = [...fults];
        data.map((entity) => {
          const time = pharseDate(entity.created_at);
          const updatetime = pharseDate(entity.last_changed);
          let tempFult = {
            Place: entity.place,
            By: entity.by,
            time: time,
            Network: entity.network,
            Description: entity.description,
            Company:entity.company,
            Actions:entity.actions,
            Status: entity.status,
            Tech: entity.emp,
            Id: entity._id,
            Is_close: entity.closed,
            LastChange:updatetime,
            filetype:entity.filetype,
            providerfiletype:entity.providertypefile,
            avanch_num :entity.avanch_num,
            hold_time :entity.hold_time,
            lastUpdateBy : entity.lastUpdateBy,
            future_actions : entity.future_actions,
            pre_status : entity.pre_status
          };
          temp_arry.push(tempFult);
        });
        setFults(temp_arry);
      })();
    }
    catch
    {
      alert("server error");
    }}, []);
  const AddFult = () => {
    try{
      Swal.mixin({
        inputAttributes: {
          required: true,
        },
        validationMessage: "שדה זה הוא חובה",
        confirmButtonText: "הבא",
        showCancelButton: true,
        cancelButtonText: "בטל",
      })
        .queue([
          {
            title: "ציין את מיקום התקלה",
            input: "text",
          },
          {
            html: `
            <div 
            style = 
            "
            display : flex ;
            flex-direction: column;
            width: 100%;
            hight:auto;
            align-self : center;
            align-items: center;
            ">
            <h1 class="form-label select-label">לחץ ובחר את שם הרשת</h1>
              <select 
              id = "SelectBar" 
              style="
              font-weight: 700;
              color: #444;
              padding-left: 8px;
              width: 50%;
              height: 40px;
              margin-top:10px;
              box-sizing: border-box;
              border: 2.5px solid rgb(62, 145, 247);
              border-radius: .7em;
              cursor: pointer;
              direction: rtl;
              unicode-bidi: bidi-override;
              text-align: right;
              outline: 1px solid rgba(255,255,255,1);
              ">
                <option value="נהר איתן">נהר איתן</option>
                <option value="סודי ביותר">סודי ביותר</option> 
                <option value="ROIP">ROIP</option>
                <option value=טקטית>טקטית</option>
                <option value="זוהרים">זוהרים</option>
                <option value="DCNET RED">DCNET RED</option>
                <option value="DCNET BLK">DCNET BLK</option>
                <option value="שחורה זהב">שחורה זהב</option>
                <option value="שחורה כסף">שחורה כסף</option>
                <option value="תקשל">תקשל</option>
                <option value="מאמין">מאמין</option>
                <option value="רואי">רואי</option>
                <option value="אינטרנט מבצעי">אינטרנט מבצעי</option>
                <option value="סיגל">סיגל</option>
                <option value="סביבת חיל האויר">סביבת חיל האויר</option>
                <option value="סביבת חיל הים">סביבת חיל הים</option>
                <option value="סביבת אמן">סביבת אמ"ן</option>
              </select>
            </div>
         `,
         focusConfirm: false,
         preConfirm: () => {
           return document.getElementById('SelectBar').value;
               }
          },
          {
            input:'textarea',
            title: "תיאור התקלה",
            inputAutoTrim:true,
          },
          {
            input:'textarea',
            title: "ציין את התהליכים שבוצעו",
            inputAutoTrim:true,
          },
          {
            input:'textarea',
            title: "ציין את התהליכים שיש לבצע",
            inputAutoTrim:true,
          },
          {
            title: "?הגורם מולו נפתחת התקלה",
            input: "radio",
            inputOptions: { 
              "צפון":"צפון",
              "דרום":"דרום",
              "מטכל":"מטכל",
              "מרכז":"מרכז",  
            "נטקום": "נטקום",
            "בינת": "בינת"},
            inputValidator:  (result) =>
            { 
              if(!result){
                return "נא לבחור באחת מן האפשרויות שצויינו"
              }
            }
            
          },
          {
            title: "סטטוס נוכחי",
            input: "radio",
            inputOptions: {   
            "מחכים לטפסים": "מחכים לטפסים",
          "נפתחה תקלה ": "נפתחה תקלה"},
            inputValidator:  (result) =>
            {
              if(!result){
                return "נא לבחור באחת מן האפשרויות שצויינו"
              }
            }
          },
          {
            title: "נוצר על ידי",
            input: "text",
          },
        ])
        .then((result) => {
          if (result.value) {
            const place = result.value[0];
            const network = result.value[1];
            const description = result.value[2];
            const actions = result.value[3];
            const future_actions = result.value[4];
            const company = result.value[5]
            const current_status = result.value[6];
            const by = result.value[7];
            console.log(result)
            fetch(`http://106.0.4.171:80/luna/getFults/${token}`,      
              {
                headers: {
                "Content-type": "application/json", // Indicates the content
              }})
              .then(res => res.json())
              .then((json)=>{
                const existing_Faults = json;
                let matchingFaults = existing_Faults.filter((item)=>{
                return place === item.place;});
                if(matchingFaults.length > 0 )
                {
                  Swal.fire({
                    title: "כבר קיימת תקלה באתר שצויין",
                    html: `
                    ?האם להמשיך
                  `,
                    confirmButtonText: "המשך",
                    showCancelButton: true,
                    cancelButtonText: "בטל",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: ":הוספת התקלה הבאה",
                        html: `
                        :מיקום
                        <pre><code>${place}</code></pre>
                        :רשת
                        <pre><code>${network}</code></pre>
                        :תיאור
                        <pre><code>${description}</code></pre>
                        :עבור חברת
                        <pre><code>${company}</code></pre>
                        :סטטוס נוכחי
                        <pre><code>${current_status}</code></pre>
                      `,
                        confirmButtonText: "הוסף",
                        showCancelButton: true,
                        cancelButtonText: "בטל",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire("!התקלה נוספה בהצלחה", "  ", "success");
                          const fultbody = {
                            place: String(place),
                            by: String(by),
                            network: String(network),
                            description: String(description),
                            actions:String(actions),
                            future_actions:String(future_actions),
                            company :String(company),
                            status:String(current_status),
                            closed: false,
                          };
                          fetch(`http://106.0.4.171:80/luna/addFult/${token}`, {
                            method: "POST",
                            body: JSON.stringify(fultbody),
                            headers: {
                              "Content-type": "application/json; charset=UTF-8", // Indicates the content
                              "authorization" : "Bearer " + token
                            }
                          })
                            .then((res) => res.json())
                            .then((json) => {
                              const fult_id = json._id;
                              const time = pharseDate(json.created_at)
                              let tempFult = {
                                Num: fults.length + 1,
                                Place: place,
                                By: by,
                                time: time,
                                Network: network,
                                Status: current_status,
                                Actions:actions,
                                Company:company,
                                Description: description,
                                Tech:"",
                                Id: fult_id,
                                Is_close: false,
                                LastChange:"סטטוס לא עודכן מעולם",
                                filetype :"",
                                providerfiletype:"",
                                avanch_num:"נא לעדכן מספר",
                                future_actions: future_actions,
                                lastUpdateBy : "תקלה זו לא עודכנה מעולם",
                                pre_status : "-",
                                hold_time:0
                              };
                              let temparry = [...fults];
                              temparry.push(tempFult);
                              setFults(temparry);
                            });
                        }
                      });      
                    }});
                }
                else
                {
                  Swal.fire({
                    title: ":הוספת התקלה הבאה",
                    html: `
                    :מיקום
                    <pre><code>${place}</code></pre>
                    :רשת
                    <pre><code>${network}</code></pre>
                    :תיאור
                    <pre><code>${description}</code></pre>
                    :עבור חברת
                    <pre><code>${company}</code></pre>
                    :סטטוס נוכחי
                    <pre><code>${current_status}</code></pre>
                  `,
                    confirmButtonText: "הוסף",
                    showCancelButton: true,
                    cancelButtonText: "בטל",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire("!התקלה נוספה בהצלחה", "  ", "success");
                      const fultbody = {
                        place: String(place),
                        by: String(by),
                        network: String(network),
                        description: String(description),
                        actions:String(actions),
                        future_actions:String(future_actions),
                        company :String(company),
                        status:String(current_status),
                        closed: false,
                      };
                      fetch(`http://106.0.4.171:80/luna/addFult/${token}`, {
                        method: "POST",
                        body: JSON.stringify(fultbody),
                        headers: {
                          "Content-type": "application/json; charset=UTF-8", // Indicates the content
                          "authorization" : "Bearer " + token
                        }
                      })
                        .then((res) => res.json())
                        .then((json) => {
                          const fult_id = json._id;
                          const time = pharseDate(json.created_at)

                          let tempFult = {
                            Num: fults.length + 1,
                            Place: place,
                            By: by,
                            time: time,
                            Network: network,
                            Status: current_status,
                            Actions:actions,
                            Company:company,
                            Description: description,
                            Tech:"",
                            Id: fult_id,
                            Is_close: false,
                            LastChange:"סטטוס לא עודכן מעולם",
                            filetype :"",
                            providerfiletype:"",
                            avanch_num:"נא לעדכן מספר",
                            future_actions: future_actions,
                            lastUpdateBy : "תקלה זו לא עודכנה מעולם",
                            pre_status : "-",
                            hold_time:0
                          };
                          let temparry = [...fults];
                          temparry.push(tempFult);
                          setFults(temparry);
                        });
                    }
                  });  
                }                                  
              });
          }
        });
    
    }
    catch
    {
      alert("server error");
    };
  };
  const onClosingFult = ( db_id) => {
    try{
      Swal.fire({
        icon: "warning",
        title: "?סגירת תקלה",
        footer: "לחצ/י אישור לסגירת התקלה",
        confirmButtonText: "אישור",
        showCancelButton: true,
        cancelButtonText: "בטל",
      }).then((result) => {
        if (result.isConfirmed) {
        
          fetch(`http://106.0.4.171:80/luna/closeFult/${db_id}/${token}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8", // Indicates the content
              "authorization" : "Bearer " + token
            }
          })
          .then((async () => {
            const res = await fetch(`http://106.0.4.171:80/luna/getFults/${token}`,      
            {
              headers: {
              "Content-type": "application/json", // Indicates the content
            }});
            let data = [];
            setFults([])
            data = await res.json();
            let temp_arry = [];
            data.map((entity) => {
              const time = pharseDate(entity.created_at);
              const updatetime = pharseDate(entity.last_changed);
              let tempFult = {
                Place: entity.place,
                By: entity.by,
                time: time,
                Network: entity.network,
                Description: entity.description,
                Company:entity.company,
                Actions:entity.actions,
                Status: entity.status,
                Tech: entity.emp,
                Id: entity._id,
                Is_close: entity.closed,
                LastChange:updatetime,
                filetype:entity.filetype,
                providerfiletype:entity.providertypefile,
                avanch_num :entity.avanch_num,
                lastUpdateBy : entity.lastUpdateBy,
                future_actions : entity.future_actions,
                hold_time : entity.hold_time,
                pre_status : entity.pre_status
              };
              temp_arry.push(tempFult);
            });
            setFults(temp_arry);
            Swal.fire({ icon: "success", title: "!התקלה נסגרה בהצלחה" ,confirmButtonText: "אישור"});
          }));     
        }
      });
    }
    catch
    {
      alert("server error");
    };
  };
  const onDeleteFult = (db_id) => {
    try{
      Swal.fire({
        icon: "error",
        title: "?מחיקת תקלה",
        footer: "לחצ/י אישור למחיקת התקלה",
        confirmButtonText: "אישור",
        showCancelButton: true,
        cancelButtonText: "בטל",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://106.0.4.171:80/luna/DeleteFult/${db_id}/${token}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json" // Indicates the content"
            }
          }).then((async () => {
            const res = await fetch(`http://106.0.4.171:80/luna/getFults/${token}`,      
            {
              headers: {
              "Content-type": "application/json", // Indicates the content
            }});
            let data = [];
            setFults([])
            data = await res.json();
            let temp_arry = [];
            data.map((entity) => {
              const time = pharseDate(entity.created_at);
              const updatetime = pharseDate(entity.last_changed);
              let tempFult = {
                Place: entity.place,
                By: entity.by,
                time: time,
                Network: entity.network,
                Description: entity.description,
                Company:entity.company,
                Actions:entity.actions,
                Status: entity.status,
                Tech: entity.emp,
                Id: entity._id,
                Is_close: entity.closed,
                LastChange:updatetime,
                filetype:entity.filetype,
                providerfiletype:entity.providertypefile,
                avanch_num :entity.avanch_num,
                lastUpdateBy : entity.lastUpdateBy,
                future_actions : entity.future_actions,
                pre_status : entity.pre_status,
                hold_time:entity.hold_time
              };
              temp_arry.push(tempFult);
            });
            setFults(temp_arry);
            Swal.fire({ icon: "success", title: " !התקלה נמחקה בהצלחה" ,confirmButtonText: "אישור"});
          }));     
        }
      });
    }
    catch
    {
      alert("server error")
    };
  };
const handleSelcetChange = (SelectedVal)=>{
  SetFilterValue(SelectedVal)
  if(SelectedVal===""){
    try{
      (async () => {
        const res = await fetch(`http://106.0.4.171:80/luna/getFults/${token}`,      
        {
          headers: {
          "Content-type": "application/json", // Indicates the content
        }});
        setFults([]);
        let data = [];
        data = await res.json();
        let temp_arry = [];
        data.map((entity) => {
          const time = pharseDate(entity.created_at);
          const updatetime = pharseDate(entity.last_changed);
          let tempFult = {
            Place: entity.place,
            By: entity.by,
            time: time,
            Network: entity.network,
            Description: entity.description,
            Company:entity.company,
            Actions:entity.actions,
            Status: entity.status,
            Tech: entity.emp,
            Id: entity._id,
            Is_close: entity.closed,
            LastChange:updatetime,
            filetype:entity.filetype,
            providerfiletype:entity.providertypefile,
            avanch_num :entity.avanch_num,
            hold_time :entity.hold_time,
            lastUpdateBy : entity.lastUpdateBy,
            future_actions : entity.future_actions,
            pre_status : entity.pre_status
          };
          temp_arry.push(tempFult);
        });
        setFults(temp_arry);
      })();
    }
    catch
    {
      alert("server error");
    }
  }
  else{
    try{
      (async () => {
        const res = await fetch(`http://106.0.4.171:80/luna/getFultsByCompany/${SelectedVal}/${token}`,      
        {
          headers: {
          "Content-type": "application/json", // Indicates the content
        }});
        setFults([]);
        let data = [];
        data = await res.json();
        let temp_arry = [];
        data.map((entity) => {
          const time = pharseDate(entity.created_at);
          const updatetime = pharseDate(entity.last_changed);
          let tempFult = {
            Place: entity.place,
            By: entity.by,
            time: time,
            Network: entity.network,
            Description: entity.description,
            Company:entity.company,
            Actions:entity.actions,
            Status: entity.status,
            Tech: entity.emp,
            Id: entity._id,
            Is_close: entity.closed,
            LastChange:updatetime,
            filetype:entity.filetype,
            providerfiletype:entity.providertypefile,
            avanch_num :entity.avanch_num,
            hold_time :entity.hold_time,
            lastUpdateBy : entity.lastUpdateBy,
            future_actions : entity.future_actions,
            pre_status : entity.pre_status
          };
          temp_arry.push(tempFult);
        });
        setFults(temp_arry);
      })();
    }
    catch
    {
      alert("server error");
    }
  }
}
const getEditorButtonStyle = ()=>{
   if(IsEditor)
   return "BigScreenbutton"
   return "BigScreenbuttonTera"}
  return (

        <div className="parenttable">
            {BigView&&<FultViewer token={token}fualtsArray={fults}onClose={()=>{SetView(false)}}/>}
            <FultTopics  FilterValue = {(val) => handleSelcetChange(val)}/>
          <div className="table">
            {fults.map((entity) => (
              <Fult
                token = {token}
                IsEditor ={IsEditor}
                key={fults.findIndex((element) => element === entity)+1}
                number={fults.findIndex((element) => element === entity)+1}
                place={entity.Place}
                createdby={entity.By}
                createdat={entity.time}
                network={entity.Network}
                status={entity.Status}
                description={entity.Description}
                company = {entity.Company}
                actions = {entity.Actions}
                techname={entity.Tech}
                ID={entity.Id}
                is_close={entity.Is_close}
                LastChange = {entity.LastChange}
                filetype = {entity.filetype}
                providerfiletype = {entity.providerfiletype}
                avanch_num = {entity.avanch_num}
                hold_time = {entity.hold_time}
                lastUpdateBy= {entity.lastUpdateBy}
                future_actions= {entity.future_actions}
                pre_status = {entity.pre_status}
                onClose={() => {
                  onClosingFult(entity.Id);
                }}
                onDelete={() => {
                  onDeleteFult(entity.Id);
                }}
              />
            ))}
          </div>
          
          <div className="button_holder">

          {IsEditor&&(<div  className="Addfultbutton" onClick={AddFult}>
              הוסף  תקלה
            </div>)}

            <div  className={getEditorButtonStyle()} onClick={()=>{
            SetView(true);
          }}>
              לצפייה במסך מלא
            </div>
          </div>
        </div>
  );
}
