import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { Category } from '../models/category';
import { map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    //const queryFn: QueryFn = (ref) => ref.child('name');
    // console.log(
    //   this.db
    //     .list<Category>('/categories')
    //     .valueChanges()
    //     .subscribe((x) => console.log(x))
    // );

    return this.db.list<Category>('/categories').valueChanges();
  }

  createCategory(category: Category) {
    return this.db.list<Category>('/categories').push(category);
  }

  getCategoryKey(index: number) {
    return new Promise<string>((resolve) => {
      this.db
        .list('/categories')
        .snapshotChanges()
        .pipe(
          take(1),
          map((changes: any[]) => {
            //we need to subscibe to take the key
            const courseId = changes[index].payload.key;
            return courseId;
          })
        )
        .subscribe((courseId) => {
          resolve(courseId);
        });
    });
  }
}
