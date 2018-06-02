import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith , map } from 'rxjs/operators';

import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import { MobiletopupService , Phonenumbers, LbMobilePn } from '../mobiletopup.service';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {

  lbpncus:LbMobilePn = new LbMobilePn();

  // @Input()@Output() newPn:Phonenumbers;

  newPn = {
    numberid:"",
    name:"",
    telnet:""
  }

  pnFormat:string;

  myControl: FormControl = new FormControl();
  options = ['ais', 'dtac', 'true'];
  filteredOptions: Observable<string[]>;

  pNumDatas:Phonenumbers[];

  displayedColumns = [];
  dataSource:MatTableDataSource<Phonenumbers>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private pNum:MobiletopupService,    
  ) { 
    this.pNum.getPnum().subscribe(snap => {
      this.pNumDatas = snap;
    })

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    ); 

  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  submitForm(){
    // if(this.newPn.numberid.length === 10 ) return;

    this.pNum.addPhonenum(this.newPn);

    console.log(this.newPn);

    this.newPn.numberid = "";
    this.newPn.name = "";
    this.newPn.telnet = "";
    this.onKey();
  }

  onKey(){
    var pn = this.newPn.numberid ;

    this.pnFormat = pn.substring(0,3) 
      + ((pn.length > 3) ? '-' + pn.substring(3,6) : '' )
      + ((pn.length > 6) ? '-' + pn.substring(6,10): '' );

  }

}
