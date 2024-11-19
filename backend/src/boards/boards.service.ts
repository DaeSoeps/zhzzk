import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';


// 게시물에 관한 로직을 처리하는곳 Service -> Controller(에서 서비스를 불러와 사용), DB관련 로직은 Repository에서 처리.
@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository : 이 데코레이터를 이용해서 이 서비스에서 BoardRepository를 이용, 이걸 boardRepository 변수에 넣어줌
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    // createBoard(createBoardDto : CreateBoardDto): Promise<Board>{
    //     return this.boardRepository.createBoard(createBoardDto);
    // }

    async deleteBoard(id: number): Promise<void>{
        const result = await this.boardRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`게시글 ID를 찾을 수 없습니다 ${id}`)
        }

        console.log("deleteBoard : ", result)

    }

    async getBoardById(id: number): Promise <Board> {
        // const found = await this.boardRepository.findOne(id); // 원본
        const found = await this.boardRepository.findOneBy({id: id});

        if(!found){
            throw new NotFoundException(`해당 아이디를 찾을 수 없습니다. ${id}`)
        }
        return found;
    }


}

