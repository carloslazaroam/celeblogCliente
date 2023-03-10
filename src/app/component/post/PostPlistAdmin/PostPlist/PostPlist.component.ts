import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/model/post.interface';
import { PostService } from 'src/app/service/Post.service';

@Component({
  selector: 'app-PostPlist',
  templateUrl: './PostPlist.component.html',
  styleUrls: ['./PostPlist.component.css']
})
export class PostPlistComponent implements OnInit {

  responseFromServer: PostResponse;

  strTermFilter: string = "";
  numberOfElements: number = 5;
  page: number = 0;
  totalPages: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  generated: number;
  generados: boolean = false;
  msg: string = "";

  constructor(
    private oPostService: PostService,
  ) { 
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oPostService.getPostPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection, 0)
      .subscribe({
        next: (resp: PostResponse) => {
          console.log(resp)
          this.responseFromServer = resp;
          this.totalPages = resp.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.getPage();
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.page = 0;
    this.getPage();
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

}
