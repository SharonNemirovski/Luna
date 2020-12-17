import React, { useState } from "react";
import { useStyles, theme } from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ThemeProvider } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import "./History.scss";
import AssignmentIcon from "@material-ui/icons/Assignment";


export default function Fult({
  number,
  ID,
  f_place,
  createdby,
  createdat,
  net,
  stats,
  description,
  techname,
  onDelete,
  is_close,
  LastChange
}) {
  const classes = useStyles();

  const status_color = () => {
    return is_close === true ? "greenstatus" : "redstatus";
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 
  return (
 
        <div className="fult">
      <Card className="card">
        <CardContent className={classes.cardcontant}>
          <Typography  component={'span'} className="topogragh"> {number}</Typography>
          <Typography  component={'span'} className="topogragh">{f_place}</Typography>
          <Typography  component={'span'} className="topogragh">{net}</Typography>
          <Typography  component={'span'} className="topogragh">{techname}</Typography>
          <Typography  component={'span'} className="topogragh">{createdby}</Typography>
          <Typography  component={'span'} className="topogragh">{createdat}</Typography>

          <CardActions disableSpacing className={classes.action}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton color="primary">
              <Badge badgeContent={2} color="secondary" variant="dot">
                <AssignmentIcon />
              </Badge>
            </IconButton>
            <div className={status_color()}></div>
          </CardActions>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="contant">
            <ThemeProvider theme={theme}>
              <div className="expend_fult">
                <Typography  component={'span'} className="topogragh_status">
                  תיאור התקלה:
                  <Typography  component={'span'} className="topogragh">
                    {description}
                  </Typography>
                </Typography>
                <Typography  component={'span'} className="topogragh_status">
                  סטטוס:
                  {LastChange}
                  <Typography  component={'span'} className="topogragh">{stats}</Typography>
                </Typography>

                <Typography component={'span'} >
                  <div className="operation_holder">
                  <IconButton onClick={()=>{ 
                      setExpanded(false);
                      onDelete();}}>
                      <DeleteIcon style={{ color: "#1562aa" }} />
                    </IconButton>

                  </div>
                </Typography>
              </div>
            </ThemeProvider>
          </CardContent>
        </Collapse>
      </Card>
    </div>

    
  );
}
