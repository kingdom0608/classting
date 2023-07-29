import { DOMAINS, ESchoolPageStatus } from '@app/common';
import { ManyToOne, OneToMany } from '@app/common/decorators';
import { School } from './school.entity';
import { SchoolPageNews } from './school-page-news.entity';
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

@Entity({ database: DOMAINS.School })
@Index(['status'], { unique: false })
export class SchoolPage {
  @ManyToOne(() => School, (school) => school.pages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  school: School;

  @OneToMany(
    () => SchoolPageNews,
    (schoolPageNews) => schoolPageNews.schoolPage,
    {
      cascade: true,
    },
  )
  news: SchoolPageNews[];

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '학교 ID' })
  @RelationId((schoolPage: SchoolPage) => schoolPage.school)
  schoolId: number;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: ESchoolPageStatus;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
