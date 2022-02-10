import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: 'details/:id',
        component: RecipeDetailsComponent,
      },
      {
        path: 'add',
        component: AddRecipeComponent,
        // canDeactivate: [UnsavedGuard],
      },
      {
        path: 'edit/:id',
        component: EditRecipeComponent,
        // canDeactivate: [UnsavedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
