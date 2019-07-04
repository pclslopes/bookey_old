import { NgModule } from '@angular/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule, MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule,MatListModule, MatMomentDateModule, MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule,
    MatButtonToggleModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule, MatMomentDateModule, MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule,
    MatButtonToggleModule
  ],
})
export class AppMaterialModule { }