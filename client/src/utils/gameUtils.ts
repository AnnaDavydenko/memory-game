export const shuffle = (array: any[]) => {
    const _array = array.slice(0);
    for (let i = 0; i < array.length - 1; i++) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        // Swapping values
        let temp = _array[i];
        _array[i] = _array[randomIndex];
        _array[randomIndex] = temp;
    }

    return _array;
};

