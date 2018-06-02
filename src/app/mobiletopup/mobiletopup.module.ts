import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SelectionModel } from '@angular/cdk/collections';

import { MobiletopupService } from './mobiletopup.service';
import { TopupListComponent } from './topup-list/topup-list.component';
import { TopupDetailComponent } from './topup-detail/topup-detail.component';
import { MobileListComponent } from './mobile-list/mobile-list.component';
import { MobileSearchComponent } from './mobile-search/mobile-search.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { MobileDashboardComponent } from './mobile-dashboard/mobile-dashboard.component';

//Material design modules
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MouseWheelDirective } from '../core/mousewheel.directive';
import { TopupFormComponent } from './topup-form/topup-form.component';


@NgModule({
  imports: [
    CommonModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserTransferStateModule,    
    BrowserAnimationsModule,
    NoopAnimationsModule,

    CdkTableModule,
    // SelectionModel,

    OwlDateTimeModule, 
    OwlNativeDateTimeModule, 

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    
  ],
  declarations: [
    
    MouseWheelDirective,

    TopupListComponent, 
    TopupDetailComponent, 
    MobileListComponent, 
    MobileSearchComponent, 
    MobileDetailComponent, 
    MobileDashboardComponent, TopupFormComponent
  ],
  providers: [MobiletopupService]
})
export class MobiletopupModule { }
