import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    return this.http.put(
      'https://ng-recipe-book-4e886.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  async fetchRecipes() {
    const token: string = await this.authService.getToken();
    this.http.get('https://ng-recipe-book-4e886.firebaseio.com/recipes.json?auth=' + token)
      .pipe(
        map((response: Recipe[]) => {
          const recipes: Recipe[] = response;
          for (const recipe of recipes) {
            if (! recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe(
        (response: Recipe[]) => {
          const recipes: Recipe[] = response;
          console.log(response);
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
