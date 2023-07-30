import { ESchoolPageNewsStatus } from '@app/common/enums/school/school-page-news-enum';
import { ManyToOne } from '@app/common/decorators';
import { DOMAINS } from '@app/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolPage } from './school-page.entity';

@Entity({ database: DOMAINS.School })
@Index(['status'], { unique: false })
export class SchoolPageNews {
  @ManyToOne(() => SchoolPage, (schoolPage) => schoolPage.news, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schoolPage: SchoolPage;

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '학교 페이지 ID' })
  @RelationId((schoolPageNews: SchoolPageNews) => schoolPageNews.schoolPage)
  schoolPageId: number;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: ESchoolPageNewsStatus;

  @Column({
    comment: '컨텐츠',
    type: 'text',
    nullable: true,
  })
  content?: string;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
