import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Phonenumbers, MobiletopupService } from '../mobiletopup.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-topup-list',
  templateUrl: './topup-list.component.html',
  styleUrls: ['./topup-list.component.css']
})
export class TopupListComponent implements OnInit {

  showFiller = false;

  chSide = true;

  constructor(
    public motop:MobiletopupService
  ) { }

  ngOnInit() {
    this.motop.curPncus.subscribe(message => this.selectedPn = message);
  }

  selectedPn:Phonenumbers;
  

}
