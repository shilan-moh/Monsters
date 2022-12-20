//import { Component } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import CardList from "./components/card-list/Card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonster] = useState([]);
  const [filteredMonsters, setFiltersMonsters] = useState(monsters);
  console.log("rerender");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonster(users));
  }, []);
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFiltersMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldstring = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldstring);
  };

  return (
    <div className="App">
      <h1 className="title">MONSTERS ROLODEX</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monster-search-box"
        type="search"
        placeholder="search Monster name"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

/*class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {}
        );
      });
  }



  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    ;

    return (
      <div className="App">
        <h1 className="title">MONSTERS ROLODEX</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          className="monster-search-box"
          type="search"
          placeholder="search Monster name"
        />

        {/*filteredMonsters.map((monsters) => {
          return (
            <div key={monsters.id}>
              <h1>{monsters.name}</h1>
            </div>
          );
        })}
        
      </div>
    );
  }
}*/

export default App;
