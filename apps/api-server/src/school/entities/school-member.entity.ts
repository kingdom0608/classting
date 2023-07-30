import { DOMAINS, ESchoolMemberStatus } from '@app/common';
import { ManyToOne, OneToMany } from '@app/common/decorators';
import { School } from './school.entity';
import { SchoolMemberSubscription } from './school-member-subscription.entity';
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
export class SchoolMember {
  @ManyToOne(() => School, (school) => school.members, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  school: School;

  @OneToMany(
    () => SchoolMemberSubscription,
    (schoolMemberSubscription) => schoolMemberSubscription.schoolMember,
    {
      cascade: true,
    },
  )
  subscriptions: SchoolMemberSubscription[];

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({ comment: '학교 ID' })
  @RelationId((schoolMember: SchoolMember) => schoolMember.school)
  schoolId: number;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: ESchoolMemberStatus;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
