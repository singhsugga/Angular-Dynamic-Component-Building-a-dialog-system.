import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { SrjDialogConfig } from './srj-dialog-config';
import { SrjDialogInjector } from './srj-dialog-injector';
import { SrjDialogModule } from './srj-dialog.module';
import { SrjDialogRef } from './srj-dialog.ref';
import { SrjDialogComponent } from './srj-dialog/srj-dialog.component';
// import { UiDialogConfig } from './ui-dialog-config';
// import { UiDialogInjector } from './ui-dialog-injector';
// import { UiDialogRef } from './ui-dialog-ref';
// import { UiDialogComponent } from './ui-dialog.component';
// import { UiDialogModule } from './ui-dialog.module';


@Injectable({
  providedIn: SrjDialogModule,
})
export class UiDialogService {
  dialogComponentRef: ComponentRef<SrjDialogComponent>[] = [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

  public open(componentType: Type<any>, config: SrjDialogConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);
    this.dialogComponentRef[this.dialogComponentRef?.length - 1].instance.childComponentType = componentType;
    return dialogRef
  }

  private appendDialogComponentToBody(config: SrjDialogConfig) {
    const map = new WeakMap();
    map.set(SrjDialogConfig, config);

    const dialogRef = new SrjDialogRef();
    map.set(SrjDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SrjDialogComponent);
    const componentRef = componentFactory.create(new SrjDialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);



    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef.push(componentRef)
    this.dialogComponentRef[this.dialogComponentRef?.length - 1].instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef[this.dialogComponentRef?.length - 1].hostView);
    this.dialogComponentRef.pop()?.destroy();
    console.log("dialog refs", this.dialogComponentRef)

  }

}
