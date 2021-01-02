import React from 'react';
import './Log.scss';
import background from '../../../src/assets/BG.svg';
import logo from '../../assets/logoClear.png';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountKey from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function LogIn() {
  const classes = useStyles();

  return (
    <div>
      <div className="back">
        {/* <svg src={background} className="svg"></svg> */}
        <img src={background} alt="background"></img>
        <div className="form">
          <div className="imgRapper">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="inputs">
            <div className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label=" שם משתמש " />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountKey />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label=" סיסמה " />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="connect1"
              >
                <Grid item>
                  <div>כניסה</div>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item></Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
