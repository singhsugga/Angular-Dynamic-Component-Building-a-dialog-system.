import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[srjInsertion]',
})
export class SrjInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
