import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Contact {
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
    public phoneNumber: string;

    @Column({
        nullable: false
    })
    @Index()
    public userId: string

    @CreateDateColumn()
    public createdAt: Date;
}
