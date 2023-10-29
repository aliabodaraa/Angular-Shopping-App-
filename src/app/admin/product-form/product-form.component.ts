import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Observable, take } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  id: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    console.log(this.categoryService.getCategoryKey(0).then((x) => console));
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => (this.product = p as Product));
  }

  save(product: Product) {
    console.log(product);
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    if (this.id) this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {}
}
