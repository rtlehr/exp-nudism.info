import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { RoutetestComponent } from './components/test/routetest/routetest.component';
import { RoutetesttwoComponent } from './components/test/routetesttwo/routetesttwo.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';

export const routes: Routes = [
    {path: 'home', 
    component: PageGeneratorComponent, 
    title: "Home",
    data: {
        pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/faqs/faqs.html"},
          {"contentType": "faq", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/faqs/page-faq.json"}],
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
    {path: 'my-blog', 
    component: BlogListComponent,
    title: "My-Bloge",
    data: {
        pageContent: [{"contentFile": "assets/content/pages/my-blog/blog-posts.json"}],
      }
    },
    {path: '**', component: PageGeneratorComponent}
]; 
