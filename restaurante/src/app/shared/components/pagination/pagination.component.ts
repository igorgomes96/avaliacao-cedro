import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagedResult } from '../../models/paged-result';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  pages: number[] = [];
  _paginationInfo: PagedResult<any>;

  @Input()
  set paginationInfo(pageResult: PagedResult<any>) {
    this._paginationInfo = pageResult;
    this.pages = [];
    if (pageResult && pageResult.pageCount > 1) {
      for (let i = 1; i <= pageResult.pageCount; i++) {
        this.pages.push(i);
      }
    } else if (pageResult && pageResult.currentPage > pageResult.pageCount) {  // Se a página corrente for maior que a quantidade de páginas
      this._paginationInfo.currentPage = pageResult.pageCount;
      this.alteraPagina.emit(this._paginationInfo.currentPage);
    }
  }

  get paginationInfo(): PagedResult<any> {
    if (!this._paginationInfo) {
      return {
        currentPage: 0,
        pageCount: 0,
        pageSize: 0,
        result: [],
        totalRecords: 0
      };
    }
    return this._paginationInfo;
  }


  @Output() alteraPagina = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

  anterior() {
    if (this.paginationInfo.currentPage > 1) {
      this.paginationInfo.currentPage--;
      this.alteraPagina.emit(this.paginationInfo.currentPage);
    }
  }

  proximo() {
    if (this.paginationInfo.currentPage < this.paginationInfo.pageCount) {
      this.paginationInfo.currentPage++;
      this.alteraPagina.emit(this.paginationInfo.currentPage);
    }
  }

  mudaPagina(page: number) {
    if (this.paginationInfo.currentPage !== page) {
      this.paginationInfo.currentPage = page;
      this.alteraPagina.emit(page);
    }
  }

}
