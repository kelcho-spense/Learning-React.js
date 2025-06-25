import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Blog, (blog) => blog.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blogId' })
  blog: Relation<Blog>;

  @Column()
  blogId: number;

  @ManyToOne(() => Profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId' })
  author: Relation<Profile>;

  @Column()
  authorId: number;
}
