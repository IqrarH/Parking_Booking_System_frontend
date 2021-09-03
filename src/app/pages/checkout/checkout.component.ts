import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  bill : any = 0;
  fine : any = 0;
  vehicleNumber:string="";

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  checkout(){

    this.apiService.get('/bookings/calculateReceipt/'+this.vehicleNumber)
      .subscribe((res:any) => {
        console.log(res);
        if(res.status === 203){
          Swal.fire({icon:'error', title: `${res.message}`});
          this.bill = 0;
          this.vehicleNumber = "";
        }else{
          this.bill = res.bill;
          this.vehicleNumber = "";
        }
      },
      err => {
        
      });

      this.apiService.get('/bookings/calculateFine/'+this.vehicleNumber)
      .subscribe((res:any) => {
        console.log(res);
        if(res.status === 203){
          this.fine = 0;
          this.vehicleNumber = "";
        }else{
          this.fine = res.fine;
          this.vehicleNumber = "";
        }
      },
      err => {
        Swal.fire({icon: 'warning', title: "Please Enter Vehicle Number!!!"});
      });
  }

}
