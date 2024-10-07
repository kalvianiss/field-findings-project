import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from 'src/app/utils/pipe/errorKeys.pipe';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css'],
})
export class InputAreaComponent implements OnInit {
  @Input() label = '';
  @Input() hint: string;
  @Input() hintLength: string;
  @Input() type = 'text';
  @Input() control: FormControl;
  @Input() placeholder?: string;
  @Input() messages = validationMessages;
  @Input() readonly?: boolean;
  @Input() rows = 4;
  constructor() {}

  ngOnInit(): void {}
}
