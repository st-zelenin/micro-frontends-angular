import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-b',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() store: any;

  ngOnInit(): void {
    // this.store.title += ' updated in B!!!';
  }
}
