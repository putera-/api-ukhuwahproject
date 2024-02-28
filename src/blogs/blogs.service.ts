import { Injectable } from '@nestjs/common';
import { Blog } from 'interfaces/blog.interface';

@Injectable()
export class BlogsService {
    private readonly blogs: Blog[] = []

    create(blog: Blog): Blog {
        this.blogs.push(blog);

        return this.blogs.find(b => b.id == blog.id);
    }

    findAll(): Blog[] {
        return this.blogs;
    }
}
