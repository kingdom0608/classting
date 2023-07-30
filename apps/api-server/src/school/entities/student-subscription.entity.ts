import { DateColumn, DOMAINS } from '@app/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { SchoolPage } from './school-page.entity';

@Entity({ database: DOMAINS.School })
@Index(['studentId'], { unique: false })
@Index(['studentId', 'schoolPageId'], { unique: false })
export class StudentSubscription {
  @ManyToOne(() => Student, (student) => student.subscriptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => SchoolPage, (schoolPage) => schoolPage.subscriptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schoolPage: SchoolPage;

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '학교 학생 ID' })
  @RelationId(
    (studentSubscription: StudentSubscription) => studentSubscription.student,
  )
  studentId: number;

  @RelationId(
    (studentSubscription: StudentSubscription) =>
      studentSubscription.schoolPage,
  )
  @Column({ comment: '학교 페이지 ID' })
  schoolPageId: number;

  @Column({ comment: '구독 여부', type: 'bool' })
  isSubscription: boolean;

  @DateColumn({ comment: '시작 일자', type: 'date' })
  startDate: Date;

  @DateColumn({ comment: '종료 일자', type: 'date', nullable: true })
  endDate?: Date;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
