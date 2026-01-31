CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Alex Tan', 'https://blogone.com', 'Relational databases rule the world', 10);
insert into blogs (author, url, title, likes) values ('Anna Monroe', 'https://blogtwo.com', 'MongoDB is webscale', 30);