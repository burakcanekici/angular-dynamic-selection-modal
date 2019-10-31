import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "be-selection-modal",
  templateUrl: "be-selection-modal.component.html",
  styleUrls: ["be-selection-modal.component.css"]
})
export class BeSelectionModalComponent implements OnInit {
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter();
  public selectedItems: any[] = [];
  public searchTitle: string | undefined;
  public modalHeaderText: string | undefined;
  public selectionFormGroupObj: any[];
  public formID: any;
  public treeView: boolean;
  public referenceProperty: string;

  public fetchFromServiceMethod: any;

  constructor(private modalRef: MatDialogRef<BeSelectionModalComponent>) {}

  ngOnInit() {}

  onSelectionChanged(e: any[]) {
    this.selectedItems = e;
  }
  choose() {
    this.modalRef.close(this.selectedItems);
  }
  cancel(e: Event) {
    this.modalRef.close();
  }
}
