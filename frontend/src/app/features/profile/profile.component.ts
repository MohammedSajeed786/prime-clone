import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProfileService } from './profile.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Subscription } from 'rxjs';

interface User {
  email: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userDetail!: User;
  userDetails: {
    id: string;
    title: string;
    icon: string;
    color: string;
  }[] = [
    {
      id: 'email',
      title: 'Email Address',
      icon: 'mail',
      color: '#5691f0',
    },
    {
      id: 'username',
      title: 'Username',
      icon: 'user',
      color: '#56f099',
    },
    {
      id: 'fullName',
      title: 'Name',
      icon: 'user-circle-2',
      color: '#ffffff',
    },
  ];

  profileImage!: string;
  profileName!: string;
  editProfile = false;
  selectedFile: File | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.profileService.getProfile().subscribe({
      next: (res) => {
        this.userDetail = res.data;
        this.profileImage = res.data.profilePicture;
        this.profileName = res.data.fullName;
      },
      error: (err) =>
        this.toastService.setToastData('error', err.error.message),
    }));
  }

  getValue(id: string) {
    return this.userDetail[id as keyof User];
  }

  fileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const fileSize = this.selectedFile.size; // File size in bytes
      const fileType = this.selectedFile.type; // MIME type

      if (!(fileType === 'image/png' || fileType === 'image/jpeg')) {
        this.toastService.setToastData(
          'error',
          'image must be of jpeg/png format only'
        );
      }
      if (fileSize > 3 * 1024 * 1024) {
        this.toastService.setToastData(
          'error',
          'image must have size less than 3MB'
        );
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  onSave() {
    if (this.selectedFile)
      this.subscriptions.push(
        this.profileService.updateProfilePicture(this.selectedFile).subscribe({
          next: (res) => {
            this.userDetail.profilePicture = res.data;
            this.selectedFile = null;
          },
        })
      );
    if (this.profileName != this.userDetail.fullName) {
      this.subscriptions.push(
        this.profileService.updateFullName(this.profileName).subscribe({
          next: (res) => {
            this.userDetail.fullName = res.data;
          },
        })
      );
    }
    this.editProfile = !this.editProfile;
  }

  onCancel() {
    this.profileImage = this.userDetail.profilePicture;
    this.profileName = this.userDetail.fullName;
    this.selectedFile = null;
    this.editProfile = !this.editProfile;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      if (sub) sub.unsubscribe();
    });
  }
}
