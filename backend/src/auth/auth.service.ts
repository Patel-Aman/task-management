import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return "You've logged in";
  }

  signup() {
    return "You've signed up";
  }
}
