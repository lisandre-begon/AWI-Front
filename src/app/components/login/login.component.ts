import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage = '';
  loginForm: FormGroup;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      pseudo: ['', Validators.required],
      mot_de_passe: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/gestionnaire']);
      }
    });
  }

  onSubmit(): void {
    this.authService
      .login(this.loginForm.value.pseudo, this.loginForm.value.mot_de_passe)
      .subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.authService.setToken(response.token);
          this.router.navigate(['/gestionnaire']);
        },
        error: (err) => {
          this.errorMessage = 'Pseudo ou mot de passe incorrect';
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
