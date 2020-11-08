import {Product} from "./product.model";

let counter: number = 0;

const products: Product[] = [
    new Product((counter++).toString(), "Bvlgari Omnia Coral", 104, 'Туалетная вода для женщин Булгари Омниа Корал.', 'Bvlgari'),
    new Product((counter++).toString(), "Chanel Chance Eau Tendre", 208, 'Туалетная вода для женщин Шанель Шанс о Тендер.', 'Chanel'),
    new Product((counter++).toString(), "Dior J'Adore", 143, 'Парфюмерная вода для женщин Диор Жадор.', 'Dior'),
    new Product((counter++).toString(), "Escada Especially Delicate Notes", 117, 'Туалетная вода для женщин Эскада Эспешили Деликейт Ноутс.', 'Escada'),
    new Product((counter++).toString(), "Kenzo Madly", 104, 'Парфюмерная вода для женщин Кензо Мэдли.', 'Kenzo'),
];

export {products};
