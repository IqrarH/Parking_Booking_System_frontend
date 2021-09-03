import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService, UserType } from '../core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  form!: FormGroup;
  errors: any= null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ps: NgxPermissionsService
  ) {
    this.form = this.formBuilder.group({
      'name':['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onChangeType();
    this.route.url.subscribe(data => {
      console.log(data);
      let authType = data[data.length - 1].path;
      this.isLogin = authType === 'login'
      this.onChangeType();
    });
  }

  onChangeType() {
    if (!this.isLogin)
    {
      this.form.addControl('name', new FormControl('', [Validators.required]));
    }else {
      this.form.removeControl('name');
    }
  }

  get f() {return this.form.controls}

  submitForm() {
    this.errors = null;
    console.log('IN SUBMIT');
    const credentials = this.form.value;
    console.log(credentials);
    this.userService.attemptAuth(this.isLogin, credentials).subscribe
    (
      (res: any) =>
      {
        console.log(res);
        let route = '';
        if(res.status === 200) {
          if(res.data && res.data.role === UserType.user){
            route = '/main';
          } else if(res.data && res.data.role === UserType.admin){
            route = '/main';
          }
        }
        this.ps.loadPermissions([res.data.role]);
        this.router.navigate([route])
      },
      (err:any) =>
      {
        console.log(err);
        window.scroll(0,0);
        if(err && err == 'Unauthorized') {
          this.errors = ['Invalid Email or Password'];
        } else if(err && err.code === 401.1 ) {
          this.router.navigate(['/auth/otp', this.f.email.value, 1])
        } else if(err && err.code === 401.2) {
          this.errors = [err.message];
        }  else if(err && err.code === 400.1) {
          this.errors = ['Email already exist'];
        } else if(err && err.code === 422) {
          this.errors = err.moreInfo.errors.map((e: any) => e.msg);
        }
      }
    );
  }

}
