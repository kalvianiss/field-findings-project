import { Component, Input, OnInit } from '@angular/core';
import { TitleBreadcrumbService } from '../service/title-breadcrumb.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  constructor(public title: TitleBreadcrumbService) {}
  alive = true;

  @Input() titleName: string;
  ngOnInit(): void {
    // this.alive = false;
  }
}
