
import * as React from 'react';
import { IGridProps } from './GridProps';
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import './css/Grid.css';

var idDefault = 1;

function getdataProps(json: string){
  try{
    var items = JSON.parse(json);

    return items.map((item: any) => (
      {
      Name: item.Name,
      Country: item.Country,
      Age: item.Age,
      id: item.id
    }));
  }catch{
    //Invalid Json

    return [{ Name: "",Country: "",Age: 0,id: 1 }]
  }
}

export const GridComponent = React.memo((props: IGridProps) => {

    var data = getdataProps(props.dataSetInputJson);

    var dataTable : ITableProps = {
      columns: [
        { key: 'Name', title: 'Name', dataType: DataType.String },
        { key: 'Country', title: 'Country', dataType: DataType.String },
        { key: 'Age', title: 'Age', dataType: DataType.Number},
      ],
      data: data,
      editingMode: EditingMode.Cell,
      rowKeyField: 'id',
      sortingMode: SortingMode.Single
    } 

    const [tableProps, changeTableProps] = React.useState(dataTable);

    const dispatch: DispatchFunc = action => {
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    };

    const addRow: DispatchFunc = (tableProps: ITableProps) => {
      
      var arrayData = tableProps.data;
      
      arrayData?.push({
        Name: "",
        Country: "",
        Age:0,
        id: arrayData.length + 1
      })

      tableProps.data = arrayData;


      changeTableProps((prevState: ITableProps) => kaReducer(prevState, tableProps.data));
    };

    const saveTable: DispatchFunc = (tableProps: ITableProps) => {

      props.valueChanged(JSON.stringify(tableProps.data));

    };

  return (
    <div>
     
      <Table {...tableProps} dispatch={dispatch} />
      
      <div>
        <button onClick={() => addRow(tableProps)}>Add Row</button>
        <button style={{backgroundColor:"#0b6b8d"}} onClick={() => saveTable(tableProps)}>Save</button>
      </div>
    </div>
  );
});