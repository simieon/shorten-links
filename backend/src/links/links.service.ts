import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "./entities/link.entity";
import {Repository} from "typeorm";
import * as shortid from "shortid";
import {keys} from "../config/keys";
import {User} from "../auth/entities/user.entity";

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,

    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
   async create(createLinkDto: CreateLinkDto, userId: number) {
    try{
      const code = shortid.generate()

      const from = createLinkDto.from

      const existing = await this.linksRepository.findOneBy({from})
      if(existing){
        return {link: existing}
      }

      const to = keys.baseUrl + '/t/' + code;
      const user = await this.usersRepository.findOneBy({id: userId})
      const newLink = this.linksRepository.create({from, to, code, owner: user})


      return this.linksRepository.save(newLink)
    }catch{
      throw new InternalServerErrorException()
    }
  }

  async findAll(userId: number) {
    const user = await this.usersRepository.findOneBy({id: userId})
    return this.linksRepository.findBy({owner: user})
  }

  async findOne(id: number, userId: number) {
    const user = await this.usersRepository.findOneBy({id: userId})
    return this.linksRepository.findOneBy({id, owner: user})
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return this.linksRepository.update(id, updateLinkDto)
  }

  remove(id: number) {
    return this.linksRepository.delete({id})
  }
}
