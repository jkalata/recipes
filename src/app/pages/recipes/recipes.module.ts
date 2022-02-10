import { SearchEventService } from './services/search-event.service';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { ConfirmDialogModule } from './../../shared/confirm-dialog/confirm-dialog.module';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientsComponent } from './components/recipe/ingredients/ingredients.component';
import { AddRecipeButtonComponent } from './components/add-recipe-button/add-recipe-button.component';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteRecipeButtonComponent } from './components/delete-recipe-button/delete-recipe-button.component';
import { EditRecipeButtonComponent } from './components/edit-recipe-button/edit-recipe-button.component';
import { RecipeEventService } from './services/recipe-event.service';
import { AddIngredientButtonComponent } from './components/recipe-form/add-ingredient-button/add-ingredient-button.component';
import { RemoveIngredientButtonComponent } from './components/recipe-form/remove-ingredient-button/remove-ingredient-button.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { SearchComponent } from './components/search/search.component';
@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeComponent,
    IngredientsComponent,
    AddRecipeButtonComponent,
    RecipeDialogComponent,
    RecipeFormComponent,
    DeleteRecipeButtonComponent,
    EditRecipeButtonComponent,
    AddIngredientButtonComponent,
    RemoveIngredientButtonComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ConfirmDialogModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    ErrorTailorModule,
    CdkAccordionModule,
    MatTooltipModule,
  ],
  providers: [
    // RecipesService,
    { provide: RecipesService, useClass: MockRecipesService },
    RecipeEventService,
    SearchEventService,
  ],
})
export class RecipesModule {}
