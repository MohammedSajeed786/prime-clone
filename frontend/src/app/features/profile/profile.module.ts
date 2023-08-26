import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {User,UserCircle2,Mail,PenSquare,Pencil, LucideAngularModule} from "lucide-angular"
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    LucideAngularModule.pick({User,UserCircle2,Mail,PenSquare,Pencil})

  ]
})
export class ProfileModule { }
