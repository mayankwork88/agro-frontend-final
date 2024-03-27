import React from 'react';
import {TextField, InputAdornment} from "@mui/material";
import {SearchIcon} from '../icons';

const SearchInput = ({placeholder,value,onChange}) => {
  return (
  <TextField
       fullWidth
        size="large"
        placeholder={placeholder}
        sx={{fontSize:'12px'}}
        onChange={onChange}
        value={value}
        InputProps={{
            sx: { borderRadius: "8px !important", height: "5vh", fontSize:'14px'},
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="medium" sx={{color:"#8F8F8F"}} />
            </InputAdornment>
          ),
        }}
      />
  );
}

export default SearchInput;
