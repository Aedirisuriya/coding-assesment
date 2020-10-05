import { Component, ElementRef, Inject, VERSION, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent {
  users: any[] = [];
  timerId: any = null;
  lastPage: number = 0;
  allUsers = [];
  filter = '';
  constructor(private http: HttpClient) {}

   ngOnInit() {
        window.addEventListener('scroll', () => { this.onScroll(); }, true); //third parameter
        this.getRecordByPage(0);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', ()=> { this.onScroll() }, true);
    }


  getRecordByPage(page) {
    const url = "https://api.github.com/users?since=" + page;
    this.http.get(url).subscribe((res: any) => {
      this.allUsers.push(...res);
      this.lastPage = res[res.length - 1].id;
      this.timerId = null;
      this.users = this.allUsers.filter(el => el.login.startsWith(this.filter));
    });
  }

  onSearch(event){
    console.log("print event....", event.target.value);
    this.filter = event.target.value;
    this.users = this.allUsers.filter(el => el.login.startsWith(event.target.value));
  }

  onScroll() {
    const el = window.document.scrollingElement;

    if (el.scrollHeight < el.scrollTop + el.clientHeight + 50) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        this.getRecordByPage(this.lastPage);
      }, 1000);
    }
  }
}
