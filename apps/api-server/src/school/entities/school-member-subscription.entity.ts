import { DOMAINS } from '@app/common';
import { DateColumn, ManyToOne } from '@app/common/decorators';
import { SchoolMember } from './school-member.entity';
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
@Index(['schoolMemberId', 'schoolPageId'], { unique: true })
export class SchoolMemberSubscription {
  @ManyToOne(() => SchoolMember, (schoolMember) => schoolMember.subscriptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schoolMember: SchoolMember;

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '학교 학생 ID' })
  @RelationId(
    (schoolMemberSubscription: SchoolMemberSubscription) =>
      schoolMemberSubscription.schoolMember,
  )
  schoolMemberId: number;

  @Column({ comment: '학교 페이지 ID' })
  schoolPageId: number;

  @DateColumn({ comment: '시작 일자' })
  startDate: Date;

  @DateColumn({ comment: '종료 일자', nullable: true })
  endDate?: Date;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
