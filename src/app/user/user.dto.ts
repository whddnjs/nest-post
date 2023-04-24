import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export namespace UserDTO {

  export namespace Request {

    export class Nickname {

      @IsNotEmpty({ message: '변경한 닉네임을 입력해 주세요.' })
      nickname: string;
    }

    export class Password {

      @IsNotEmpty({ message: '현재 비밀번호를 입력해 주세요.' })
      @MinLength(6, { message: '비밀번호는 최소 6자리 이상 입력해 주세요.' })
      currentPassword: string;

      @IsNotEmpty({ message: '변경할 비밀번호를 입력해 주세요.' })
      @MinLength(6, { message: '비밀번호는 최소 6자리 이상 입력해 주세요.' })
      newPassword: string;
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
