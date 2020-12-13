import { fade, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { NoEncryption } from "@material-ui/icons";

export const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});

export const useStyles = makeStyles((theme) => ({
  root1: {
    zIndex: 0,
    position: "fixed",
    display: "grid",
    gridTemplateColumns: "80% 5% 15%",
    width: "100%",
    height: "100%",
    backgroundColor: "#272727",
  },
  icon_styles: {
    margin: "10px",
    zIndex: 4,
  },

  text: {
    zIndex: 6,
    textAlign: "right",
    flexGrow: 1,
  },
  textButton: {
    zIndex: 6,
    textAlign: "right",
    flexGrow: 1,
    fontSize: "12",
  },
  button: {
    gridColumn: "5/6",
    gridRow: "1/2",
    borderRadius: theme.shape.borderRadius,
    marginLeft: "5px",
  },
  operations: {
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridColumn: "2/3",
    gridRow: "1/2",
  },

  fultitle: {
    marginTop: "20px",
    width: "100%",
    gridRow: "2/3",
    borderRadius: "10px",
    marginLeft: "30px",
    gridColumn: "2/3",
  },
  fultstable: {
    display: "grid",
    gridTemplateRows: "5% 15% 80%",
    gridTemplateColumns: "2% 96% 2%",
    width: "100%",
    justifyContent: "center",
  },
  table: {
    gridRow: "3/4",
    gridColumn: "2/3",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    marginRight: "5px",
    width: "100%",
    borderRadius: "10px",
    maxHeight: "510px",
    overflowY: "scroll",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  topics: {
    zIndex: "1",
  },
  fult: {
    zIndex: 1,
    display: "grid",
    marginTop: "20px",
    width: "100%",
    borderRadius: "10px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  },
  action: {},
  cardcontant: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr",

    textAlign: "right",
    justifyContent: "flex-end",
  },
  topogragh: {
    textAlign: "right",
    fontSize: 14,
    marginRight: "10px",
    marginLeft: "10px",

    justifySelf: "center",
    alignSelf: "center",
  },
  topogragh_status: {
    textAlign: "right",
    fontSize: 14,
    gridColumn: "7/8",
    marginRight: "10px",
    marginLeft: "10px",

    justifySelf: "center",
    alignSelf: "center",
  },
  fultcontant: {
    textAlign: "right",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    width: "100%",

    borderRadius: "4px",
  },

  search: {
    zIndex: 2,
    gridColumn: "1/3",
    gridRow: "1/2",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "8% 92%",
    gridTemplateRows: "1fr",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    justifySelf: "center",
    alignSelf: "center",
  },
  searchIcon: {
    gridColumn: "1/2",
    gridRow: "1/2",
    marginLeft: "2px",
    marginRight: "5px",
    marginTop: "2px",
  },
  inputRoot: {
    gridColumn: "2/3",
    gridRow: "1/2",
    color: "inherit",
  },
  inputInput: {
    textAlign: "right",
    gridColumn: "2/3",
    gridRow: "1/2",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
