import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";

export namespace AuthDto {

  export namespace Request {

    export class SignUp {

      @IsNotEmpty({ message: '아이디를 입력해 주세요.' })
      username: string;

      @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
      @MinLength(6, { message: '비밀번호는 최소 6자리 이상 입력해 주세요.' })
      password: string;

      @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
      nickname: string;
    }

    export class SignIn {

      @IsNotEmpty({ message: '아이디를 입력해 주세요.' })
      username: string;

      @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
      password: string;
    }
  }

  export namespace Response {

    @Exclude()
    export class AccessToken {

      @Expose()
      accessToken: string;

    }
  }
}