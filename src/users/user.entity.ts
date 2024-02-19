/**
 * @file: User Entity
 * @description: TypeORM Entity for User
 * @author: Emre KILIÇ (https://github.com/adorratm)
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Entity: Tells TypeORM that this class is an entity
// PrimaryGeneratedColumn: This is a primary key column that will be generated automatically
// Column: This is a normal column

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

    @Column()
    status: string;

    @Column()
    last_login: Date;

    @Column()
    last_logout: Date;

    @Column()
    last_ip: string;
}