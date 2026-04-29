import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css'
})
export class ServiceDetailComponent {

  serviceId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }
}