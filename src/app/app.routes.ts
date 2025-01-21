import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { RoutetestComponent } from './components/test/routetest/routetest.component';
import { RoutetesttwoComponent } from './components/test/routetesttwo/routetesttwo.component';

export const routes: Routes = [
    {path: 'home', 
    component: PageGeneratorComponent,
    title: "Home",
    data: {
        pageContent: [{"contentType": "contentPage", "contentFile": "content/pages/home/home-content.html"}],
      }
    },
    {path: 'routetest', 
    component: RoutetestComponent,
    title: "RouteTest",
    data: {
        pageContent: [{"contentType": "contentPage", "contentFile": "content/pages/home/home-content.html"}],
      }
    },
    {path: 'routetesttwo', 
    component: RoutetesttwoComponent,
    title: "RouteTesttwo",
    data: {
        pageContent: [{"contentType": "contentPage2", "contentFile": "content/pages/home/home-content.html2"}],
      }
    },
    {path: '**', component: PageGeneratorComponent}
]; 
