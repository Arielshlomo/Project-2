import { Routes } from '@angular/router';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryTableComponent },
    { path: 'category-form', component: CategoryFormComponent },
    { path: 'category-form/:id', component: CategoryFormComponent },
];
