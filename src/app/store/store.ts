import { InjectionToken } from '@angular/core';
import { createStore, Store, compose, StoreEnhancer } from 'redux';

import { BookeyState } from './models/state.interface';
import { counterReducer as reducer } from './models/reducer';

export const AppStore = new InjectionToken('App.store');

const devtools: StoreEnhancer<BookeyState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

export function createAppStore(): Store<BookeyState> {
  return createStore<BookeyState>(
    reducer,
    compose(devtools)
  );
}

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];