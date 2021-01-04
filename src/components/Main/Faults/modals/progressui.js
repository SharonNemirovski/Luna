import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Progressui(props) {
    return (
      <Box className = "progresscircle" display="flex" alignItems="center">
        <Box minWidth={35} paddingTop = {1}>
        <Typography  variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box width="100%" mr={1} marginLeft = {3} marginBottom = {1} mt = {2}>
        <LinearProgress variant="determinate" {...props} />
      </Box>

    </Box>
    )
}
Progressui.propTypes = {

    value: PropTypes.number.isRequired,
  };
  
export default Progressui
