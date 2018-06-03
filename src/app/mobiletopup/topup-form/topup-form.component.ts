import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Phonenumbers, MobiletopupService, LbMobilePn } from '../mobiletopup.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE,OwlDateTimeFormats } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { startWith, map } from 'rxjs/operators';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_MOMENT_DATE_TIME_FORMATS: OwlDateTimeFormats = {
    parseInput: 'YYYY-MM-DD HH:mm:ss',
    fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
    datePickerInput: 'MM/YYYY',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-topup-form',
  templateUrl: './topup-form.component.html',
  styleUrls: ['./topup-form.component.css'],
  providers: [
      // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
      // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
      // here, due to limitations of our example generation script.
      {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},

      {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS},
  ],
})
export class TopupFormComponent implements OnInit {

  lbpncus:LbMobilePn = new LbMobilePn();

  showFiller = false;

  chSide = true;

  // public datetimeAt = new Date();

  selePninput = {
    datetimeat:new Date(),
    numberid:"",
    name:"",
    telnet:"",
    topup:10,
    charge: 5,
    primalfee: 0,
    status:"ค้างชำระ"
  }

  numberid;
  
  selectedPn:Phonenumbers;

  pnFormat:string;

  myControl: FormControl = new FormControl();  
  options = ['ais', 'dtac', 'true'];
  filteredOptions: Observable<string[]>;
  
  statControl: FormControl = new FormControl();
  statValue = ['ค้างชำระ', 'ชำระแล้ว' ];
  filteredStats: Observable<string[]>;

  constructor(
    public motop:MobiletopupService
  ) { 
    // this.motop.curPncus.subscribe(message => {
    //   this.selectedPn = message as Phonenumbers;
    // });
    this.motop.translate.subscribe(snap =>{
      this.selePninput = snap;
      this.selePninput.datetimeat = new Date();
      this.onKey();
    });

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    ); 

    this.filteredStats = this.statControl.valueChanges.pipe(
      startWith(''),
      map(val => this.statFilter(val))
    ); 
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  statFilter(val: string): string[] {
    return this.statValue.filter(stat => stat.indexOf(val) === 0);
  }

  onKey(){
    var pn = this.selePninput.numberid ;

    this.pnFormat = pn.substring(0,3) 
      + ((pn.length > 3) ? '-' + pn.substring(3,6) : '' )
      + ((pn.length > 6) ? '-' + pn.substring(6,10): '' );

  }

  submitForm(){

    this.motop.saveMobileTopup(this.selePninput);

    console.log(this.selePninput);

    console.log(this.selePninput.datetimeat);

    this.selePninput = {
      datetimeat:new Date(),
      numberid:"",
      name:"",
      telnet:"",
      topup:10,
      charge: 5,
      primalfee: 0,
      status:"ค้างชำระ"
    }

    this.onKey();
  }

  

}
