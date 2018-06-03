import { Component, OnInit, Input } from '@angular/core';
import { MobiletopupService, LbMobilePn } from '../mobiletopup.service';

@Component({
  selector: 'app-topup-detail',
  templateUrl: './topup-detail.component.html',
  styleUrls: ['./topup-detail.component.css']
})
export class TopupDetailComponent implements OnInit {

  lbpncus:LbMobilePn = new LbMobilePn();

  @Input() motop: any;

  constructor(
    public motopServ:MobiletopupService
  ) { }

  ngOnInit() {
  }

}
