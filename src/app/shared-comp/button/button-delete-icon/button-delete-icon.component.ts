import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-delete-icon',
  templateUrl: './button-delete-icon.component.html',
  styleUrls: ['./button-delete-icon.component.css'],
})
export class ButtonDeleteIconComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() name: string;
  constructor() {}

  ngOnInit(): void {}
}
