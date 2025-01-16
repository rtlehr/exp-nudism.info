import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';

export const routes: Routes = [
    {path: '**', component: PageGeneratorComponent}, //http://mysite.com
];
