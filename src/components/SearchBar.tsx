import * as React from "react";
import { TextField, Box } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        sx={{ width: '100%', maxWidth: 600 }}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default SearchBar;
