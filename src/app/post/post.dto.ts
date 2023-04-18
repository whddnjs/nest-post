import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export namespace PostDto {

  export namespace Request {

    export class Create {

      @IsNotEmpty()
      readonly title: string;

      @IsNotEmpty()
      readonly content: string;
    }

    export class Update extends PartialType(Create) { }
  }
}