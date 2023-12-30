import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "./entities/link.entity";
import {Repository} from "typeorm";
import {keys} from "../config/keys";

@Injectable()
export class LinksService {
  constructor(@InjectRepository(Link) private linksRepository: Repository<Link>) {
  }
  create(createLinkDto: CreateLinkDto) {
    const newLink = this.linksRepository.create(createLinkDto)

    return this.linksRepository.save(newLink)
  }

  findAll() {
    return this.linksRepository.find()
  }

  findOne(id: number) {
    return this.linksRepository.findOneBy({id})
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return this.linksRepository.update(id, updateLinkDto)
  }

  remove(id: number) {
    return this.linksRepository.delete({id})
  }
}
