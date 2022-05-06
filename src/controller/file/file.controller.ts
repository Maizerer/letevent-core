import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';

@Controller('file')
export class FileController {
  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
