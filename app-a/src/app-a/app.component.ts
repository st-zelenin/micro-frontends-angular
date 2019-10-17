import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root-a',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() set externalRoute(value) {
    console.log('a externalRoute', value);
    if (this.router.url !== value) {
      this.router.navigate([value]);
    }
  }

  constructor(private router: Router, location: Location) {
    location.onUrlChange((url, state) => {
      console.log('url', url, 'state', state);
    });
  }

  @Input() store: any;

  // tslint:disable-next-line: no-output-rename
  @Output('routechanged') routeChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(({ url }: NavigationEnd) => {
        this.routeChanged.emit(url);
      });
  }
}
