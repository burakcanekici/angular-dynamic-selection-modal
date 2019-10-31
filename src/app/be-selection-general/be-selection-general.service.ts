import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeSelectionGeneralService {

  public searchCriteriaChanged: Subject<any> = new Subject();
  public getSearchResult: Subject<any> = new Subject();
  public updateAfterGetResult: Subject<any> = new Subject();

  public updateAsInitialValue: Subject<any> = new Subject();

  constructor() { }

  searchCriteriaChange(value: any) {
    this.searchCriteriaChanged.next(value);
  }

  modifyToTreeStructure(id: any, parentId: any, identifier: any, pList: any, objFields: any) {
    debugger;
    var returnListAsTreeStructure = [];
    for (var i = 0; i < pList.length; i++) {
      var relation = [];
      var parent = pList[i];
      while (parent != null) {
        relation.unshift(parent[identifier]);

        var findParent = null;
        for (var j = 0; j < pList.length; j++) {
          if (parent[parentId] != null && pList[j][id] == parent[parentId])
            findParent = pList[j];
        }
        parent = findParent;
      }
      debugger;
      var obj = new Object();
      for(var k=0;k<objFields.length;k++){
        obj[identifier] = relation;

        var key = objFields[k];
        if(key != identifier)
          obj[key] = pList[i][key];
      }
      returnListAsTreeStructure.push(obj);
    }
    return returnListAsTreeStructure
  }
}

export class SelectGeneralItemDto implements ISelectGeneralItemDto {
  itemID!: string;
  itemDef!: string;

  constructor(data?: ISelectGeneralItemDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.itemID = data["itemID"];
      this.itemDef = data["itemDef"];
    }
  }

  static fromJS(data: any): SelectGeneralItemDto {
    data = typeof data === 'object' ? data : {};
    let result = new SelectGeneralItemDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    this.itemID = data["itemID"];
    this.itemDef = data["itemDef"];
    return data;
  }
}

export interface ISelectGeneralItemDto {
  itemID: string;
  itemDef: string;
}
