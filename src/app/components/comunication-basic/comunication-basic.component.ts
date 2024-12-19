import { Component } from '@angular/core';

interface SampleInterface
{
  id: string;
  title: string;
}

@Component({
  selector: 'app-comunication-basic',
  standalone: true,
  imports: [],
  templateUrl: './comunication-basic.component.html',
  styleUrl: './comunication-basic.component.css'
})
export class ComunicationBasicComponent {

  sampleInterface: SampleInterface[] = [
    { 
      id: "100",
      title: "Title One"
    },
    {
      id: "200",
      title: "Title Two"
    }
  ]

  //Create a verible with information
  sampleText: string = "This is sample text";

}
