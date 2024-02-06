import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Link} from "../../links/entities/link.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true, nullable: false})
  email: string

  @Column()
  password: string

  @OneToMany(type => Link, link => link.id)
  links: Link[]
}
