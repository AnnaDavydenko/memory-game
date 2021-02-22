import { dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8, dog9 } from "../assets/images/dogs";
import { pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, pokemon7, pokemon8 } from "../assets/images/pokemon";
import { robot1, robot2, robot3, robot4, robot5, robot6, robot7, robot8 } from "../assets/images/robots";

const createImgArray = () => {
    let imgArray = [];
    imgArray.push(dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8, dog9);
    imgArray.push(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, pokemon7, pokemon8);
    imgArray.push(robot1, robot2, robot3, robot4, robot5, robot6, robot7, robot8);
    return imgArray;
}

export default createImgArray;