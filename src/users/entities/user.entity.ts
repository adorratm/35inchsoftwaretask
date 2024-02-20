/**
 * @file: User Entity
 * @description: TypeORM Entity for User
 * @author: Emre KILIÇ (https://github.com/adorratm)
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 70 })
    first_name: string;

    @Column({ type: 'varchar', length: 70 })
    last_name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', length: 64})
    password: string;

    @Column()
    role: number;
}



// Entity: Tells TypeORM that this class is an entity
// PrimaryGeneratedColumn: This is a primary key column that will be generated automatically
// Column: This is a normal column