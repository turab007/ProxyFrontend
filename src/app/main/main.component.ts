import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ProxyService } from '../proxy.service';
import { Proxy } from './proxy';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['ip', 'port', 'provider', 'basicTest', 'testDate', 'firstfound', 'lastfound'];

  data: Proxy[] | null;
  dataSource;
  isLoadingResults = true;



  constructor(private proxyService: ProxyService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {


    this.proxyService.getProxies().subscribe(res => {
      // this.resultsLength = res.length;
      this.dataSource = new MatTableDataSource(res);
      console.log('this is dta', this.data);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }
}

