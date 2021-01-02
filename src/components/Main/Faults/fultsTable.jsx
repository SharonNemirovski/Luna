import React, { useEffect, useState } from "react";
import Fult from "./fult";
import { theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import FultTopics from "./Tablecontant";
import fetch from "node-fetch";
import "./Faults.scss";


export default function FultsTable() {
  const [fults, setFults] = useState([]);
  const Swal = require("sweetalert2");

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/luna/getFults`);
      const data = await res.json();
      let temp_arry = [...fults];
      data.map((entity) => {
        let faultime = entity.created_at;
        faultime = faultime.split("T");
        faultime = faultime[0].replace("-", "/").replace("-", "/");
        faultime = faultime.split("/");
        const time = faultime[2] + "/" + faultime[1] + "/" + faultime[0];
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
          LastChange:entity.last_changed
        };
        temp_arry.push(tempFult);
      });
      setFults(temp_arry);
    })();
  }, []);

  const AddFult = () => {
    Swal.mixin({
      input: "text",
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
        },
        {
          title: ":סיווג הרשת",
          text: "שם הרשת לה שייך הרכיב",
          
        },
        {
          title: "תיאור התקלה",
         
        },
        {
          title: "ציין את התהליכים שבוצעו",
        },
        {
          title: "?עבור איזו חברה נפתחה התקלה",
          input: "radio",
          inputOptions: {   
          "נטקום": "נטקום",
          "בינת": "בינת",
          "אחר":"אחר"},
          inputValidator:  (result) =>
          {
                  return new Promise(function (resolve, reject) {
                    if (result) {
                      resolve();
                    } 
                    else {
                      reject("נא לבחור חברה עבורה נפתחת התקלה");
                    }
                  });

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
                  return new Promise(function (resolve, reject) {
                    if (result) {
                      resolve();
                    } 
                    else {
                      reject("נא לבחור סטטוס נוכחי לתקלה");
                    }
                  });

          }
        },
        {
          title: "נוצר על ידי",
        },
      ])
      .then((result) => {
        if (result.value) {
          const place = result.value[0];
          const network = result.value[1];
          const description = result.value[2];
          const actions = result.value[3];
          const company = result.value[4]
          const current_status = result.value[5];
          const by = result.value[6];

          Swal.fire({
            title: ":הוספת התקלה הבאה",
            html: `
            :מיקום
            <pre><code>${place}</code></pre>
            :רשת
            <pre><code>${network}</code></pre>
            :תיאור
            <pre><code>${description}</code></pre>
            :תהליכים שבוצעו
            <pre><code>${actions}</code></pre>
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
                company :String(company),
                status:String(current_status),
                closed: false,
              };
              fetch("http://localhost:4000/luna/addFult", {
                method: "POST",
                body: JSON.stringify(fultbody),
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => res.json())
                .then((json) => {
                  const fult_id = json._id;
                  const date = json.created_at;
                  let faultime = date;
                  faultime = faultime.split("T");
                  faultime = faultime[0].replace("-", "/").replace("-", "/");
                  faultime = faultime.split("/");
                  const time =
                    faultime[2] + "/" + faultime[1] + "/" + faultime[0];
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
                  };
                  let temparry = [...fults];
                  temparry.push(tempFult);
                  setFults(temparry);
                });
            }
          });
        }
      });
  };
  const onClosingFult = ( db_id) => {
    Swal.fire({
      icon: "warning",
      title: "?סגירת תקלה",
      footer: "לחצ/י אישור לסגירת התקלה",
      confirmButtonText: "אישור",
      showCancelButton: true,
      cancelButtonText: "בטל",
    }).then((result) => {
      if (result.isConfirmed) {
      
        fetch(`http://localhost:4000/luna/closeFult/${db_id}`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
          });
          (async () => {
            const res = await fetch(`http://localhost:4000/luna/getFults`);
            const data = await res.json();
            let temp_arry = [];
            setFults([]);
            data.map((entity) => {
              let faultime = entity.created_at;
              faultime = faultime.split("T");
              faultime = faultime[0].replace("-", "/").replace("-", "/");
              faultime = faultime.split("/");
              const time = faultime[2] + "/" + faultime[1] + "/" + faultime[0];
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
                LastChange:entity.last_changed
              };
              temp_arry.push(tempFult);
            });
            setFults(temp_arry);
          })();
        Swal.fire({ icon: "success", title: "התקלה נסגרה" });
      }
    });
  };

  const onDeleteFult = (db_id) => {
    Swal.fire({
      icon: "error",
      title: "?מחיקת תקלה",
      footer: "לחצ/י אישור למחיקת התקלה",
      confirmButtonText: "אישור",
      showCancelButton: true,
      cancelButtonText: "בטל",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/luna/DeleteFult/${db_id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
        }).then((res) => res.json());
        setFults([]);
        (async () => {
          const res = await fetch(`http://localhost:4000/luna/getFults`);
          const data = await res.json();
          let temp_arry = [];
          data.map((entity) => {
            let faultime = entity.created_at;
            faultime = faultime.split("T");
            faultime = faultime[0].replace("-", "/").replace("-", "/");
            faultime = faultime.split("/");
            const time = faultime[2] + "/" + faultime[1] + "/" + faultime[0];
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
              LastChange:entity.last_changed
            };
            temp_arry.push(tempFult);
          });
          setFults(temp_arry);
        })();

        Swal.fire({ icon: "success", title: "התקלה נמחקה" });
      }
    });
  };


  return (
    <ThemeProvider theme={theme}>
      
        <div className="fultstable">
          <FultTopics className="FultTopics" />
          <div className="table">
            {fults.map((entity) => (
              <Fult
                key={fults.findIndex((element) => element === entity)}
                number={fults.findIndex((element) => element === entity) }
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
                onClose={() => {
                  onClosingFult(entity.Id);
                }}
                onDelete={() => {
                  onDeleteFult(entity.Id);
                }}
              />
            ))}
          </div>
          <div className="operations">
            <button  className="addfultbutton" onClick={AddFult}>
              הוסף תקלה
            </button>
          </div>
        </div>
    </ThemeProvider>
  );
}
