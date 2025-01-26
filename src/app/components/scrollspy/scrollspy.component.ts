import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrollspy',
  standalone: false,
  
  templateUrl: './scrollspy.component.html',
  styleUrl: './scrollspy.component.scss'
})
export class ScrollspyComponent {
  @Input() navs: string[] = [];
}
