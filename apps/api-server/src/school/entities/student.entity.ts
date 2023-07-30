import { DOMAINS, EStudentStatus } from '@app/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OneToMany } from '@app/common/decorators';
import { StudentSubscription } from './student-subscription.entity';

@Entity({ database: DOMAINS.School })
export class Student {
  @OneToMany(
    () => StudentSubscription,
    (studentSubscription) => studentSubscription.student,
    {
      cascade: true,
    },
  )
  subscriptions: StudentSubscription[];

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: EStudentStatus;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
