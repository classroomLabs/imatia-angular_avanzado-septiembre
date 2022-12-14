import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { AboutModule } from "./about/about.module";

import { EffectsModule } from "@ngrx/effects";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { HomeModule } from "./home/home.module";
import { InfoComponent } from "./info.component";
import { NotificationsControl } from "./notifications.control";
import { ErrorInterceptor } from "./services/error.interceptor";
import { GlobalErrorHandler } from "./services/global-error.handler";
import { LoggerBaseService } from "./services/logger-base.service";
import { LoggerConsoleService } from "./services/logger-console.service";
import { LoggerHttpService } from "./services/logger-http.service";
import { LOG_APP_VERSION, LOG_LEVEL } from "./services/logger.tokens";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InfoComponent,
    NotificationsControl,
  ],
  imports: [
    BrowserModule,
    AboutModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    // {
    //   provide: LoggerBaseService,
    //   useClass: LoggerHttpService,
    // }
    //,
    // {
    //   provide: LoggerBaseService,
    //   deps: [HttpClient],
    //   useFactory: (http: HttpClient) =>
    //     environment.production
    //       ? new LoggerHttpService(http)
    //       : new LoggerConsoleService(),
    // }
    //,
    {
      provide: LOG_LEVEL,
      useValue: "verbose",
    },
    {
      provide: LOG_APP_VERSION,
      useValue: 14,
    },
    {
      provide: LoggerBaseService,
      deps: [HttpClient, LOG_LEVEL],
      useFactory: (http: HttpClient, logLevel: string) =>
        environment.production
          ? new LoggerHttpService(http)
          : new LoggerConsoleService(logLevel),
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(logger: LoggerBaseService) {
    logger.log("AppModule constructor");
    logger.warn("AppModule constructor", { data: "some data" });
    logger.error("AppModule constructor", new Error("some error"));
  }
}
