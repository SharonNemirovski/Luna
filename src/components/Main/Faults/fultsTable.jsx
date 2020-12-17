import React, { useEffect, useState } from "react";
import Fult from "./fult";
import { theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import FultTopics from "./Tablecontant";
import AddIcon from "@material-ui/icons/Add";
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
          Num: data.findIndex((element) => element === entity) + 1,
          key: entity.id,
          Place: entity.place,
          By: entity.by,
          time: time,
          Network: entity.network,
          Description: entity.description,
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
      progressSteps: ["1", "2", "3", "4", "5"],
    })
      .queue([
        {
          title: "ציין את מיקום התקלה",
        },
        {
          title: ":שם הטכנאי",
        },
        {
          title: ":סיווג הרשת",
          text: "שם הרשת לה שייך הרכיב",
        },
        {
          title: "תיאור התקלה",
        },
        {
          title: "נוצר על ידי",
        },
      ])
      .then((result) => {
        if (result.value) {
          const place = result.value[0];
          const techname = result.value[1];
          const network = result.value[2];
          const description = result.value[3];
          const by = result.value[4];

          Swal.fire({
            icon: "warning",
            title: ":הוספת התקלה הבאה",
            html: `
            :מיקום
            <pre><code>${place}</code></pre>
            :שם הטכנאי
            <pre><code>${techname}</code></pre>
            :רשת
            <pre><code>${network}</code></pre>
            :תיאור
            <pre><code>${description}</code></pre>
            :נוצר על ידי
            <pre><code>${by}</code></pre>
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
                emp: String(techname),
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
                    Status: "",
                    Description: description,
                    Tech: techname,
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
  const onClosingFult = (id, db_id) => {
    Swal.fire({
      icon: "warning",
      title: "?סגירת תקלה",
      footer: "לחצ/י אישור לסגירת התקלה",
      confirmButtonText: "אישור",
      showCancelButton: true,
      cancelButtonText: "בטל",
    }).then((result) => {
      if (result.isConfirmed) {
        const temp_arr = fults.filter((item) => {
          return item.Num !== id;
        });
        //POST req to backend
        setFults([...fults],temp_arr);
        fetch(`http://localhost:4000/luna/closeFult/${db_id}`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
          });
        Swal.fire({ icon: "success", title: "התקלה נסגרה" });
      }
    });
  };

  const onDeleteFult = (id, db_id) => {
    Swal.fire({
      icon: "error",
      title: "?מחיקת תקלה",
      footer: "לחצ/י אישור למחיקת התקלה",
      confirmButtonText: "אישור",
      showCancelButton: true,
      cancelButtonText: "בטל",
    }).then((result) => {
      if (result.isConfirmed) {
        const temp_arr = fults.filter((item) => {
          return item.Num !== id ;
        });
        setFults(temp_arr);
        //DELETE req to backend
        
        fetch(`http://localhost:4000/luna/DeleteFult/${db_id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
        }).then((res) => res.json());
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
                number={fults.findIndex((element) => element === entity) + 1}
                f_place={entity.Place}
                createdby={entity.By}
                createdat={entity.time}
                net={entity.Network}
                stats={entity.Status}
                description={entity.Description}
                techname={entity.Tech}
                ID={entity.Id}
                is_close={entity.Is_close}
                LastChange = {entity.LastChange}
                onClose={() => {
                  onClosingFult(entity.Num, entity.Id);
                }}
                onDelete={() => {
                  onDeleteFult(entity.Num, entity.Id);
                }}
              />
            ))}
          </div>
          <div className="operations">
            <button variant="outlined" className="button" onClick={AddFult}>
              <AddIcon style={{ color: "#1562aa" }} />
            </button>
          </div>
        </div>
    </ThemeProvider>
  );
}
