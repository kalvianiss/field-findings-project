import { Component, EventEmitter, Output } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { LoadingService } from '../service/loading.service';

@Component({
  template: '',
})
export class BaseBtn {
  @Output() click = new EventEmitter();
  loadingService: LoadingService;

  constructor() {
    this.loadingService = AppModule.injector.get(LoadingService);
  }

  clickFn($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.click.emit();
  }
}
