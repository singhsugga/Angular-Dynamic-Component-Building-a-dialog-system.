import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

export class SrjDialogInjector implements Injector {
  constructor(
    private parentInjector: Injector,
    private dialogTokens: WeakMap<any, any>
  ) {}

  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  get(token: any, notFoundValue?: any, flags?: any) {
    const value = this.dialogTokens.get(token);
    if (value) {
      return value;
    }
    return this.parentInjector.get<any>(token, notFoundValue);
  }
}
