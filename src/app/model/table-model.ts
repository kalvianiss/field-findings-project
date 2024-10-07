export class UIConfig {
  actionList?: ActionList[];
  tableConfigList: TableConfigList[];
  placeholderUi: PlaceholderClass[];
  entitySortList: string[];

  constructor(
    actionList = [],
    tableConfigList = [],
    placeholderUi = [],
    entitySortList = []
  ) {
    this.actionList = actionList;
    this.tableConfigList = tableConfigList;
    this.placeholderUi = placeholderUi;
    this.entitySortList = entitySortList.map((e) => e.key);
  }

  createMarketplaceSlider() {
    let f = this.tableConfigList.findIndex((e) => e.key === 'active');
    if (f > -1) {
      this.tableConfigList.splice(f, 1);
    }
    this.tableConfigList.push(
      new TableConfigList('Active', 'active').setType('SLIDER')
    );
  }

  createCheckbox() {
    this.tableConfigList.splice(
      0,
      0,
      new TableConfigList('checkbox', 'checkbox').setType('CHECKBOX')
    );
  }
}

type ActionLocation = 'MAIN' | 'SIDE';
export class ActionList {
  icon?: string;
  location: ActionLocation = 'MAIN';

  constructor(
    public key: string,
    public value: string,
    l: ActionLocation = 'MAIN',
    public custome?: boolean
  ) {
    if (location) this.location = l;
  }

  static defaultAction() {
    let arr = [];
    arr.push(new ActionList('add', 'Add', 'MAIN'));
    arr.push(new ActionList('update', 'Update', 'SIDE'));
    arr.push(new ActionList('delete', 'Delete', 'SIDE'));
    return arr;
  }
}

// export type TableConfigListType =
// | 'CHECKBOX'
// | 'DATETIME'
// | 'STRING'
// | 'CURRENCY'
// | 'LABEL'
// | 'PERCENT'
// | 'DATETIMESTAMP'

export class PlaceholderClass {
  name: string;
}

export class EntitySortList {
  key: string;
}

export class TableConfigList {
  dataType: string = 'TEXT';
  className: string = 'delete';
  idx?: number;
  dropdownField?: string;
  info?: string;
  controlName: string;

  constructor(public value, public key) {}

  setType(data) {
    this.dataType = data;
    this.controlName = this.key;

    if (
      this.dataType.toLowerCase() === 'action' &&
      this.className === undefined
    ) {
      throw new Error('Classname undefined');
    }
    return this;
  }

  setControlName(s: string) {
    this.controlName = s;
    return this;
  }

  setDropdownField(data) {
    this.dropdownField = data;
    return this;
  }

  setIndex(idx) {
    this.idx = idx;
    return this;
  }

  setActionClass(className) {
    this.className = className;
    return this;
  }
  setInfo(data) {
    this.info = data;
    return this;
  }
}
