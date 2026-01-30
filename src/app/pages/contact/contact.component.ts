import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  
  private accessKey = 'ef5963ba-3085-4b64-86d7-2f54a636b0ce'; 
  
  // NEW: Control the popup
  showSuccessModal = false;
  isSubmitting = false;

  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const payload = {
      ...this.formData,
      access_key: this.accessKey,
      subject: `New Contact from ${this.formData.name} (Aplyra App)`
    };

    this.http.post('https://api.web3forms.com/submit', payload).subscribe({
      next: (response) => {
        // SUCCESS: Show the custom popup instead of alert
        this.showSuccessModal = true;
        
        this.formData = { name: '', email: '', message: '' }; 
        this.isSubmitting = false;
      },
      error: (error) => {
        alert('Something went wrong. Please check your connection.');
        this.isSubmitting = false;
      }
    });
  }

  // Close the popup
  closeModal() {
    this.showSuccessModal = false;
  }
}