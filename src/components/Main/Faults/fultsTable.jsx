import React, { useEffect, useState } from "react";
import Fult from "./fult";
import { useStyles } from "./styles";
import FultTopics from "./Tablecontant";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import fetch from "node-fetch";

export default function FultsTable() {
  const classes = useStyles();
  const [fults, setFults] = useState([]);
  const Swal = require("sweetalert2");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/luna/getFults`);
      const data = await res.json();
      let temp_arry = [...fults];
      data.map((entity) => {
        let tempFult = {
          Num: data.findIndex((element) => element === entity) + 1,
          key: entity.id,
          Place: entity.place,
          By: entity.by,
          time: entity.created_at,
          Network: entity.network,
          Status: entity.status,
          Tech: entity.emp,
          Id: entity._id,
        };
        temp_arry.push(tempFult);
      });
      setFults(temp_arry);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
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
          const status = result.value[3];
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
            <pre><code>${status}</code></pre>
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
                status: String(status),
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
                  let tempFult = {
                    Num: fults.length + 1,
                    Place: place,
                    By: by,
                    time: date,
                    Network: network,
                    Status: status,
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
  const onDeleteFult = (id, db_id) => {
    Swal.fire({
      icon: "warning",
      title: "?מחיקת תקלה",
      footer: "לחצ/י אישור למחיקת התקלה",
      confirmButtonText: "אישור",
      showCancelButton: true,
      cancelButtonText: "בטל",
    }).then((result) => {
      if (result.isConfirmed) {
        const temp_arr = fults.filter((item) => {
          return item.Num != id;
        });
        //patch req to backend -- check again
        setFults(temp_arr);
        console.log(db_id);
        fetch(`http://localhost:4000/luna/closeFult/${db_id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
          });
        Swal.fire({ icon: "success", title: "התקלה נמחקה" });
      }
    });
  };
  const onEditFult = () => {
    setOpen(!open);
  };
  const search = (pattern) => {};
  return (
    <div className={classes.fultstable}>
      <div className={classes.operations}>
        <Button
          variant="outlined"
          className={classes.button}
          color="primary"
          onClick={handleClick}
        >
          <AddIcon />
        </Button>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="...חיפוש"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={search}
          />
        </div>
      </div>

      <FultTopics className={classes.topics} />
      <div className={classes.table}>
        {fults.map((entity) => (
          <Fult
            key={entity.key}
            number={entity.Num}
            f_place={entity.Place}
            createdby={entity.By}
            createdat={entity.time}
            net={entity.Network}
            stats={entity.Status}
            techname={entity.Tech}
            id={entity.Id}
            is_close={entity.Is_close}
            onDelete={() => {
              onDeleteFult(entity.Num, entity.Id);
            }}
            onEdit={() => {
              onEditFult();
            }}
          />
        ))}
      </div>
    </div>
  );
}
