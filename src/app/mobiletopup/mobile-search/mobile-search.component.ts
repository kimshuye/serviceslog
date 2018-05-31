import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { MobiletopupService, Phonenumbers, Lbpncus } from '../mobiletopup.service';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-mobile-search',
  templateUrl: './mobile-search.component.html',
  styleUrls: ['./mobile-search.component.css']
})
export class MobileSearchComponent implements OnInit {

  lbpncus:Lbpncus = new Lbpncus();
  
  displayedColumns = [ 
      // "select",
    "numberid","telnet","name"
  ];
  
  // dataSource:MatTableDataSource<Phonenumbers>;
  // dataSource:ExampleDataSource = new ExampleDataSource(this.pNum.getPnums());
  dataSource:MatTableDataSource<Phonenumbers> = new MatTableDataSource<Phonenumbers>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // displayedColumns = ['position', 'name', 'weight', 'symbol'];  

  selection:SelectionModel<Phonenumbers>;
  
  constructor(
    public motop:MobiletopupService
  ) { 
    this.motop.getPnum().subscribe(snap => {
      const data:Phonenumbers[] = snap;
      
      // this.dataSource = new ExampleDataSource(data);
      this.dataSource.data = (data);
    })
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Phonenumbers>(allowMultiSelect, initialSelection);
    
  }

  ngOnInit() {    
    this.dataSource.paginator = this.paginator;    
    // this.motop.curPncus.subscribe(message => this.selectedPn = message);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  //Action when select a Movie in List item
  selectedPn: any;

  @HostListener('onSelect')
  onSelect(selPn: Phonenumbers): void {
    // Angular Firebase
    this.selectedPn = selPn;
    // const selpn = {
    //   numberid:selPn.numberid,
    //   telnet:selPn.telnet,
    //   name:selPn.name
    // }

    this.motop.translatePn(this.selectedPn);
    console.log(`selected Phone numbers = ${JSON.stringify(this.selectedPn)}`);
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Phonenumbers[] = [];

export class ExampleDataSource extends MatTableDataSource<Phonenumbers> {
  /** Stream of data that is provided to the table. */
  constructor(data:Phonenumbers[]){
    super(data);
  }
}

