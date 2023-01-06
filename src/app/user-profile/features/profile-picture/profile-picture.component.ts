import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';
import { UserProfileService } from '../../data-access/user-profile.service';

@Component({
  selector: 'matx-profile-picture',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent {
  readonly _userProfileService = inject(UserProfileService);
}
