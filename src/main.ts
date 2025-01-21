import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appInitializer } from './app/app-initializer';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ConfigService],
      multi: true,
    },
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));


