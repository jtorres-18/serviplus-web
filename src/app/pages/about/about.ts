import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {}
