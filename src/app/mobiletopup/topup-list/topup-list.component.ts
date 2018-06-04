import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Phonenumbers, MobiletopupService, LbMobilePn, MobileTopup } from '../mobiletopup.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { OwlDateTimeComponent, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE,OwlDateTimeFormats } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { startWith, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
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
  selector: 'app-topup-list',
  templateUrl: './topup-list.component.html',
  styleUrls: ['./topup-list.component.css'],
  providers: [
      // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
      // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
      // here, due to limitations of our example generation script.
      {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},

      {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS},
  ],
})
export class TopupListComponent implements OnInit {

  showFiller = false;

  chSide = true;

  lbpncus:LbMobilePn = new LbMobilePn();

  myControl: FormControl = new FormControl();  
  options = ['ais', 'dtac', 'true'];
  filteredOptions: Observable<string[]>;
  
  statControl: FormControl = new FormControl();
  statValue = ['ค้างชำระ', 'ชำระแล้ว' ];
  filteredStats: Observable<string[]>;

  motops: Observable<any[]>;

  constructor(
    public motopServ:MobiletopupService
  ){
    const initialSelection = [];
    const allowMultiSelect = false;
    this.selection = new SelectionModel<MobileTopup>(allowMultiSelect, initialSelection);
  }

  ngOnInit(){
    this.motops = this.motopServ.getMotopsData();
    this.motops.subscribe(snap =>{
      const data = snap;
      data.map(a => {
        a.datetimeat = (new Date( a.datetimeat.seconds*1000) ) ;
        // console.log(a.datetimeat);
      });  
      this.dataSource.data = (data);
    })

    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;
     // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    this.filteredStats = this.statControl.valueChanges.pipe(
      startWith(''),
      map(val => this.statFilter(val))
    ); 
  }

  statFilter(val: string): string[] {
    return this.statValue.filter(stat => stat.indexOf(val) === 0);
  }

  displayedColumns = [ 
    // "select",
    // "id",
    "datetimeat",
    "numberid",
    "telnet",
    "name",
    "topup",    
    "primalfee",
    "charge",
    "status",
    "deletebutton"
  ];
  

  dataSource:MatTableDataSource<MobileTopup> = new MatTableDataSource<MobileTopup>(ELEMENT_DATA);
  data: MobileTopup[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  phoneFormat(phonenumber:string){
    var pn = phonenumber ;

    return pn.substring(0,3) 
      + ((pn.length > 3) ? '-' + pn.substring(3,6) : '' )
      + ((pn.length > 6) ? '-' + pn.substring(6,10): '' );

  }
  
  deleBl = false;

  ondele(element:any){
    this.motopServ.deleMotop(element.id);
  }

  selection:SelectionModel<MobileTopup>;

  onupdate(element:any){
    const updateMotop = {
      datetimeat:element.datetimeat,
      numberid: element.numberid,
      telnet: element.telnet,
      name: element.name,
      topup:element.topup,
      charge:element.charge,
      primalfee:element.primalfee,
      status:element.status
    }
    this.motopServ.updateMotop(element.id,updateMotop);
    this.selection.clear();

    // console.log(element.id);
    // console.log(updateMotop);
    
  }

}

const ELEMENT_DATA: MobileTopup[] = [];