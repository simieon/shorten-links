import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {AuthGuard} from "../auth/auth.guard";

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createLinkDto: CreateLinkDto, @Req() req) {
    return this.linksService.create(createLinkDto, req.user.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    return this.linksService.findAll(req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.linksService.findOne(+id, req.user.sub);
  }

  @Get('t/:code')
  clickLink(@Param('code') code: string, @Res() res){
    return this.linksService.clickLink(code, res)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
