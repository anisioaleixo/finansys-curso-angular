import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErroMessages: string[] = null;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  //private methods
  private setCurrentAction() {
    this.route.snapshot.url[0].path == "new"
      ? this.currentAction = "new"
      : this.currentAction = "edit"
  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }
  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
        .subscribe(
          (category) => {
            this.category = category;
            this.categoryForm.patchValue(category) //binds loaded category data to CategoryForm
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        )
    }
  }
  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = "Cadastro de Nova Categoria";
    } else {
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }
}
