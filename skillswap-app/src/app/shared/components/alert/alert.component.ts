import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * Reusable alert banner component.
 * Usage: <app-alert [message]="errorMsg" type="danger" (dismissed)="errorMsg = null"></app-alert>
 */
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: string = 'danger'; // Bootstrap types: danger, success, warning, info
  @Output() dismissed = new EventEmitter<void>();
}
