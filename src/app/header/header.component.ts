import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
