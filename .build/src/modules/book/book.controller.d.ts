import { CrudController } from '@nestjsx/crud';
import { Book } from '../../entity';
import { BookService } from './book.service';
export declare class BookController implements CrudController<Book> {
    readonly service: BookService;
    constructor(service: BookService);
}
