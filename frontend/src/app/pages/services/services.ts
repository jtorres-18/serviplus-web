import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Service {
  id: number;
  name: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './services.html'
})
export class ServicesComponent implements OnInit {

  services: Service[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Service[]>('assets/data/services.json')
      .subscribe(data => {
        this.services = data;
      });
  }

  addFavorite(id: number) {
    const fav: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (!fav.includes(id)) {
      fav.push(id);
      localStorage.setItem('favorites', JSON.stringify(fav));
    }
  }
}