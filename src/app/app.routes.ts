import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { LocationinfoComponent } from './components/locationinfo/locationinfo.component';
import { PackagelistComponent } from './components/packagelist/packagelist.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { DetailspageComponent } from './components/detailspage/detailspage.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {path:'', component: LayoutComponent, children: [
        {path: '', component:HomeComponent},
        {path: 'home', component:HomeComponent},
        {path: 'location', component: LocationinfoComponent},
        {path: 'packagelist', component: PackagelistComponent},
        {path: 'aboutus', component: AboutusComponent},
        {path: 'tripDetails', component: DetailspageComponent},
        {path: 'contact', component: ContactComponent},
        {path: '**', component: NotfoundComponent},
    ]},

];

