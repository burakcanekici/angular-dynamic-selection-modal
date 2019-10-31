import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { BeSelectionGeneralService } from "./be-selection-general/be-selection-general.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  public fetchFromServiceMethod_dynamicFormObj;

  referenceProperty = "athlete";

  constructor(
    private serviceForSelectionComponent: BeSelectionGeneralService,
    private http: HttpClient
  ) {
    this.fetchFromServiceMethod_dynamicFormObj = {
      callback: function(param) {
        http
          .get(
            "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
          )
          .subscribe(result => {
            if (param.filter) {
              var filterObjKeys = Object.keys(param.filter);
              for (var i = 0; i < filterObjKeys.length; i++) {
                if (param.filter[filterObjKeys[i]] != "") {
                  result = result.filter(function(w) {
                    return (
                      w[filterObjKeys[i]] == param.filter[filterObjKeys[i]]
                    );
                  });
                }
              }
            }
            serviceForSelectionComponent.updateAfterGetResult.next(result);
          });
      }
    };
  }

  checkForm(e){
    var message = "Main Form :\n";
    var keys = Object.keys(this.mainForm.value);
    for(var i=0;i<keys.length;i++){
      debugger;
      message += " [ " + keys[i] + " : " + this.mainForm.get(keys[i]).value + " ],\n"
    }
    window.alert(message);
  }

  dynamicFormObj: FormGroup = new FormGroup({
    formID: new FormControl("dynamicFormObj"),
    dynamicFormObj_Id: new FormControl(""),
    text: new FormControl("")
  });

  selectionFormGroupObj = [
    {
      type: "input",
      headerName: "Athlete",
      field: "athlete",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Age",
      field: "age",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Country",
      field: "country",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Year",
      field: "year",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Date",
      field: "date",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Sport",
      field: "sport",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Gold",
      field: "gold",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Silver",
      field: "silver",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Bronze",
      field: "bronze",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "input",
      headerName: "Total",
      field: "total",
      value: "",
      required: false,
      hidden: false
    },
    {
      type: "select",
      field: "sport",
      headerName: "Sport",
      value: "",
      required: false,
      hidden: false,
      elements: [
        { id: "1", text: "1" },
        { id: "2", text: "2" },
        { id: "3", text: "3" }
      ]
    }
  ];

  mainForm: FormGroup = new FormGroup({
    dynamicFormObj_Id: this.dynamicFormObj.get("dynamicFormObj_Id"),
    formInfo: new FormControl("")
  });
}
