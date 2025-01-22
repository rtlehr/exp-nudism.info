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
      menu: true,
        pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/faqs/faqs.html"},
          {"contentType": "faq", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/faqs/page-faq.json"}],
      }
    },
    {path: 'cms-information', 
    component: PageGeneratorComponent,
    title: "CMS Information",
    data: {
        menu: true,
        pageContent: [{"contentType": "contentPage", "contentFile": "content/pages/home/home-content.html"}],
      },
      children: [
        {
          path: 'sub-service',
          title: 'Sub-Service',
          component: RoutetestComponent,
          data: { menu: true,
                  pageContent: [{"contentType": "contentPage", "contentFile": "content/pages/home/home-content.html"}], },
        },
      ],
    },
    {path: 'my-blog', 
    component: BlogListComponent,
    title: "My-Blog",
    data: {
        menu: true,
        pageContent: [{"contentFile": "assets/content/pages/my-blog/blog-posts.json"}],
      }
    },
    {path: '**', component: PageGeneratorComponent}
]; 
