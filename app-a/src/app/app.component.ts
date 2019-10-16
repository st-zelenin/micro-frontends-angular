import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root-a',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() set location(value) {
    console.log('location A', value);
    this.router.navigate([value]);
  }

  constructor(private router: Router) {}

  @Input() store: any;

  @Output('routechanged') routeChanged = new EventEmitter<{
    event: any;
    skip: boolean;
  }>();

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(event => {
        this.routeChanged.emit({ event, skip: true });
      });
  }
}
