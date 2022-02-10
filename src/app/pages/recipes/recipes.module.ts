import { environment } from './../../../environments/environment.prod';
import { RouterModule } from '@angular/router';
import { SearchEventService } from './services/search-event.service';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { ConfirmDialogModule } from './../../shared/confirm-dialog/confirm-dialog.module';
import { MatButtonModule } from '@angular/material/button';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientsComponent } from './components/recipe-details/ingredients/ingredients.component';
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
import { SearchComponent } from './components/search/search.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { PreparationTimePipe } from './pipes/preparation-time.pipe';
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
    RecipeDetailsComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    PreparationTimePipe,
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
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  providers: [
    RecipesService,
    // { provide: RecipesService, useClass: MockRecipesService },
    { provide: 'API_URL', useValue: environment.apiURL },
    RecipeEventService,
    SearchEventService,
  ],
})
export class RecipesModule {}
