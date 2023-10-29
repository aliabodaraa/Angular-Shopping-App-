import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { enviroment } from 'src/enviroments/enviroment.prod';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginValidator } from './login/login.validators';
import { RegisterComponent } from './register/register.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';

const checkUserLoggingStatus: CanActivateFn = (
  routeTo: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate(state.url);
};
const checkUserIsAdmin: CanActivateFn = () => {
  return inject(AdminAuthGuard).canActivate();
};

const routes: Routes = [
  //Guests Routes
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Auth Routes
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [checkUserLoggingStatus],
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [checkUserLoggingStatus],
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [checkUserLoggingStatus],
  },

  //Admin Routes
  {
    path: 'admin/categories/new',
    component: CategoryFormComponent,
    canActivate: [checkUserLoggingStatus, checkUserIsAdmin],
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [checkUserLoggingStatus, checkUserIsAdmin],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [checkUserLoggingStatus, checkUserIsAdmin],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [checkUserLoggingStatus, checkUserIsAdmin],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [checkUserLoggingStatus, checkUserIsAdmin],
  },

  //Notfound Routes
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    RegisterComponent,
    ProductFormComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
