import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastManagementService } from 'src/app/services';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
  host: {'class': 'toast-container position-fixed bottom-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastsComponent implements OnInit {

  autohide: boolean = true;

  constructor( public toastService: ToastManagementService) { }

  ngOnInit(): void {
  }

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

}
