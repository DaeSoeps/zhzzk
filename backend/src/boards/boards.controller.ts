import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService ) {}

    @Get('/id')
    getBoardById(@Param('id') id: number) : Promise<Board>{
        return this.boardsService.getBoardByid(id);
    }
    // @Get()
    // getAllBoard(): Board[]{
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe) // 핸들러 레벨 파이프, 유효성체크
    // createBoard(
    //     @Body() CreateBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(CreateBoardDto)
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string):Board{
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id)
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,

    // ){
    //     return this.boardsService.updateBoardStatus(id, status)
    // }
}
