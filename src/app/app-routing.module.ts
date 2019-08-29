import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'viewdetails', loadChildren: './viewdetails/viewdetails.module#ViewdetailsPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'analytics', loadChildren: './analytics/analytics.module#AnalyticsPageModule' },
  { path: 'pastbookings', loadChildren: './pastbookings/pastbookings.module#PastbookingsPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'awaiting', loadChildren: './awaiting/awaiting.module#AwaitingPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'graphs', loadChildren: './graphs/graphs.module#GraphsPageModule' },
  { path: 'past-b', loadChildren: './past-b/past-b.module#PastBPageModule' },
  { path: 'the-map', loadChildren: './the-map/the-map.module#TheMapPageModule' },
  { path: 'onboarding', loadChildren: './onboarding/onboarding.module#OnboardingPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
