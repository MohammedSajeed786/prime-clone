import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  of,
  distinctUntilChanged,
  switchMap,
  Subject,
} from 'rxjs';
import { Router } from '@angular/router';
import { Dialog } from 'src/app/shared/interfaces/Dialog';
import { SearchService } from 'src/app/features/search/search.service';
import { Response } from 'src/app/shared/interfaces/Response';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';
import { SearchCheck } from 'lucide-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}
  isLoggedIn: boolean = false;
  isLoggedInSubscription!: Subscription;
  showDialog = false;
  dialogText!: Dialog;
  showSearch = false;
  inputFocused = false;
  searchSubject = new Subject();
  topSearchedMovies: Movie[] = [];
  search = '';
  searchSubscription!: Subscription;

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.getIsLoggedIn$().subscribe({
      next: (val) => {
        // console.log('inside header ' + val);
        this.isLoggedIn = val;
      },
    });

    //subscribing to searchSubject inorder to use debounceTime()
    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (searchValue: any) => {
          // console.log(searchValue);
          this.fetchSearchData(searchValue);
        },
      });
  }

  fetchSearchData(searchValue: string) {
    this.topSearchedMovies = [];
    if (searchValue != '') {
      this.searchSubscription = this.searchService
        .getAllSearchedMovies(searchValue)
        .subscribe({
          next: (res: Response) => {
            let data = res.data;
            for (
              var i = 0;
              this.topSearchedMovies.length < 5 && i < data.length;
              i++
            ) {
              if (data[i].matchedWith == 'title')
                this.topSearchedMovies.push(data[i]);
            }
          },
        });
    }
  }

  logoutClicked() {
    this.dialogText = {
      message: 'are you sure you want to logout?',
      okText: 'yes',
      cancelText: 'no',
    };
    this.showDialog = true;
  }
  logout() {
    this.showDialog = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  searchChanged() {
    let searchValue = this.search.trim();
    this.searchSubject.next(searchValue);
  }

  loadSearchPage() {
    let searchValue = this.search.trim();
    if (searchValue != '') {
      this.showSearch = false;
      this.searchService.clearFilters();
      this.router.navigate([
        '/search',
        searchValue.replaceAll(' ', '-').replaceAll('/', '-'),
      ]);
    }
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }
}
