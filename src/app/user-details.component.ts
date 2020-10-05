import {
  Component,
  ElementRef,
  Inject,
  VERSION,
  ViewChild
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}
  userDetail: any;
  followers: any[];
  repos: any[];
  ngOnInit() {
    const login = this.route.snapshot.paramMap.get('login');
    const url = "https://api.github.com/users/" + login;
    const followers_url = `https://api.github.com/users/${login}/followers`;
    const repos_url = `https://api.github.com/users/${login}/repos`;
    this.http.get(url).subscribe((res: any) => {
      this.userDetail = res;
    });
    this.http.get(followers_url).subscribe((res: any) => {
      this.followers = res;
    });
    this.http.get(repos_url).subscribe((res: any) => {
      this.repos = res;
    });

  }
}
