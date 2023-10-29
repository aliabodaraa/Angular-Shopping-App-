import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    return this.db.list<Product>('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').valueChanges();
  }

  get(productId: string) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId: string, product: Product) {
    return this.db.object<Product>('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object<Product>('/products/' + productId).remove();
  }

  getProductKey(index: number) {
    return new Promise<string>((resolve) => {
      this.db
        .list('/products')
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
