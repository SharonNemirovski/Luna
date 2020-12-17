import { fade, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";


export const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});

export const useStyles = makeStyles((theme) => ({
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

  action: {},
  cardcontant: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr",

    textAlign: "right",
    justifyContent: "flex-end",
  },

  search: {
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
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "2px",
  },
  inputRoot: {
    marginRight: "5px",
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
