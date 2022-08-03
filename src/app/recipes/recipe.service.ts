import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import {AppState} from "../reducers";

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Steake',
  //     'This a tasty steake',
  //     'https://st2.depositphotos.com/1001069/11492/i/450/depositphotos_114929332-stock-photo-grilled-sliced-beef-steak.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(
  //     'Schnitzel',
  //     'This a tasty Schnitzel',
  //     'https://www.krassever.ru/statics/thumbs/840x560/022021-03022021x4c75c3e3-84056080.jpg',
  //     [
  //       new Ingredient('Farche Meat', 1),
  //       new Ingredient('Tomatoes', 2)
  //     ]),
  //   new Recipe(
  //     'BBQ Shashlyk',
  //     'This a tasty Shashlyk',
  //     'http://skarvit.ru/wp-content/uploads/2022/05/2_marinad-010.jpg',
  //     [
  //       new Ingredient('Slice Meat', 7),
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private store: Store<AppState>) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
