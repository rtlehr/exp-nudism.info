import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/page-generator/page-generator.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { ContentWithSideMenuComponent } from './components/contentDisplay/content-with-side-menu/content-with-side-menu.component';
import { ContentBlankPageComponent } from './components/contentDisplay/content-blank-page/content-blank-page.component';

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
    component: ContentBlankPageComponent,
    title: "CMS Information",
    data: {
        menu: true,
        pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/faqs/faqs.html"}],
      },
      children: [
        {
          path: 'cms-components',
          title: 'CMS Components',
          component: ContentWithSideMenuComponent,
          data: { menu: true, 
                  pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/news/news.html"},
                  {"contentType": "news", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/news/page-news.json"}], },
                  children: [
                    {
                      path: 'news',
                      title: 'News',
                      component: PageGeneratorComponent,
                      data: { menu: true, 
                              pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/news/news.html"},
                              {"contentType": "news", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/news/page-news.json"}], },
                    },{
                      path: 'faq',
                      title: 'FAQs',
                      component: PageGeneratorComponent,
                      data: { menu: true, 
                              pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/faqs/faqs.html"},
                              {"contentType": "faq", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/faqs/page-faq.json"}], },
                    },
                  ],
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
