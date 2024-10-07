import { Component, Input, OnInit } from '@angular/core';
import { BaseBtn } from '../../base-model/base-btn';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.css'],
})
export class ButtonAddComponent extends BaseBtn implements OnInit {
  @Input() name: string = 'NEW VISITOR';
  @Input() color: string = 'btn-add';

  ngOnInit(): void {}
}
