import "@Root/global.scss";
import * as React from "react";
import SelectionInputAdd from "@Components/input/SelectionInputAdd";
import Table, { TablePropsData } from "@Components/table/Table";
import LabelButton from "@Components/button/LabelButton";
import Draggable from "@Components/draggable/Draggable";
import DragSlot from "@Components/draggable/DragSlot";
import Animation from "@Components/animate/Animation";

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
        <Draggable
          data={{ value: 134 }}
          group="test"
          dragElement={<div>ALLLO</div>}
        >
          <h5>Button</h5>
        </Draggable>
        <DragSlot group="test"></DragSlot>
        <LabelButton title={"Hello"} description={"AAAALO"}></LabelButton>
        <Table data={data}></Table>
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
        <Animation animations="wiggle">
          <div>SALUT</div>
        </Animation>
        <Animation animations="circle">
          <div>SALUT</div>
        </Animation>
        <Animation animations="poke">
          <div>SALUT</div>
        </Animation>
        <Animation animations={`grow`}>HELLO YOU</Animation>
      </div>
    );
  }
}

export default App;
