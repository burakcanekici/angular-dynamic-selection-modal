import { Component, OnInit, Input, Output, EventEmitter, Injector, OnDestroy } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { BeSelectionGeneralService } from '../be-selection-general.service';

@Component({
  selector: 'be-selection-list',
  templateUrl: 'be-selection-list.component.html',
  styleUrls: ['be-selection-list.component.css']
})
export class BeSelectionListComponent implements OnInit, OnDestroy {

  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter();

  @Input() public selectedItems: any[] = [];
  @Input() selectionFormGroupObj: any[];
  @Input() formID: any;

  @Input() referenceProperty: string;

  @Input() fetchFromServiceMethod: any;

  columnDefs = [];
  rowData;

  gridApi: GridApi;
  private gridColumnApi;
  searchCriteriaChanged$: Subscription;

  constructor(_injector: Injector, private http: HttpClient, private serviceSelectionGeneral: BeSelectionGeneralService) {

    this.searchCriteriaChanged$ = this.serviceSelectionGeneral.searchCriteriaChanged.subscribe((d: any) => {
      this.getData(d);
    });
    

    this.serviceSelectionGeneral.updateAfterGetResult.subscribe(c => {
      this.gridApi.setRowData(c);
      this.setSelectedItems();
    });
  }

  ngOnInit() {
    
    this.columnDefs = this.selectionFormGroupObj.filter(function (w) {
      return !w.hidden;
    }).map(w => {
      var rObj = {
        headerName: w.headerName,
        field: w.field,
        sortable: true,
        filter: true
      };
      return rObj;
    });
  }

  onSelectionChanged() {
    this.selectionChange.emit(this.gridApi.getSelectedRows());
  }
  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    if (this.selectedItems) {
      this.gridApi.setRowData(this.selectedItems);
      this.setSelectedItems();
    }

    //var param = { filter: null, id: this.formID };
    //this.fetchFromServiceMethod.callback(param);
  }
  private setSelectedItems() {
    if (this.selectedItems) {
      this.gridApi.forEachNode((node) => {
        if (this.selectedItems.map(m => m[this.referenceProperty]).indexOf(node.data[this.referenceProperty]) > -1) {
          debugger;
          node.setSelected(true);
        }
      });
    }
  }

  getData(filter: any) {
    var param = { filter: filter, id: this.formID };
    this.fetchFromServiceMethod.callback(param);
  }
  ngOnDestroy(): void {
    if (this.searchCriteriaChanged$) {
      this.searchCriteriaChanged$.unsubscribe();
    }
  }
}
