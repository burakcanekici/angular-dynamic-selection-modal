import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';

import { BeSelectionGeneralService } from '../be-selection-general.service';

@Component({
  selector: 'be-selection-search',
  templateUrl: './be-selection-search.component.html',
  styleUrls: ['./be-selection-search.component.css']
})
export class BeSelectionSearchComponent implements OnInit {

  @Input() selectionFormGroupObj : any[];
  selectionFormGroupObjWithoutHidden : any[];

  selectionFormGroup : FormGroup;

  constructor(private serviceSelectionGeneral: BeSelectionGeneralService) { 
  }

  ngOnInit() {
    let fieldsCtrls = {};
    for(let f of this.selectionFormGroupObj){
      fieldsCtrls[f.field] = new FormControl(f.value, f.required ? Validators.required : null);
    }
    this.selectionFormGroup = new FormGroup(fieldsCtrls);

    this.selectionFormGroupObjWithoutHidden = this.selectionFormGroupObj.filter(function(w){
      return !w.hidden;
    });
  }

  search() {
    this.serviceSelectionGeneral.searchCriteriaChange(this.selectionFormGroup.value);
  }

}
