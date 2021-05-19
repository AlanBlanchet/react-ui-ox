import "./table.scss";
import * as React from "react";
import Checkbox from "../../components/input/Checkbox";

export type TablePropsData = {
  headers: {
    name: any;
    onSort?: Function;
    sort?: Boolean | false;
    sortOrder?: number;
  }[];
  rows: any[][];
};

export interface TableProps {
  data: TablePropsData;
}

export interface TableState {
  selected: number[];
}

class Table extends React.Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      selected: []
    };
  }

  handleSelect = (index: number) => {
    this.setState((state): TableState => {
      const selection: number[] = [...state.selected];
      !selection.includes(index) && selection.push(index);
      return {
        selected: selection
      };
    });
  };

  componentDidUpdate = () => {
    console.log(this.state.selected);
  };

  handleDeselect = (index: number) => {
    this.setState((state) => {
      const i = state.selected.indexOf(index);
      return {
        selected:
          i > -1
            ? state.selected.splice(i, 1) && state.selected
            : state.selected
      };
    });
  };

  handleSelectAll = () => {
    const { data } = this.props;
    data.headers.forEach((_, i) => this.handleSelect(i));
    this.forceUpdate();
  };

  handleDeselectAll = () => {
    const { data } = this.props;
    data.headers.forEach((_, i) => this.handleDeselect(i));
    this.forceUpdate();
  };

  render() {
    const { selected } = this.state;
    const { data } = this.props;
    const { headers, rows } = data;

    const sortedHeaders = headers
      .map((header, i) => {
        return {
          header,
          index: i
        };
      })
      .sort((h1, h2) =>
        compare(h2.header?.sortOrder ?? 0, h1.header?.sortOrder ?? 0)
      );

    const rowsOrdered = rows.sort((r1, r2): number => {
      for (const sortedHeader of sortedHeaders) {
        const { header, index } = sortedHeader;
        if (!header.sort) continue;
        const { onSort } = header;

        const comp =
          onSort != null
            ? onSort?.(r1[index], r2[index])
            : compare(r1[index], r2[index]);
        if (comp != 0) return comp;
      }
      return 0;
    });

    return (
      <table className={`table`}>
        <thead>
          <tr>
            <th>
              <Checkbox
                onChecked={this.handleSelectAll}
                onUnchecked={this.handleDeselectAll}
              />
            </th>
            {headers.map((header) => (
              <th>{header.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsOrdered.map((row, i) => (
            <tr>
              <td>
                <Checkbox
                  onClick={() =>
                    selected.includes(i)
                      ? this.handleDeselect(i)
                      : this.handleSelect(i)
                  }
                  checked={selected.includes(i)}
                />
              </td>
              {row.map((data) => (
                <td>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;

const compare = (o1: any, o2: any) => {
  return o1 < o2 ? -1 : o1 == o2 ? 0 : 1;
};
