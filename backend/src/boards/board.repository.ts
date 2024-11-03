import { DataSource, Repository } from "typeorm"
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
// Repository : 엔티티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등 처리
// cycle: user -> controller -> service(로직) -> repository (DB 에 관련된 로직)

/**
 * @EntityRepository => deprecated, DataSource로 대체함
 * 참조: https://velog.io/@sheoae12/NestJS-Custom-Repository-%EB%A7%8C%EB%93%A4%EA%B8%B0
 */
@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.save(board);
        return board;
    }
    

}