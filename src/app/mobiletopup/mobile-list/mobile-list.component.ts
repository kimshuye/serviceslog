import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith , map } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {

  myControl: FormControl = new FormControl();
  options = ['ais', 'dtac', 'true'];
  filteredOptions: Observable<string[]>;
  
  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
