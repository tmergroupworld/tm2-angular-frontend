import { Component, OnInit, InjectionToken } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router:Router,
              private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      if(params['registered'] === 'success') {
       
        this.notifyMessage = 'You have been successfuly registered, you can login now!';
      }
    })
  }


  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, 
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isInvalidForm(fieldName: string | number): boolean {
    return this.loginForm.controls[fieldName].invalid && 
          (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched) 
  }

  isRequired(fieldName: string | number): boolean {
    return this.loginForm.controls[fieldName].errors?.['required'] 
  }


  login(){
    this.auth.login(this.loginForm.value).subscribe(
      (InjectionToken)=> {
       
        this.router.navigate(['/tmers']);
      },
      (errorResponse) => {
        
          this.errors = [errorResponse.error.detail];
          
         
      })

  }

}
