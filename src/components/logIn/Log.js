import React, { useEffect } from 'react';
import './Log.scss';
import background from '../../../src/assets/BG.svg';
import logo from '../../assets/login.png';
import teamlogo from '../../assets/GlitchClear.png';
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

export default function LogIn({ onconnect }) {
  const classes = useStyles();
  const [username, setuser] = React.useState('');
  const [password, setpass] = React.useState('');
  const [iserror, seterror] = React.useState(null);
  const [isbadpass, setbadpass] = React.useState(false);
  const handleconnect = () => {
    const fulluser = {
      Username: username,
      Password: password,
    };
    fetch(`http://localhost:4000/luna/login`, {
      method: 'POST',
      body: JSON.stringify(fulluser),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === 'Authentication Failed') {
          seterror('error');
          setbadpass(false);
          setbadpass(true);
        } else {
          onconnect(json.token);
        }
      });
  };

  return (
    <div>
      <div className="back">
        <img src={background} alt="background"></img>
        <div className="form slide-in-elliptic-bottom-fwd">
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
                  <TextField
                    error={iserror}
                    id="input-with-icon-grid"
                    label=" שם משתמש "
                    onChange={(e) => setuser(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountKey />
                </Grid>
                <Grid item>
                  <TextField
                    error={iserror}
                    type="password"
                    id="input-with-icon-grid"
                    label=" סיסמה "
                    onChange={(e) => setpass(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item>
                {isbadpass && (
                  <span className="Warninglabel">
                    שם משתמש או הסיסמה אינם נכונים{' '}
                  </span>
                )}
              </Grid>
              <button
                container
                spacing={1}
                alignItems="flex-end"
                className="connect1"
                onClick={handleconnect}
              >
                התחברות
              </button>
            </div>
          </div>
        </div>
        <div className="team slide-in-blurred-bottom">
          <img src={teamlogo} alt="teamlogo"></img>
        </div>
      </div>
    </div>
  );
}
