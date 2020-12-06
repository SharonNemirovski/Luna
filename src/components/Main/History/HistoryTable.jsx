import React, { useEffect, useState } from "react";
import Fult from "./Fault";
import { useStyles, theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import FultTopics from "../Faults/Tablecontant";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import fetch from "node-fetch";
import "./History.scss";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Search } from "@material-ui/icons";

export default function HistoryTable() {
  const classes = useStyles();
  const [fults, setFults] = useState([]);
  const [fults_search, setFultssearch] = useState([]);
  const Swal = require("sweetalert2");
  const [open, setOpen] = useState(false);
  const [searchBY, setSearch] = React.useState("");

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
          Status: entity.status,
          Tech: entity.emp,
          Id: entity._id,
          Is_close: entity.closed,
        };
        temp_arry.push(tempFult);
      });
      setFults(temp_arry);
      setFultssearch(temp_arry);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
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
          return item.Num != id;
        });
        //DELETE req to backend
        setFults(temp_arr);
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

  const onEditFult = () => {};
  const search = (pattern) => {
    console.log("pattern is: ");
    const search_p = pattern.target.value;
    console.log(search_p);
    console.log("that was the pattern");
    switch (searchBY) {
      case "network":
        console.log("network");
        let tempy_arr = fults_search.filter((item) => {
          return item.Network.search(search_p) !== -1;
        });
        setFults(tempy_arr);
        break;

      case "tech":
        console.log("tech");
        tempy_arr = fults_search.filter((item) => {
          return item.Tech.search(search_p) !== -1;
        });
        setFults(tempy_arr);
        break;

      case "place":
        console.log("place");
        tempy_arr = fults_search.filter((item) => {
          return item.Place.search(search_p) !== -1;
        });
        setFults(tempy_arr);
        break;

      default:
        console.log("default");
    }

    console.log("end here");
    console.log(fults);
  };

  //handle the search value
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="fultstable">
        <div className="operations">
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
              <MenuItem value={"tech"}>טכנאי</MenuItem>
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

        <FultTopics className="FultTopics" />
        <div className="table">
          {fults.map((entity) => (
            <Fult
              key={entity.key}
              number={entity.Num}
              f_place={entity.Place}
              createdby={entity.By}
              createdat={entity.time}
              net={entity.Network}
              stats=""
              description={entity.Description}
              techname={entity.Tech}
              id={entity.Id}
              is_close={entity.Is_close}
              onDelete={() => {
                onDeleteFult(entity.Num, entity.Id);
              }}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
