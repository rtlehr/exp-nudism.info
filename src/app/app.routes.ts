import { Routes } from '@angular/router';
import { PageGeneratorComponent } from './components/contentDisplay/page-generator/page-generator.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { ContentWithSideMenuComponent } from './components/contentDisplay/content-with-side-menu/content-with-side-menu.component';
import { ContentBlankPageComponent } from './components/contentDisplay/content-blank-page/content-blank-page.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { 
    path: 'home', 
    component: PageGeneratorComponent, 
    title: "Home",
    data: {
      menu: true,
      pageContent: [
        { contentType: "contentPage", divId: "homeContentOne", contentFile: "content/pages/home/home-content-one.html" },
        { contentType: "contentPage", divId: "homeContentTwo", contentFile: "content/pages/home/home-content-two.html" }
      ]
    }
  },
  
  { 
    path: 'cms-information', 
    component: ContentBlankPageComponent,
    title: "CMS Information",
    data: {
      menu: true,
      pageContent: []
    },
    children: [
      { 
        path: 'cms-components',
        component: ContentWithSideMenuComponent,
        title: 'CMS Components',
        data: {
          menu: true, 
          pageContent: [
            { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/news/news.html" },
            { contentType: "news", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/news/page-news.json" }
          ]
        },
        children: [
          { 
            path: 'news',
            component: PageGeneratorComponent,
            title: 'News',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/news/news.html" },
                { contentType: "news", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/news/page-news.json" }
              ]
            }
          },
          { 
            path: 'faq',
            component: PageGeneratorComponent,
            title: 'FAQs',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/faqs/faqs.html" },
                { contentType: "faq", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/faqs/page-faq.json" }
              ]
            }
          },
          { 
            path: 'image-gallery',
            component: PageGeneratorComponent,
            title: 'Image Gallery',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/imageGallery/imageGallery.html" },
                { contentType: "imageGallery", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/imageGallery/page-image-gallery-images.json" }
              ]
            }
          },
          { 
            path: 'image-display',
            component: PageGeneratorComponent,
            title: 'Image Display',
            data: {
              menu: true, 
              pageContent: [
                { contentType: "contentPage", divId: "contentBlockOne", contentFile: "content/pages/cms-information/component-samples/imageDisplay/imageDisplay.html" },
                { contentType: "imageDisplay", divId: "contentBlockTwo", contentFile: "content/pages/cms-information/component-samples/imageDisplay/page-image-display.json" }
              ]
            }
          }
        ]
      }
    ]
  },
  
  { 
    path: 'blog',
    component: BlogListComponent, 
    title: "Blog",
    data: {
      menu: true,
      pageContent: [
        { contentFile: "assets/content/pages/blog/blog-posts.json" }
      ]
    }
  },
  
  { 
    path: 'blog/:url',
    component: BlogDetailsComponent 
  },
  
  { 
    path: '**', 
    component: PageGeneratorComponent 
  }
];

