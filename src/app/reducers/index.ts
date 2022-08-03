import { ActionReducerMap } from '@ngrx/store';
import {shoppingListReducer, ShoppingListState} from "../shopping-list/store/shopping-list.reducer";
import {authReducer, AuthState} from "../auth/store/auth.reducer";


export const rootReducer = {};

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState
};


export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
