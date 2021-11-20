import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import countries from './data/categories';
import { debounce } from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField } from "@material-ui/core";
function App() {
 const [meaning, setMeaning] = useState([]);
 const [word, setWord] = useState("");
 const [category, setCategory] = useState("en");
    const dictionaryApi = async() => {
      try { const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
setMeaning(data.data)
      } catch(error){
      console.log(error)}
    }
    console.log(meaning)   
    useEffect(() => {
dictionaryApi();
    },[word, category]);
    const handleChange = (e) => {
      setCategory(e.target.value);
      setWord("");
      setMeaning([]);
    };
  
      const handleText = debounce((text) => {
      setWord(text);
    }, 500);
    return (
      <div className="App">
        <span className="title">{word ? word : "Word"}</span>
      <div className="inputs">        
          <TextField
            className="search"
            id="filled-basic"
            // value={word}
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
            className="select"
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
         </div>
         {meaning[0] && word && category === "en" && (
        <audio
          style={{ backgroundColor: "#fff", borderRadius: 10 }}
          src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
          controls
        >
          Your browser does not support the audio element.
        </audio>
      )}
       {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        meaning.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
               >
                <b>{def.definition}</b>
                <hr  />
                {def.example && (
                  <span>
                    <b>Example :</b> {def.example}
                  </span>
                )}
                {def.synonyms && (
                  <span>
                    <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
}

export default App;
