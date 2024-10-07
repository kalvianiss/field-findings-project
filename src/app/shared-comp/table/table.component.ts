import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { Subject, takeWhile } from 'rxjs';
import { ActionList, UIConfig } from 'src/app/model/table-model';
import { validationMessages } from 'src/app/utils/pipe/errorKeys.pipe';
import { LoadingService } from '../service/loading.service';
import { TableDataService } from '../service/table-data.service';
import { miniIcon } from 'src/app/utils/icon-registry';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ImageService } from '../service/image.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../service/snackbar.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  menuPosition = { x: '0px', y: '0px' };
  @Input() actionList: ActionList[] = [];
  selectedItem: any[] = [];
  alive: boolean = true;
  @Input() hidePaging: boolean = false;
  @Input() pageOpt: number[] = [20, 50, 100];
  @Input() tableUi: UIConfig;
  @Input() dataSource;
  @Input() control: FormArray;
  @Input() messages = validationMessages;

  @Input() disableId: number[] = [];
  @Input() selectedId: number[] = [];
  @Input() removedId: number[] = [];
  @Input() typeSelect: boolean;
  @Input() maxSelected: number;

  @Input() max: number = 0;
  @Input() dialog: boolean;
  @Input() overideTotalElement: number = 0;
  @Input() disableAction: boolean;
  @Output() update = new EventEmitter();
  @Output() inputEmit = new EventEmitter();
  @Output() sendAction = new EventEmitter<any>();
  @Output() dropdownChange = new EventEmitter<any>();
  @Output() actionEquipment = new EventEmitter<any>();
  @Output() detailRecapAr = new EventEmitter<any>();

  @ViewChild(MatMenuTrigger) actionMenu: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  inputDebounce: Subject<any> = new Subject();

  @ViewChild(MatSort) sort: MatSort;

  value: string;
  tableLoading = true;
  constructor(
    public loadingService: LoadingService,
    public tableDataService: TableDataService,
    public imageService: ImageService,
    public _liveAnnouncer: LiveAnnouncer,
    private snackbar: SnackbarService
  ) {}

  ngOnDestroy(): void {
    this.alive = false;
    this.selectedId = [];
    this.typeSelect = false;
    this.selectedItem = [];
    this.removedId = [];
  }

  ngAfterViewInit(): void {
    this.inputDebounce
      .pipe(takeWhile(() => this.alive))
      .pipe(debounceTime(500))
      .subscribe((v) => {
        this.inputEmit.emit(v);
      });
  }

  ngOnInit(): void {
    this.tableLoading = false;
  }

  emitDropdownChange(idx: number, key: string, $event) {
    this.dropdownChange.emit({
      index: idx,
      key: key,
      value: $event.value,
    });
  }

  // updateFilter() {
  //   this.actionList = this.tableUi.actionList.filter(
  //     (x) => x.location === 'SIDE'
  //   );
  //   this.actionList.forEach((x, i) => {
  //     x.icon = miniIcon(x.key);
  //   });
  // }

  get displayedColumns() {
    let col = ['no'];
    if (this.tableUi?.tableConfigList) {
      this.tableUi.tableConfigList.forEach((e) => {
        col.push(e.key);
      });
    }
    return col;
  }

  getValueList(element: any, k: string) {
    return element[k];
  }

  getValue(element: any, k: string): any {
    try {
      return k.split('.').reduce((el, key) => {
        let returnVal = el[key];
        return returnVal;
      }, element);
    } catch {
      return '-';
    }
  }

  emitKeyupInput(name, idx, $ev) {
    this.inputDebounce.next({
      name: name,
      idx: idx,
      ev: $ev,
    });
  }

  callTableRowFunction() {}

  setColorText(element: any, key: string) {
    let text = '';
    if (key === 'activeDisplay') {
      if (element.activeDisplay === 'ACTIVE') {
        text = 't-active';
      } else {
        text = 't-inactive';
      }
    }
    return text;
  }

  toggle(el, ev: boolean, t?) {
    localStorage.removeItem('ids');
    if (ev && this.max > 0 && this.selectedItem.length + 1 > this.max) {
      if (t) {
        t.checked = false;
      }
      return;
    }
    if (ev === true) {
      if (this.maxSelected) {
        if (this.selectedItem.length < this.maxSelected) {
          this.selectedItem.push(el);
        } else {
          this.snackbar.createInfo(`Max selected ${this.maxSelected} data`);
          t.checked = false;
        }
        return;
      }
      this.selectedItem.push(el);
      if (this.selectedId.length > 0) {
        let find = this.selectedId.find((v) => v !== el.id);
        if (find) {
          this.selectedId.push(el.id);
        }
      } else {
        this.selectedId.push(el.id);
      }
    } else {
      let oldIds = this.selectedId.findIndex((ids) => ids === el.id);
      if (oldIds > -1) {
        this.selectedId.splice(oldIds, 1);
      } else {
        this.selectedId.push(el.id);
      }

      let index = this.selectedItem.findIndex((e) => e.id === el.id);
      if (index >= 0) {
        this.selectedItem.splice(index, 1);
        this.removedId.push(el.id);
      }
    }

    localStorage.setItem('ids', JSON.stringify(this.selectedId));
    localStorage.setItem('itemS', JSON.stringify(this.selectedItem));
  }

  toggleAll(event: MatCheckboxChange) {
    // this.selectedItem = [];
    localStorage.removeItem('ids');
    if (event.checked) {
      this.dataSource.forEach((row) => {
        if (this.disableId.includes(row.id)) {
          return;
        }
        let idx = this.selectedItem.findIndex((e) => e.id === row.id);
        if (idx === -1) {
          this.selectedItem.push(row);
        }
      });
      this.selectedItem.forEach((item) => {
        let find = this.selectedId.find((v) => v === item.id);
        if (!find) {
          this.selectedId.push(item.id);
        }
      });
    } else {
      this.dataSource.forEach((row) => {
        if (this.disableId.includes(row.id)) {
          return;
        }
        let idx = this.selectedItem.findIndex((e) => e.id === row.id);
        if (idx > -1) {
          this.selectedItem.splice(idx, 1);
        }
        let index = this.selectedId.findIndex((e) => e === row.id);
        if (index > -1) {
          this.selectedId.splice(index, 1);
        }
      });
    }

    localStorage.setItem('ids', JSON.stringify(this.selectedId));
    localStorage.setItem('itemS', JSON.stringify(this.selectedItem));
  }

  exist(element) {
    return this.selectedItem.findIndex((e) => e.id === element.id) > -1;
  }

  isChecked() {
    let target = [];
    let arr = [];
    this.selectedItem.forEach((e) => arr.push(e.id));
    this.dataSource.forEach((e) => target.push(e.id));

    return target.every((v) => arr.includes(v));
  }

  isIndeterminate() {
    return this.checkSelectedContain() && !this.isChecked();
  }

  checkSelectedContain() {
    let x = [];
    this.dataSource.forEach((element) => {
      x.push(element.id);
    });
    return this.selectedItem.some((r) => x.includes(r.id));
  }

  isDisabled(el) {
    if (!el?.id) return false;
    return this.disableId.includes(el.id);
  }

  sendActionFn(key: string, el: any, idx: number, originalEv, length?) {
    if (this.isDisabled(el)) return;
    this.sendAction.emit({
      key: key,
      data: el,
      index: idx,
      ev: originalEv,
      length: length,
    });
  }

  updateData(idx: number, value: string, key: string, originalEv) {
    this.sendActionFn(key, value, idx, originalEv);
  }

  filter() {}

  checkAction(key) {
    if (
      key === 'firstPeriod.value' ||
      key === 'fifthPeriod.value' ||
      key === 'thirdPeriod.value' ||
      key === 'fourthPeriod.value' ||
      key === 'secondPeriod.value' ||
      key === 'totalStart' ||
      key === 'quantityAsset'
    ) {
      return '';
    }
    if (this.actionList.length > 0) return 'Click for action';
    return '';
  }

  showMenu($event, el: any, index: number, x?, originalEv?, length?) {
    if (
      x.key === 'checkbox' ||
      x.key === 'imageLocation' ||
      x.key === 'image' ||
      x.key === 'packetImage' ||
      x.key === 'afterImage' ||
      x.key === 'imageUrl' ||
      x.key === 'orderingViews' ||
      x.key === 'checklistImage' ||
      x.key === 'fileLoc' ||
      x.key === 'firstPeriod.value' ||
      x.key === 'fifthPeriod.value' ||
      x.key === 'thirdPeriod.value' ||
      x.key === 'fourthPeriod.value' ||
      x.key === 'secondPeriod.value' ||
      x.key === 'totalStart' ||
      x.key === 'quantityAsset'
    )
      return;
    if (x.dataType === 'INPUT') return;
    if (this.disableAction) {
      this.sendActionFn('click', el, index, originalEv, length);
      return;
    }
    // if(x.type ==='INPUT') return;
    $event.preventDefault();
    if (el.actionMenu) {
      el.actionMenu.forEach((element) => {
        element.icon = miniIcon(element.key);
      });
      this.actionList = [...el.actionMenu];
    }

    if (this.actionList.length > 0) {
      this.menuPosition.x = $event.clientX + 'px';
      this.menuPosition.y = $event.clientY + 'px';

      this.actionMenu.menuData = { value: el, index: index };
      this.actionMenu.menu.focusFirstItem('mouse');
      this.actionMenu.openMenu();
    }
  }

  sendData(d: ActionList, originalEv) {
    if (d.custome) {
      let dataAction = {
        actionList: d.key,
        arr: this.actionMenu,
      };
      this.actionEquipment.emit(dataAction);
    }
    this.sendActionFn(
      d.key,
      this.actionMenu.menuData.value,
      this.actionMenu.menuData.index,
      originalEv
    );
  }
}
