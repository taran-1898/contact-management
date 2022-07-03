import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        nullable: false
    })
    public name: string;

    @Column({
        nullable: false
    })
    public email: string;

    @Column({
        nullable: false
    })
    public password: string;

    @Column({
        nullable: false
    })
    public salt: string;

    @Column('boolean', {
        nullable: false,
        default: false
    })
    public isVerified: boolean;

    @Column({
        nullable: true
    })
    public token?: string;

    @CreateDateColumn()
    public createdAt: Date;
}
