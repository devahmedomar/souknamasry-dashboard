import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { StoresComponent } from './pages/stores/stores.component';
import { AddStoreComponent } from './pages/add-store/add-store.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/add', component: AddOrderComponent },
      { path: 'stores', component: StoresComponent },
      { path: 'stores/add', component: AddStoreComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/add', component: AddRoleComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }, // ✅ optional: redirect any unknown path
];
