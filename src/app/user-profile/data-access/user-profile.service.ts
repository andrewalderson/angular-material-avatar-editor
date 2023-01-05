import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  id: string;
  name: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private _profile = new BehaviorSubject<UserProfile>({
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    picture: faker.internet.avatar(),
  });

  readonly profile$ = this._profile.asObservable();
}
