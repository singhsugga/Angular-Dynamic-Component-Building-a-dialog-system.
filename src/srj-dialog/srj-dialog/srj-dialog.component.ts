import {
  Component,
  Type,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';

import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  ROUTER_CONFIGURATION,
} from '@angular/router';
import { SrjDialogConfig } from '../srj-dialog-config';
import { SrjDialogRef } from '../srj-dialog.ref';
import { SrjInsertionDirective } from '../srj-insertion.directive';

@Component({
  selector: 'srj-dialog',
  templateUrl: './srj-dialog.component.html',
  styleUrls: ['./srj-dialog.component.css'],
})
export class SrjDialogComponent implements AfterViewInit, OnDestroy, OnInit {
  componentRef!: ComponentRef<any>;
  position: any;
  background: any;
  @ViewChild(SrjInsertionDirective, { static: true })
  insertionPoint!: SrjInsertionDirective;
  animation = true;

  private readonly onDialogClose = new Subject<any>();
  public onClose = this.onDialogClose.asObservable();

  childComponentType!: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: SrjDialogRef,
    public config: SrjDialogConfig,
    private router: Router
  ) {}
  ngOnInit() {
    this.position = this.config.position;
    this.background = this.config.background;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.animation = false;
    }, 200);
    this.routeAction();
  }

  routeAction() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.dialogRef.close();
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
      }
    });
  }
  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    // this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this.onDialogClose.next(true);
    document.body.style.overflow = 'auto';
  }
}
