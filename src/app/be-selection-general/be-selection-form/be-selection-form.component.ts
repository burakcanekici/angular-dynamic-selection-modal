import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BeSelectionModalComponent } from "../be-selection-modal/be-selection-modal.component";

@Component({
  selector: "be-selection-form",
  templateUrl: "be-selection-form.component.html",
  styleUrls: ["be-selection-form.component.css"]
})
export class BeSelectionFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() placeHolderText: string;
  @Input() modalHeaderText: string;
  @Input() selectionFormGroupObj: any[];
  @Input() treeView: boolean;
  @Input() fetchFromServiceMethod: any;

  @Input() referenceProperty: string;

  public itemIDSpesification;
  public itemDefSpesification;

  private _selectedItems: any[];
  public get selectedItems(): any[] {
    return this._selectedItems;
  }

  public set selectedItems(v: any[]) {
    this._selectedItems = v;
    if (this._selectedItems) {
      this.parentForm.get(this.itemIDSpesification).setValue(this._selectedItems.map(function (w){return w.athlete;}).toString());
      this.parentForm.get(this.itemDefSpesification).setValue(this._selectedItems.length + " item(s) selected!");
    } else {
      this.parentForm.get(this.itemIDSpesification).setValue(null);
      this.parentForm.get(this.itemDefSpesification).setValue(null);
    }
  }

  @Output() itemSelectionModalClosed: EventEmitter<any[]> = new EventEmitter();

  constructor(private modal: MatDialog) {}

  ngOnInit() {
    this.itemIDSpesification = Object.keys(this.parentForm.controls)[1];
    this.itemDefSpesification = Object.keys(this.parentForm.controls)[2];

    this.parentForm.addControl(this.itemIDSpesification, new FormControl(""));
    this.parentForm.addControl(this.itemDefSpesification, new FormControl(""));
  }

  delete(e: Event) {
    this.parentForm.get(this.itemIDSpesification).setValue(null);
    this.parentForm.get(this.itemDefSpesification).setValue(null);
  }

  search(e: Event) {
    const dialogRef = this.modal.open(BeSelectionModalComponent, {
      panelClass: "modal-xl"
    });
    
    dialogRef.componentInstance.selectedItems = this.selectedItems;
    dialogRef.componentInstance.searchTitle = this.parentForm.get(
      this.itemDefSpesification
    ).value;
    dialogRef.componentInstance.modalHeaderText = this.modalHeaderText;
    dialogRef.componentInstance.selectionFormGroupObj = this.selectionFormGroupObj;
    dialogRef.componentInstance.formID = this.parentForm.get("formID").value;
    dialogRef.componentInstance.treeView = this.treeView;
    dialogRef.componentInstance.fetchFromServiceMethod = this.fetchFromServiceMethod;
    dialogRef.componentInstance.referenceProperty = this.referenceProperty;
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedItems = result;
      }
    });
  }
}
