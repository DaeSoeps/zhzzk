import { DataSource, Repository } from "typeorm"
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
// Repository : 엔티티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등 처리
// cycle: user -> controller -> service(로직) -> repository (DB 에 관련된 로직)


@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }
    

}