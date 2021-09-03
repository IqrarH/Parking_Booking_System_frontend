import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  vehicleNumber : string = "";
  bookedBy : string = "";
  startingTime : string = "";
  duration : string = "";
  floorNumber : string = "";
  spotNumber : string = "";
  isActive !: Boolean;
  isLoading : Boolean = true;
  bookingForm !: FormGroup;
  canActivate : Boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      vehicleNumber: [{value: "", disabled: true}],
      bookedBy: [{value: "", disabled: true}],
      startingTime: [''],
      duration: [],
      floorNumber: [{value: "", disabled: true}],
      spotNo: [{value: "", disabled: true}],
      isActive: [{value: "", disabled: true}]
    }) 
}

  viewBooking(){
    this.apiService.get('/bookings/viewBooking/'+this.vehicleNumber)
      .subscribe((res:any) => {
        console.log(res);
        if(res.status === 200){
          
          this.duration = res.data.bookingDuration;
          this.spotNumber = res.data.bookedSpot;
          this.isActive = res.data.isActive;
          this.startingTime = res.data.startingTime;
          this.bookedBy = res.data.user.name;
          this.floorNumber = res.data.floor.floorNumber;
        }else{
          Swal.fire({icon:'error', title: `${res.message}`});
          this.vehicleNumber = "";
          this.duration = "";
          this.spotNumber = "";
          this.isActive = false;
          this.startingTime = "";
          this.bookedBy = "";
          this.floorNumber = "";
        }
      },
      err => {
        
      });
  }

  onEdit(){
    this.apiService.get('/bookings/viewBooking/'+this.vehicleNumber)
      .subscribe((res:any) => {
        console.log(res);
        if(res.status === 200){
          this.bookingForm.controls['vehicleNumber'].setValue(this.vehicleNumber);
          this.bookingForm.controls['bookedBy'].setValue(res.data.user.name);
          this.bookingForm.controls['startingTime'].setValue(res.data.startingTime);
          this.bookingForm.controls['duration'].setValue(res.data.bookingDuration);
          this.bookingForm.controls['floorNumber'].setValue(res.data.floor.floorNumber);
          this.bookingForm.controls['spotNo'].setValue(res.data.bookedSpot);
          if(res.data.isActive){
            this.bookingForm.controls['isActive'].setValue("Yes");
          }else if(!res.data.isActive){
            this.bookingForm.controls['isActive'].setValue("No");
          }
        }else{
          console.log('wrong');
          Swal.fire({icon:'error', title: `${res.message}`});
          let ref = document.getElementById('close');
          ref?.click();
          
        }
      },
      err => {
    
      });
  }

  updateBooking(){
    const body = {
      newBookingDuration: this.bookingForm.value.duration,
    }
    this.apiService.put('/bookings/updateBooking/'+this.vehicleNumber, body)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status === 200){
        Swal.fire({icon:'success',title:`${res.message}`})
      }else{
        Swal.fire({icon:'error',title:`${res.message}`})
      }
      let ref = document.getElementById('cancel');
      ref?.click();
      this.bookingForm = this.formBuilder.group({
        vehicleNumber: [{value: "", disabled: true}],
        bookedBy: [{value: "", disabled: true}],
        startingTime: [''],
        duration: [],
        floorNumber: [{value: "", disabled: true}],
        spotNo: [{value: "", disabled: true}],
        isActive: [{value: "", disabled: true}]
      })
    },
    err => {

    })
  }

}
