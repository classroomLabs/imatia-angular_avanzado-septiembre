import { Component } from "@angular/core";

@Component({
  selector: "app-about",
  template: `
    <article>
      <h1>âšī¸ About us</h1>
      <p>Astro Bookings, fly to the universe!</p>
      <nav>
        <a routerLink="history">đ Our history</a>
        <a routerLink="mission">â°ī¸ Our mission</a>
      </nav>
      <footer>
        <!-- â ī¸ linked to children property of this route -->
        <router-outlet></router-outlet>
      </footer>
    </article>
  `,
  styles: [],
})
export class AboutPage {}
