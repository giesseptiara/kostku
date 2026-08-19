import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  loading = false;
  error = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error = 'Email dan password wajib diisi.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
  next: (response) => {
    this.auth.saveToken(response.data.token);
    this.router.navigate(['/admin/dashboard']);
  },

  error: (error) => {
    console.error('Login gagal:', error);

    this.error =
      error?.error?.message ||
      'Email atau password salah.';

    this.loading = false;
  },
});
  }
}