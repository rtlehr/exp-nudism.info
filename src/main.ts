import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/utils/config.service';
import { APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appInitializer } from './app/app-initializer';

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
    provideRouter([]),
  ],
}).catch((err) => console.error(err));
