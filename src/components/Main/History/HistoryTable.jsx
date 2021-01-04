import React, { useEffect, useState } from "react";
import Fult from "./Fault";
import { useStyles, theme } from "./styles";
import FultTopics from "./Tablecontant";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import fetch from "node-fetch";
import "./History.scss";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


export default function HistoryTable() {
  const classes = useStyles();
  const [fults, setFults] = useState([]);
 
  const [fults_search, setFultssearch] = useState([]);
  const Swal = require("sweetalert2");
  const [searchBY, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:4000/luna/getAllFults`);
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
          Company:entity.company,
          Status: entity.status,
          Tech: entity.emp,
          Id: entity._id,
          Is_close: entity.closed,
          LastChange:entity.last_changed
        };
        temp_arry.push(tempFult);
      });
      setFults(temp_arry);
      setFultssearch(temp_arry);
    })();
  }, []);

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

  const search = (pattern) => {
    const search_p = pattern.target.value;
    let temp_arr = []
    switch (searchBY) {
      case "network":
        temp_arr = fults_search.filter((item) => {
          return item.Network.search(search_p) !== -1;
        });
        setFults(temp_arr);
        break;

      case "created_at":
        temp_arr = fults_search.filter((item) => {
          return item.time.search(search_p) !== -1;
        });
        setFults(temp_arr);
        break;

      case "place":
         temp_arr = fults_search.filter((item) => {
          return item.Place.search(search_p) !== -1;
        });
        setFults(temp_arr);
        break;

      default:
    }
  };

  //handle the search value
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (

      <div className="Historyparenttable">
        <div className="TopHistoryBar">
          <FormControl required variant="outlined" className="formControl">
            <InputLabel id="demo-simple-select-outlined-label">
              חפש לפי
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={searchBY}
              onChange={handleChange}
              label="חפש לפי"
            >
              <MenuItem value={"place"}>מיקום</MenuItem>
              <MenuItem value={"network"}>רשת</MenuItem>
              <MenuItem value={"created_at"}>תאריך</MenuItem>
            </Select>
          </FormControl>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="חיפוש..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={search}
            />
          </div>
        </div>
        <FultTopics />
        <div className="Historytable">
          {fults.map((entity) => (
            <Fult
              key={ fults.findIndex((element) => element === entity)+1}
              number={ fults.findIndex((element) => element === entity)}
              place={entity.Place}
              createdby={entity.By}
              createdat={entity.time}
              network={entity.Network}
              status={entity.Status}
              description={entity.Description}
              company = {entity.Company}
              techname={entity.Tech}
              ID={entity.Id}
              is_close={entity.Is_close}
              onDelete={() => {
                onDeleteFult(entity.Id);
              }}
            />
          ))}
        </div>
      </div>
  );
}
