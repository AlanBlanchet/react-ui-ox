import "./App.scss";
import * as React from "react";
import SelectionInputAdd from "./input/SelectionInputAdd";
import Table, { TablePropsData } from "./table/Table";
import AlternateButton from "./button/AlternateButton";
import SimpleButton from "./button/SimpleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {
    const dNum = 10;
    const rNum = 5;
    const data: TablePropsData = {
      headers: [...new Array(dNum).keys()].map((name) => {
        return {
          name,
          sort: true
        };
      }),
      rows: [...new Array(rNum).keys()].map((_) =>
        [...new Array(dNum).keys()].map((_) => Math.floor(Math.random() * 2))
      )
    };

    return (
      <div>
        <Table data={data}>Alo</Table>
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
