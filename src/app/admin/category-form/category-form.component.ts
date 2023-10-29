import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  category: Category = { name: '' };
  constructor(private categoryService: CategoryService) {}

  createCategory(formTemplateVar: NgForm) {
    console.log(formTemplateVar);

    this.categoryService.createCategory(formTemplateVar.value);
    formTemplateVar.reset();
  }
}
