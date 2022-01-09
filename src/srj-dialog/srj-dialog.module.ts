import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrjDialogComponent } from './srj-dialog/srj-dialog.component';
import { SrjInsertionDirective } from './srj-insertion.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SrjDialogComponent, SrjInsertionDirective],
})
export class SrjDialogModule {}
