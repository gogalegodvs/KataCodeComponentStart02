import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IGridProps } from "./GridProps";
import { GridComponent } from "./Grid"; 
import * as React from "react";
import * as ReactDOM from "react-dom";

export class GridGalego implements ComponentFramework.StandardControl<IInputs, IOutputs> {
   private _outPutJson: string;
   private _container: HTMLDivElement;
   private _notifyOutputChanged: () => void;
   private _context: ComponentFramework.Context<IInputs>;
   resources: ComponentFramework.Resources;

   private props: IGridProps = {
      valueChanged: this.valueChanged.bind(this),
      dataSetInputJson : ""
  };

   public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        
      // Add control initialization code
      this._notifyOutputChanged = notifyOutputChanged;
      this._container = container;
      this._context = context;
      this._context.mode.trackContainerResize(true);
      this.resources = this._context.resources;
      this.props.dataSetInputJson = context.parameters.dataSetInputJson.raw

      this.valueChanged = this.valueChanged.bind(this);
   }

   public updateView(context: ComponentFramework.Context<IInputs>): void   {
      ReactDOM.render(
         React.createElement(GridComponent ,{
            valueChanged: this.valueChanged,
            dataSetInputJson : this.props.dataSetInputJson
         }),this._container);
   }

   private valueChanged(outPutJson:string ) {
      if (this.props.dataSetInputJson !== outPutJson) {
          this.props.dataSetInputJson = outPutJson;
          this._outPutJson = outPutJson;
          this._notifyOutputChanged();
      }
  }

   public getOutputs(): IOutputs {
      return {
         dataSetOutputJson: this._outPutJson
     };
   }

   public destroy(): void {
      ReactDOM.unmountComponentAtNode(this._container);
   }
}