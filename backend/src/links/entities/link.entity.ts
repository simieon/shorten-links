import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../auth/entities/user.entity";

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false})
  from: string

  @Column({unique: true, nullable: false})
  to: string

  @Column({unique: true, nullable: false})
  code: string

  @Column({type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @Column({default: 0})
  clicks: number

  @ManyToOne(type => User, owner => owner.id)
  owner: User
}
