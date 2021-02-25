import { cat1, cat3, cat4, cat5, cat6, cat8, cat9 } from "../assets/images/cats";
import { architecture1, architecture3, architecture4, architecture5, architecture6, architecture8, architecture9 } from "../assets/images/architecture";
import { winter1, winter2, winter3, winter4, winter5, winter6, winter9 } from "../assets/images/winter";

const createImgArray = () => {
    let imgArray = [];
    imgArray.push(cat1, cat3, cat4, cat5, cat6, cat8, cat9);
    imgArray.push(architecture1, architecture3, architecture4, architecture5, architecture6, architecture8, architecture9);
    imgArray.push(winter1, winter2, winter3, winter4, winter5, winter6, winter9);
    return imgArray;
}

export default createImgArray;
