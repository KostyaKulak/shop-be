CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products
(
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       text NOT NULL,
    description text,
    price       integer
);

CREATE TABLE IF NOT EXISTS stocks
(
    product_id uuid,
    count      integer,
    foreign key ("product_id") references products (id)
);

ALTER TABLE products
    ADD COLUMN brand text;

INSERT INTO products (title, description, price, brand)
VALUES ('Bvlgari Omnia Coral', 'Туалетная вода для женщин Булгари Омниа Корал.', 104, 'Bvlgari'),
       ('Chanel Chance Eau Tendre', 'Туалетная вода для женщин Шанель Шанс о Тендер.', 208, 'Chanel'),
       ('Dior J''Adore', 'Парфюмерная вода для женщин Диор Жадор.', 143, 'Dior'),
       ('Escada Especially Delicate Notes', 'Туалетная вода для женщин Эскада Эспешили Деликейт Ноутс.', 117, 'Escada'),
       ('Kenzo Madly', 'Парфюмерная вода для женщин Кензо Мэдли.', 104, 'Kenzo');

INSERT INTO stocks (product_id, count)
VALUES ((SELECT id FROM products WHERE products.brand = 'Bvlgari'), 1),
       ((SELECT id FROM products WHERE products.brand = 'Chanel'), 2),
       ((SELECT id FROM products WHERE products.brand = 'Dior'), 3),
       ((SELECT id FROM products WHERE products.brand = 'Escada'), 5),
       ((SELECT id FROM products WHERE products.brand = 'Kenzo'), 4);

SELECT id, title, description, price, brand, count FROM products p LEFT JOIN stocks s on p.id = s.product_id;
