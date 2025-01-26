import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/contentDisplay/page-generator/page-generator.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { ContentWithSideMenuComponent } from './components/contentDisplay/content-with-side-menu/content-with-side-menu.component';
import { ContentBlankPageComponent } from './components/contentDisplay/content-blank-page/content-blank-page.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', 
    component: PageGeneratorComponent, 
    title: "Home",
    data: {
      menu: true,
        pageContent: [{"contentType": "contentPage", "divId": "homeContentOne", "contentFile": "content/pages/home/home-content-one.html"},
                      {"contentType": "contentPage", "divId": "homeContentTwo", "contentFile": "content/pages/home/home-content-two.html"}],
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
                    },{
                      path: 'image-gallery',
                      title: 'Image Gallery',
                      component: PageGeneratorComponent,
                      data: { menu: true, 
                              pageContent: [{"contentType": "contentPage", "divId": "contentBlockOne", "contentFile": "content/pages/cms-information/component-samples/imageGallery/imageGallery.html"},
                              {"contentType": "imageGallery", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/imageGallery/page-image-gallery-images.json"}], },
                    },{
                      path: 'image-display',
                      title: 'Image Display',
                      component: PageGeneratorComponent,
                      data: { menu: true, 
                              pageContent: [{"contentType": "contentPage", "divId": "s", "contentFile": "content/pages/cms-information/component-samples/imageDisplay/imageDisplay.html"},
                              {"contentType": "imageDisplay", "divId": "contentBlockTwo", "contentFile": "content/pages/cms-information/component-samples/imageDisplay/page-image-display.json"}], },
                    },
                  ],
        },
      ],
    },
    {path: 'blog', 
    component: BlogListComponent,
    title: "Blog",
    data: {
        menu: true,
        pageContent: [{"contentFile": "assets/content/pages/my-blog/blog-posts.json"}],
      }
    },
    { path: 'blog/:id',
      component: BlogDetailsComponent }, // Blog details route with dynamic ID
    {path: '**', component: PageGeneratorComponent}
]; 
