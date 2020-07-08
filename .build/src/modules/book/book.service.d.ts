import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Book } from '../../entity';
export declare class BookService extends TypeOrmCrudService<Book> {
    constructor(repo: any);
}
