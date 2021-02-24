import { robot1, robot2, robot3, robot4, robot5, robot6, robot7, robot8 } from "../assets/images/robots";
import { pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6, pokemon7, pokemon8 } from "../assets/images/pokemon";
import { dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8 } from "../assets/images/dogs";

const getImage = (type: string) => {
    let image = "";

    const store = {
        "red": robot1,
        "yellow": robot2,
        "bulbasaur": pokemon1,
        "charizard": pokemon2,
        "lhasa": dog1,
        "eskimo": dog2,
    };

    return (store as any)[type];
};

export default getImage;
