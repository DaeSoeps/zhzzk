import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

// 게시판에 대한 커스텀 파이프
export class BoardStatusValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
        return value;
    }
}