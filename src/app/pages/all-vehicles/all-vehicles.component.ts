import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent implements OnInit {

  vehicleData : any = [];
  page = 1;
  totalRecords !: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  deleteVehicle(row: any) {
    this.apiService.delete('/vehicles/removeVehicle/'+row.vehicleNumber)
    .subscribe(res => {
      if(res.status === 200){
        Swal.fire({icon:'success', title:`${res.message}`});
        this.getAllVehicles();
      }else{
        Swal.fire({icon:'error', title:`${res.message}`});
      }
    },
    err =>{

    })
  }

  getAllVehicles(){
    this.apiService.get(`/vehicles/showAll?page=${this.page}`)
    .subscribe(res => {
      console.log(res);
      this.vehicleData = res.data;
      this.totalRecords = res.totalDocs;
    })
  }

  onPageChange(pageNo: number) {
    this.page = pageNo;
    this.getAllVehicles();
  }

}
