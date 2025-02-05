import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-card.component.html',
  styleUrl: './business-card.component.scss'
})
export class BusinessCardComponent { 
  people = [
    {
      name: "John Doe",
      photo: "./assets/images/motorcycle.png",
      businessPhone: "123-456-7890",
      cellPhone: "987-654-3210",
      email: "john.doe@example.com",
      socialMedia: [
        { icon: "fa-facebook", url: "https://facebook.com/johndoe" },
        { icon: "fa-twitter", url: "https://twitter.com/johndoe" }
      ],
      bio: "John is a software developer with 10 years of experience."
    },
    {
      name: "Jane Smith",
      photo: "./assets/images/motorcycle.png",
      businessPhone: "234-567-8901",
      cellPhone: "876-543-2109",
      email: "jane.smith@example.com",
      socialMedia: [
        { icon: "fa-linkedin", url: "https://linkedin.com/in/janesmith" },
        { icon: "fa-instagram", url: "https://instagram.com/janesmith" }
      ],
      bio: "Jane is a graphic designer passionate about branding and UI/UX."
    },
    {
      name: "Michael Brown",
      photo: "./assets/images/motorcycle.png",
      businessPhone: "345-678-9012",
      cellPhone: "765-432-1098",
      email: "michael.brown@example.com",
      socialMedia: [
        { icon: "fa-github", url: "https://github.com/michaelbrown" },
        { icon: "fa-twitter", url: "https://twitter.com/michaelbrown" }
      ],
      bio: "Michael is a data scientist specializing in AI and machine learning."
    }
  ];
}
