CREATE DATABASE alaffia_test;

create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1"; -- This is for generating UUIDs

-- Clean out the database
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS facilities;
-- DROP TABLE IF EXISTS locations;
-- DROP TABLE IF EXISTS user_facilities;
-- DROP TABLE IF EXISTS facility_locations;

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    role_id UUID REFERENCES roles(id) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state VARCHAR(50) NOT NULL,
    zip INT NOT NULL,
    line1 VARCHAR(50) NOT NULL,
    line2 VARCHAR(50),
    facility_id UUID REFERENCES facilities(id) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE user_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    facility_id UUID REFERENCES facilities(id) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Creates the initial roles
insert into roles (name) values ('administrator'), ('doctor');
-- Creates a couple of users. At least 1 admin and 1 doctor
insert into users (first_name, last_name, email, role_id) values 
    ('Joey', 'Tongay', 'joey.tongay@gmail.com', (select id from roles where name = 'administrator')),
    ('Doctor', 'Person', 'doctor.person@example.com', (select id from roles where name = 'doctor'));
-- Creates a couple of facilities
insert into facilities (name) values ('Sick people place'), ('Kinda sick people place');
-- Creates a couple of locations
insert into locations (state, zip, line1, line2, facility_id) values 
    ('TX', 78754, '123 Fake St', NULL, (select id from facilities where name = 'Sick people place')), 
    ('NY', 10001, '456 Fake St', 'Apt 1', (select id from facilities where name = 'Kinda sick people place'));

-- Assigns the users to the facilities
insert into user_facilities (user_id, facility_id) values 
    ((select id from users where email = 'joey.tongay@gmail.com'), (select id from facilities where name = 'Sick people place')),
    ((select id from users where email = 'doctor.person@example.com'), (select id from facilities where name = 'Kinda sick people place'));
