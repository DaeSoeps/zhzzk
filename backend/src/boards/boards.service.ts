import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';


// 게시물에 관한 로직을 처리하는곳 Service -> Controller(에서 서비스를 불러와 사용)
@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository : 이 데코레이터를 이용해서 이 서비스에서 BoardRepository를 이용, 이걸 boardRepository 변수에 넣어줌
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    async getBoardByid(id: number): Promise <Board> {
        // const found = await this.boardRepository.findOne(id); // 원본
        const found = await this.boardRepository.findOneBy({id: id});

        if(!found){
            throw new NotFoundException(`해당 아이디를 찾을 수 없습니다. ${id}`)
        }
        return found;
    }
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto){
    //     const {title, description} = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string): Board{
    //     const found = this.boards.find((board) => board.id === id);
    //     if(!found){
    //         throw new NotFoundException(`해당 아이디를 찾을 수 없습니다. ${id}`);
    //     }

    //     return found;
    // }

    // deleteBoard(id: string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board)=> board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

}

