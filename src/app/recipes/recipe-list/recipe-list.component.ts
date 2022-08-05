import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeChangedSub = new Subscription();
  recipes!: Recipe[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.recipeChangedSub = this.store
      .select('recipes')
      .pipe(
        map(recipesState => recipesState.recipes)
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.recipeChangedSub.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
