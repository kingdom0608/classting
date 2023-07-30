import { DOMAINS, ESchoolLocation, ESchoolStatus } from '@app/common';
import { OneToMany } from '@app/common/decorators';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolPage } from './school-page.entity';
import { SchoolMember } from './school-member.entity';
import { SchoolOperator } from './school-operator.entity';

@Entity({ database: DOMAINS.School })
@Index(['name', 'location'], { unique: false })
@Index(['status'], { unique: false })
export class School {
  @OneToMany(() => SchoolPage, (schoolPage) => schoolPage.school, {
    cascade: true,
  })
  pages: SchoolPage[];

  @OneToMany(() => SchoolMember, (schoolMember) => schoolMember.school, {
    cascade: true,
  })
  members: SchoolMember[];

  @OneToMany(() => SchoolOperator, (schoolOperator) => schoolOperator.school, {
    cascade: true,
  })
  operators: SchoolOperator[];

  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({ comment: '상태', type: 'varchar', length: 30 })
  status: ESchoolStatus;

  @Column({
    comment: '지역',
    type: 'varchar',
    length: 30,
  })
  location: ESchoolLocation;

  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @UpdateDateColumn({ comment: '수정 일자' })
  updateDate: Date;

  @DeleteDateColumn({ comment: '삭제 일자', nullable: true })
  deleteDate?: Date;
}
