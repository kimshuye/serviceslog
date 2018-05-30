import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Phonenumbers } from '../mobiletopup.service';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss']
})
export class MobileDashboardComponent implements OnInit {
  
  // dataSource:MatTableDataSource<Phonenumbers>;
  // @Input()@ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  constructor() { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
  }

}
