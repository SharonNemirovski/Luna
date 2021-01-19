import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function Progressui({props,loadingdone}) {
  useEffect(() => {
    if(props === 100){
      loadingdone();
    }
  }, [props]);
    return (
      <Box className = "progresscircle" display="flex" alignItems="center">
        <Box minWidth={35} paddingTop = {1}>
        <Typography  variant="body2" color="textSecondary">{`${Math.round(
          props,
        )}%`}</Typography>
      </Box>
      <Box width="100%" mr={1} marginLeft = {3} marginBottom = {1} mt = {2}>
        <LinearProgress variant="determinate" value= {props} />
      </Box>

    </Box>
    )
}
Progressui.propTypes = {

    value: PropTypes.number.isRequired,
  };
  
export default Progressui
