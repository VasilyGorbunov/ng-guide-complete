import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {map} from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticate = false;
  private userSub!: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<AppState>) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(
        map(authState => authState.user)
      )
      .subscribe(user => {
      this.isAuthenticate = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
