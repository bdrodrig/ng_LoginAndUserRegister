import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  public authService = inject(AuthService);
}
