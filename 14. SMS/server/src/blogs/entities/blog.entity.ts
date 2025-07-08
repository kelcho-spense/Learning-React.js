import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Comment } from '../../comments/entities/comment.entity';

export enum BlogStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  summary: string;

  @Column({ type: 'enum', enum: BlogStatus, default: BlogStatus.DRAFT })
  status: BlogStatus;

  @Column('text', { nullable: true })
  adminReviewMessage: string;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column()
  authorId: number;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Relation<Comment[]>;

  @ManyToOne(() => Profile, (profile) => profile.blogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorId' })
  author: Relation<Profile>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
