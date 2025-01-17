import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { JsonLoaderComponent } from './components/test/json-loader/json-loader.component';

bootstrapApplication(JsonLoaderComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(err));
