
import React from 'react';
import {useCookies} from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyIcon from '@material-ui/icons/VpnKey';


const useStyles = makeStyles(theme => ({
  labelRoot: {
    color: theme.palette.common.white,
  },
  inputRoot: {
    color: theme.palette.common.white,
  },
  inputInput: {
    color: theme.palette.common.white,
  },
  inputUnderline: {
    '&:before, &:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.palette.common.white,
    }
  }
}));

export default function ApiKeyManager(props) {
    const classes = useStyles();

    const [{gw2ApiKey}, setApiKeyCookie, removeApiKeyCookie] = useCookies(['gw2ApiKey']);
  
    const handleChange = (event) => {
      const value = event.target.value;
      if(value) {
        setApiKeyCookie('gw2ApiKey', value, { path: '/' });
      } else {
        removeApiKeyCookie('gw2ApiKey', { path: '/' });
      }
    }
    return (
      <TextField 
        label="APY key"
        value={gw2ApiKey}
        onChange={event => handleChange(event)}
        InputLabelProps={{
          classes:{
            root: classes.labelRoot,
          },          
        }}
        InputProps={{
          classes:{
            root: classes.inputRoot,
            input: classes.inputInput,
            underline: classes.inputUnderline,
          },
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }