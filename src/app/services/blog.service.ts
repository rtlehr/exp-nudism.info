import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    private blogs: Blog[] = [
        {
            id: '1',
            title: 'Understanding Angular',
            content: 'Angular is a platform for building web applications...',
            author: 'John Doe',
            tags: ['Angular', 'Web Development'],
            featured: true,
            publicationDate: new Date('2025-01-10'),
            imageUrl: 'assets/images/angular.png',
        },
        {
            id: '2',
            title: 'Top 5 Angular Libraries',
            content: 'When building Angular apps, some libraries stand out...',
            author: 'Jane Smith',
            tags: ['Angular', 'Libraries'],
            featured: false,
            publicationDate: new Date('2025-01-12'),
            imageUrl: 'assets/images/libraries.png',
        },
    ];

    constructor() {}

    // Get all blogs
    getAllBlogs(): Blog[] {
        return this.blogs;
    }

    // Get a single blog by ID
    getBlogById(id: string): Blog | undefined {
        return this.blogs.find(blog => blog.id === id);
    }

    // Add a new blog
    addBlog(blog: Blog): void {
        this.blogs.push(blog);
    }

    // Update an existing blog
    updateBlog(updatedBlog: Blog): void {
        const index = this.blogs.findIndex(blog => blog.id === updatedBlog.id);
        if (index !== -1) {
            this.blogs[index] = updatedBlog;
        }
    }

    // Delete a blog
    deleteBlog(id: string): void {
        this.blogs = this.blogs.filter(blog => blog.id !== id);
    }

    // Get featured blogs
    getFeaturedBlogs(): Blog[] {
        return this.blogs.filter(blog => blog.featured);
    }

    // Get blogs by tag
    getBlogsByTag(tag: string): Blog[] {
        return this.blogs.filter(blog => blog.tags.includes(tag));
    }
}
