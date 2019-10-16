import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root-a',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() store: any;
  @Input() set location(value) {
    console.log('location A', value);
    this.router.navigate([value]);
  }

  @Output('routechanged') routeChanged = new EventEmitter<{
    event: any;
    skip: boolean;
  }>();

  constructor(private router: Router) {}

  hashHandler() {
    console.log('The hash has changed! A');
    console.log(window.location);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(event => {
        this.routeChanged.emit({ event, skip: true });
      });
  }
}
