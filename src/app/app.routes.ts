import { Routes } from '@angular/router';
import { RouterTestComponent } from './component/router-test/router-test.component';

export const routes: Routes = [
    {path: '**', component: RouterTestComponent}, //http://mysite.com
];
