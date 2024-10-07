import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AppModule } from '../app.module';
import { UnderDevelopmentDialogComponent } from '../shared-dialog/under-development-dialog/under-development-dialog.component';

//helper
export class ErrorPageFailToLoad {
  constructor() {
    AppModule.injector
      .get(Router)
      .navigate(['info', 'fail-to-load'], { skipLocationChange: true });
  }
}

export class ErrorMaintenance {
  constructor() {
    AppModule.injector
      .get(Router)
      .navigate(['info', 'maintenance'], { skipLocationChange: true });
  }
}

export class ErrorNoData {
  constructor() {
    AppModule.injector
      .get(Router)
      .navigate(['info', 'no-data'], { skipLocationChange: true });
  }
}

export class ErrorUnderdevelopment {
  constructor() {
    AppModule.injector
      .get(Router)
      .navigate(['info', 'under-development'], { skipLocationChange: true });
  }
}

export class ErrorUnderdevelopmentDialog {
  constructor() {
    AppModule.injector
      .get(MatDialog)
      .open(UnderDevelopmentDialogComponent, { width: '450px' });
  }
}

export class ErrorConnectionInterrupt {
  constructor() {
    AppModule.injector
      .get(Router)
      .navigate(['info', 'connection-interupt'], { skipLocationChange: true });
  }
}
