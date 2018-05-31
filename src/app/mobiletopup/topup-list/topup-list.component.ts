import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Phonenumbers, MobiletopupService, Lbpncus } from '../mobiletopup.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topup-list',
  templateUrl: './topup-list.component.html',
  styleUrls: ['./topup-list.component.css']
})
export class TopupListComponent implements OnInit {

  lbpncus:Lbpncus = new Lbpncus();

  showFiller = false;

  chSide = true;

  @Input() selePninput = {
    numberid:"",
    name:"",
    telnet:""
  }

  numberid;
  
  selectedPn:Phonenumbers;

  pnFormat:string;

  myControl: FormControl = new FormControl();
  options = ['ais', 'dtac', 'true'];
  filteredOptions: Observable<string[]>;

  constructor(
    public motop:MobiletopupService
  ) { 
    // this.motop.curPncus.subscribe(message => {
    //   this.selectedPn = message as Phonenumbers;
    // });
    this.motop.change.subscribe(snap =>{
      this.selePninput = snap;
    });

  }

  ngOnInit() {
    
  }

  onKey(){
    var pn = this.selePninput.numberid ;

    this.pnFormat = pn.substring(0,3) 
      + ((pn.length > 3) ? '-' + pn.substring(3,6) : '' )
      + ((pn.length > 6) ? '-' + pn.substring(6,10): '' );

  }

  
  

}
