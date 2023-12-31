import { DOMAINS, ESchoolPageLocation, ESchoolPageStatus } from '@app/common';
import { OneToMany } from '@app/common/decorators';
import { SchoolPageNews } from './school-page-news.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentSubscription } from './student-subscription.entity';

@Entity({ database: DOMAINS.School })
@Index(['status'], { unique: false })
export class SchoolPage {
  @OneToMany(
    () => SchoolPageNews,
    (schoolPageNews) => schoolPageNews.schoolPage,
    {
      cascade: true,
    },
  )
  news: SchoolPageNews[];

  @OneToMany(
    () => StudentSubscription,
    (studentSubscription) => studentSubscription.schoolPage,
    {
      cascade: true,
    },
  )
  subscriptions: StudentSubscription[];

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: ESchoolPageStatus;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    comment: '지역',
    type: 'varchar',
    length: 30,
  })
  location: ESchoolPageLocation;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
