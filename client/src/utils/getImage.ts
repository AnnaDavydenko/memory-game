import { winter1, winter2, winter3, winter4, winter5, winter6} from "../assets/images/winter";
import { architecture1, architecture3, architecture4, architecture5, architecture6, architecture8 } from "../assets/images/architecture";
import { cat1, cat3, cat4, cat5, cat6, cat8 } from "../assets/images/cats";

const getImage = (type: string) => {
    let image = "";

    const store = {
        "sin": winter1,
        "vet": winter2,
        "yellow": winter3,
        "sun": winter4,
        "shar": winter5,
        "bike": winter6,
        "white": architecture1,
        "blue": architecture3,
        "york": architecture4,
        "orange": architecture5,
        "sad": architecture6,
        "stairs": architecture8,
        "siam": cat1,
        "whcat": cat3,
        "rusg": cat4,
        "tree": cat5,
        "kun": cat6,
        "eyes": cat8,
    };

    return (store as any)[type];
};

export default getImage;
