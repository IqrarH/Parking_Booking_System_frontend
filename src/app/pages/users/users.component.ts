import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService, JwtService, UserService } from 'src/app/core';
import { Vehicle } from 'src/app/core/models';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  vehicles: Vehicle[] = [];
  vehicleForm !: FormGroup;
  bookingForm !: FormGroup;
  floorForm !: FormGroup;
  userForm !: FormGroup;
  vehicle !: Vehicle;
  vehicleType !: String;
  userData : any = [];
  page = 1;
  totalRecords !: string;
  user = this.userService.getCurrentUser();

  constructor(
    public _authService: JwtService, 
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.vehicleForm = this.formBuilder.group({
      ownerEmail: [{value: this.user.email, disabled: true}],
      vehicleNumber: ['']
    })

    this.bookingForm = this.formBuilder.group({
      ownerEmail: [{value: this.user.email, disabled: true}],
      vehicleNumber: [''],
      bookingTime: [''],
      bookingDuartion: [''],
      floorNumber: [''],
      spotNo: [''],
    })

    this.floorForm = this.formBuilder.group({
      floorNumber: [''],
    })

    this.userForm  = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    })

    this.getAllUsers();
  }

  getAllUsers(){
    this.apiService.get('/users/showAll')
    .subscribe(res => {
      console.log(res);
      this.userData = res.data;
      this.totalRecords = res.totalRecords;
    })
  }

  postVehicleDetails(){
    const body = {
      owner: this.user.email,
      vehicleNumber: this.vehicleForm.value.vehicleNumber
    }
    
    this.apiService.postVehicle('/vehicles/addVehicle',body)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status === 200){
        Swal.fire({icon:'success',title:`${res.message}`})
      }else{
        Swal.fire({icon:'warning',title:`${res.message}`})
      }
      let ref = document.getElementById('cancel');
      ref?.click();
      this.vehicleForm = this.formBuilder.group({
        ownerEmail: [{value: this.user.email, disabled: true}],
        vehicleNumber: ['']
      })
    },
    err => {
      alert("Unable to add!!! " + err);
    });
  }

  postBookingDetails(){
    const body = {
      customer: this.user.email,
      vehicle: this.bookingForm.value.vehicleNumber,
      bookingTime: this.bookingForm.value.bookingTime,
      bookingDuration: this.bookingForm.value.bookingDuartion,
      floor: this.bookingForm.value.floorNumber,
      spotNo: this.bookingForm.value.spotNo
    }

    console.log(body);

    this.apiService.postBooking('/bookings/addBooking', body)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status === 200){
        Swal.fire({icon: 'success',title:`${res.message}`})
      }else{
        Swal.fire({icon:'warning',title:`${res.message}`})
      }
      let ref = document.getElementById('cancel');
      ref?.click();
      this.bookingForm = this.formBuilder.group({
        ownerEmail: [{value: this.user.email, disabled: true}],
        vehicleNumber: [''],
        bookingTime: [''],
        bookingDuartion: [''],
        floorNumber: [''],
        spotNo: [''],
      })
    },
    err => {
      alert("Unable to add!!! " + err);
    });
  }

  postFloorDetails(){
    const body = {
      floorNumber: this.floorForm.value.floorNumber,
    }
    this.apiService.post('/floors/addFloor', body)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status === 200){
        Swal.fire({icon: 'success',title:`${res.message}`})
      }else{
        Swal.fire({icon:'error',title:`${res.message}`})
      }
      let ref = document.getElementById('cancel');
      ref?.click();
      this.floorForm = this.formBuilder.group({
        floorNumber: [''],
      })
    },
    err => {
      alert("Unable to add!!! " + err);
    });
  }

  postUserDetails(){
    const body = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    }

    this.apiService.post('/users/addAdmin', body)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status === 200){
        Swal.fire({icon: 'success',title:`${res.message}`})
      }else{
        Swal.fire({icon:'error',title:`${res.message}`})
      }
      let ref = document.getElementById('cancel');
      ref?.click();
      this.userForm  = this.formBuilder.group({
        name: [''],
        email: [''],
        password: [''],
      })
    },
    err => {
      alert("Unable to add!!! " + err);
    });

  }


}
