import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextField from "@mui/material/TextField";
import MaterialCard from "../components/card";
import "./index.css";

const Buscador = () => {
  const [user, setUser] = useState("");
  const [repositories, setRepositories] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}/repos`
      );

      setRepositories(response.data);

      setUser("");
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    
      setUser(inputValue);
    
  };

  return (
    <div className="paineltop">
      <form onSubmit={handleSubmit}>
        <TextField 
          variant="outlined"
          onChange={handleChange}
          value={user}
          size="small"
          sx={{input: {color: '#fff'}, margin: '5px'}}
        />
        <Button type="submit" variant="outlined" sx={{margin: '6px',}}>
          <SearchOutlinedIcon />
        </Button>
     
      </form>
      {repositories[0] && (
        <img src={repositories[0].owner.avatar_url} />
        )}
      <Grid container spacing={2}>
        {repositories.map((repository, index) => {
          return (
            <Grid item xs={6} md={6} key={index}>
              <MaterialCard key={index} repository={repository} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Buscador;
