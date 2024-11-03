import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

// 게시판에 대한 커스텀 파이프
export class BoardStatusValidationPipe implements PipeTransform {

    // Status 값 Validation 
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    /**
     * 
     * @param value 파라미터로 받은 값
     * @param metadata value 파라미터의 메타 데이터를 포함한 객체
     * @returns transform()메소드에서 Return 된 값은 Route 헨들러로 전해짐.
     * 만약 예외(Exception) 발생하면 클라이언트에 바로 전해짐.
     */
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        
        if(!this.isStatusValid(value)){
            throw BadRequestException(`${value} 는 status 값이 아닙니다.`)
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}