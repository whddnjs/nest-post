import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Matches, MinLength } from "class-validator";

export namespace UserDTO {

  export namespace Request {

    export class Password {

      @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
      @MinLength(8, { message: '비밀번호는 최소 8자리 이상 입력해 주세요.' })
      password: string;
    }
  }

  export namespace Response {

    @Exclude()
    export class User {

      @Expose()
      id: number;

      @Expose()
      username: string;

      @Expose()
      nickname: string;

      @Expose()
      createdAt: Date;

      @Expose()
      updatedAt: Date;
    }
  }
}
