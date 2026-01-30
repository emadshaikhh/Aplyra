import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './cta.html',
  styleUrls: ['./cta.scss']
})
export class CtaComponent {}