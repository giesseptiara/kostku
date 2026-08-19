import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}