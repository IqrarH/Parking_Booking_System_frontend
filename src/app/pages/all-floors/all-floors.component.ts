import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-floors',
  templateUrl: './all-floors.component.html',
  styleUrls: ['./all-floors.component.css']
})
export class AllFloorsComponent implements OnInit {

  floorData : any = [];
  page = 1;
  totalRecords !: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllFloors();
  }

  checkSpots(row: any){
    this.apiService.get('/floors/checkAvailableSpots/'+row.floorNumber)
    .subscribe(res => {
      if(res.status === 200){
        Swal.fire({icon:'success', title:`${res.message}`});
      }else{
        Swal.fire({icon:'error', title:`${res.message}`});
      }
    },
    err => {

    })
  }

  getAllFloors(){
    this.apiService.get(`/floors/showAll?page=${this.page}`)
    .subscribe(res => {
      console.log(res);
      this.floorData = res.data;
      this.totalRecords = res.totalDocs;
    })
  }

  onPageChange(pageNo: number) {
    this.page = pageNo;
    this.getAllFloors();
  }
}
