import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Test',
      'A test recipe',
      'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg',
      [
        new Ingredient('Onions', 5),
        new Ingredient('Tomatoes', 10)
      ]
    ),
    new Recipe(
      'Test 2',
      'A test 2 recipe',
      'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg',
      [
        new Ingredient('Chocolate', 5),
        new Ingredient('Cream', 10)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
