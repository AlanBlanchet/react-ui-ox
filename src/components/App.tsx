import "./App.scss";
import * as React from "react";
import SelectionInputAdd from "./input/SelectionInputAdd";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <SelectionInputAdd
          data={[
            "AAAA",
            "BBBB",
            "CCCC",
            "DDDD",
            "EEEE",
            "FFFFF",
            "GGGG",
            "HHHH",
            "HHGG"
          ]}
          addName={"Ajouter Catégorie"}
          noDataLabel={`Pas de catégorie`}
        />
      </div>
    );
  }
}

export default App;
