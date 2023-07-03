import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user.type';
import { User as UserModel } from 'src/app/shared/models/user.model';
import { getUser } from 'src/app/core/store/actions/user.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  user: User = new UserModel({});

  constructor(private store: Store<any>) { }

  ngOnInit() {
    // console.log(this.store.select((store: any) => store.user));
    this.store.select('user').subscribe((data) => {
      console.log(data);
      this.user = data;
    });
    // this.user = this.store.dispatch(getUser());
  }
}
