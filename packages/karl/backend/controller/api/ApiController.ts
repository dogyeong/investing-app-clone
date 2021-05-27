import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';

@Controller({ path: '/api' })
export class ApiController {
  constructor(@Inject(UserService) private userService: UserService, @Inject(AuthService) private authService: AuthService) {}

  @GetMapping({ path: '/user' })
  public async getUser(request: Request, response: Response) {
    try {
      // 토큰 인증자리
      // 토큰 인증되면 클라이언트에 user 정보 보내기
      const token = request.cookies['jwt-token'];

      // 토큰이 없으면
      if (!token) {
        response.sendStatus(401);

        return false;
      }

      const decodedToken = this.authService.verifyToken(token);
      const user = await this.userService.loginUserByEmail(decodedToken);

      if (user) {
        response.status(200).send(user);

        return true;
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  @PostMapping({ path: '/user' })
  public async createUser(reqeust: Request, response: Response) {
    try {
      const user = await this.userService.createUser(reqeust.body);

      if (user) {
        response.sendStatus(200);

        return true;
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }

  @PostMapping({ path: '/auth/email' })
  public async loginUserByEmail(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByEmail(request.body);
      const token = this.authService.issueToken(user);

      if (token) {
        response.cookie('jwt-token', token, { expires: new Date(Date.now() + 9000000), httpOnly: true });
        response.status(200).send(user);

        return true;
      }

      response.sendStatus(401);
    } catch (error) {
      console.log(error);
      response.status(401).json(error);
    }
  }
}