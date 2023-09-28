import { Injector } from '@angular/core';

export class AppInjector {

    private static injector: Injector;

    public static setInjector(injector: Injector): void {

        AppInjector.injector = injector;

    }

    public static getInjector(): Injector {

        return AppInjector.injector;

    }

}
