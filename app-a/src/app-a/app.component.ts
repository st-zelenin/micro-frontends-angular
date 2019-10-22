import { Location } from '@angular/common';
import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root-a',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  @Input() store: any;

  @Input() set externalRoute(value) {
    console.log('a externalRoute', value);
    if (this.router.url !== value) {
      this.router.navigate([value]);
    }
  }

  // tslint:disable-next-line: no-output-rename
  @Output('routechanged') routeChanged = new EventEmitter<string>();
  // tslint:disable-next-line: no-output-rename
  @Output('appinitialized') appInitialized = new EventEmitter();

  constructor(private router: Router, location: Location) {
    location.onUrlChange((url, state) => {
      console.log('url', url, 'state', state);
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(({ url }: NavigationEnd) => {
        this.routeChanged.emit(url);
      });

    this.appInitialized.emit();
  }

  ngDoCheck() {
    // possible issue: I do not know,
    // but the host app received this event only upon second ngDoCheck here.
    // I have to notify the host app in order to obtain initial store.
    // the event is being subscribed in the host app with { once: true }
    this.appInitialized.emit();
  }
}
