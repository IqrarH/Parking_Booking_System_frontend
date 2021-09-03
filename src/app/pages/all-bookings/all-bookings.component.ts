import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  bookingData : any = [];
  page = 1;
  totalRecords !: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(){
    this.apiService.get(`/bookings/showAll?page=${this.page}`)
    .subscribe(res => {
      console.log(res);
      this.bookingData = res.data;
      this.totalRecords = res.totalDocs;
    })
  }

  onPageChange(pageNo: number) {
    this.page = pageNo;
    this.getAllBookings();
  }

}
