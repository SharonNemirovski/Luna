import React from "react";
import "./Faults.scss";
import "../Animation/anima.scss";
import FultsTable from "./fultsTable";

import { useStyles, theme } from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
export default function Faults() {
  return (
    <div className="Faults DropAnimation">
      <ThemeProvider theme={theme}>
        <div dir="rtl" className="fultsTableHolder">
          <FultsTable />
        </div>
      </ThemeProvider>
    </div>
  );
}