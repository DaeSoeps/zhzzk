import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

// 게시물에 관한 로직을 처리하는곳 Service -> Controller(에서 서비스를 불러와 사용)
@Injectable()
export class BoardsService {
    private boards: Board[] = [];


    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string){
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }
}

