import { Component, OnInit } from '@angular/core';

import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE,OwlDateTimeFormats } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { Moment } from 'moment';

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
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
      // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
      // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
      // here, due to limitations of our example generation script.
      {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},

      {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS},
  ],
})
export class HomePageComponent implements OnInit {

  // public date = new FormControl(moment());

  public dateTime = new Date();

  today = Date.now();
  fixedTimezone = '2015-06-15T09:03:01+0700';

  dp;

  dt;

  constructor() { 

  }

  ngOnInit() {
    console.log(moment(new Date(), "YYYY-MM-DD HH:mm:ss Z",'th').format()); // see timezone
    console.log(moment(new Date()).format("YYYY-MM-DDTH:mm:ss "));
    console.log(moment(new Date(), "YYYY-MM-DD HH:mm:ss Z",'th').unix());
    console.log(moment(new Date(), "YYYY-MM-DD HH:mm:ss Z",'th').unix().valueOf());
    
  }

  updateDate(date){    
    console.log(date);
  }

}
