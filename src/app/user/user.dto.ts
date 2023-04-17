import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export namespace UserDto {

  export namespace Request {

    export class Create {

      @IsNotEmpty()
      readonly password: string;

    }

    export class Update extends PartialType(Create) { }

  }

}