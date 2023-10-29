import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
// import { DataTableResource } from 'angular-4-data-table';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  products_filtered: Product[] = [];
  subscription: Subscription;
  // tableResource: DataTableResource<Product>;
  // items: Product[] = [];
  // itemCount: number;

  constructor(private productService: ProductService, private router: Router) {
    console.log(
      this.productService.getProductKey(0).then((x) => console.log(x))
    );
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.products_filtered = products;
      // this.initializeTable(products);
    });
  }

  // private initializeTable(products: Product[]) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }

  filter(query: string) {
    // let filteredProducts = query
    //   ? this.products.filter((p) =>
    //       p.title.toLowerCase().includes(query.toLowerCase())
    //     )
    //   : this.products;
    //this.initializeTable(filteredProducts);
    let filter = this.products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    this.products_filtered = query ? filter : this.products;
  }
  // onTrack(index: number, product: Product) {
  //   return product ? product.price : undefined;
  // }

  navigateToProduct(index: number) {
    this.productService
      .getProductKey(index)
      .then((key) => this.router.navigate([`/admin/products/${key}`]));
  }
  delete(index: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService
      .getProductKey(index)
      .then((key) => this.productService.delete(key));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}
}
