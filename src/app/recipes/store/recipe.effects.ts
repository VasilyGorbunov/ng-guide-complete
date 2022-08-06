import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import * as RecipesActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(`https://ng-complete-guide-b7607-default-rtdb.firebaseio.com/recipes.json`)
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );
}
