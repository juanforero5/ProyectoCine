function generateMappedList() {
    const characters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const mappedList: string[] = [];

    characters.forEach(char => {
        for (let num = 1; num <= 10; num++) {
            mappedList.push(`${char}${num}`);
        }
    });

    return mappedList;
}

export const SEAT_IDS = generateMappedList()