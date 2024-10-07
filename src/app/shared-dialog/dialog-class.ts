import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AppModule } from '../app.module';
// import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
// import { DefaultInformationDialogComponent } from './default-information-dialog/default-information-dialog.component';
// import { DeleteInformationDialogComponent } from './delete-information-dialog/delete-information-dialog.component';

export class ShowConfirmationDialog {
  title = 'Are you sure ? ';
  moreInfo;
  type;

  constructor(onSuccess?, t?, info?, type?) {
    if (t) this.title = t;
    if (info) this.moreInfo = info;
    if (type) this.type = type;
    // AppModule.injector
    //   .get(MatDialog)
    //   .open(ConfirmationDialogComponent, {
    //     data: {
    //       title: this.title,
    //       moreInfo: this.moreInfo,
    //       type: this.type,
    //     },
    //     // height: '350px',
    //     width: '450px',
    //   })
    //   .afterClosed()
    //   .subscribe((e) => {
    //     if (onSuccess) {
    //       onSuccess(e);
    //     }
    //   });
  }
}

export class ShowInformationDialog {
  constructor(title: string, content: string, onSuccess?) {
    // AppModule.injector
    //   .get(MatDialog)
    //   .open(DefaultInformationDialogComponent, {
    //     data: {
    //       title: title,
    //       content: content,
    //     },

    //     height: '350px',
    //     width: '450px',
    //   })
    //   .afterClosed()
    //   .subscribe((e) => {
    //     if (onSuccess) {
    //       onSuccess(e);
    //     }
    //   });
  }
}

export class ShowInformationDialogDelete {
  constructor(content: string, onSuccess?) {
    // AppModule.injector
    //   .get(MatDialog)
    //   .open(DeleteInformationDialogComponent, {
    //     data: {
    //       content: content,
    //     },
    //     height: '350px',
    //     width: '450px',
    //   })
    //   .afterClosed()
    //   .subscribe((e) => {
    //     if (onSuccess) {
    //       onSuccess(e);
    //     }
    //   });
  }
}
// export class ShowDialogAddStore extends Subject<any> {
//   constructor(i: IFrontEndMarketplace[]) {
//     super();
//     AppModule.injector
//       .get(MatDialog)
//       .open(AddStoreDialogComponent, {
//         data: i,
//         // disableClose: true,
//         width: '425px',
//         height: 'auto',
//       })
//       .afterClosed()
//       .subscribe((e) => this.next(e));
//   }
// }
