import { Injectable } from '@angular/core';
import { Category } from '../interface/Category.interface';
import { sampleCategory } from '../sample/Data';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesMap: Map<number, Category> = new Map<number, Category>();

  constructor(public router: Router, private _snackBar: MatSnackBar) {
    sampleCategory.forEach(
      (category) => {
        if (!this.categoriesMap.has(category.numericIdentifier)) {
          this.categoriesMap.set(category.numericIdentifier, category);
        }
      }
    )
  }

  addCategory(category: Category): void {
    category.numericIdentifier = this.generateNumericIdentifier();
    category.lastModificationDate = new Date();
    this.categoriesMap.set(category.numericIdentifier, category);
    this.router.navigate(['/category']);
    this.openSnackBar("Category Added Successfully !", 'snackbar-green')
  }

  deleteCategory(numericIdentifier: number): void {
    if (this.categoriesMap.has(numericIdentifier)) {
      this.categoriesMap.delete(numericIdentifier);
      this.openSnackBar('Category Deleted Successfully !', 'snackbar-green')
    }
    else {
      this.openSnackBar("Category Doesn't Exist !", 'snackbar-red')
    }
  }

  updateCategory(category: Category): void {
    if (this.categoriesMap.has(category.numericIdentifier)) {
      category.lastModificationDate = new Date();
      this.categoriesMap.set(category.numericIdentifier, category);
    }
    this.router.navigate(['/category']);
    this.openSnackBar('Category Updated Successfully !', 'snackbar-green')
  }

  getAllCategories(): Category[] {
    return Array.from(this.categoriesMap.values());
  }

  getCategoryById(numericIdentifier: number): Category | undefined {
    let selectedCategory = this.categoriesMap.get(numericIdentifier);
    if (selectedCategory) {
      return selectedCategory;
    }
    this.openSnackBar("Category With Id Doesn't Exist ! ", "snacbar-red");
    this.router.navigate(['/category']);
    return undefined;
  }

  openSnackBar(message: string, className?: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: className
    });
  }

  private generateNumericIdentifier(): number {
    return Math.floor(Math.random() * 1000);
  }
}
