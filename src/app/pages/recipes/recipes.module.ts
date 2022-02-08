import { MatButtonModule } from '@angular/material/button';
import { MockRecipesService } from './services/mock-recipes.service';
import { RecipesService } from './services/recipes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientsComponent } from './components/recipe/ingredients/ingredients.component';
import { AddRecipeButtonComponent } from './components/add-recipe-button/add-recipe-button.component';
import { AddRecipeDialog } from './components/add-recipe-dialog/add-recipe-dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeComponent,
    IngredientsComponent,
    AddRecipeButtonComponent,
    AddRecipeDialog,
    RecipeFormComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [{ provide: RecipesService, useClass: MockRecipesService }],
})
export class RecipesModule {}
