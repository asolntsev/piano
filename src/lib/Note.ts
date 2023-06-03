let idGenerator = 1;

export class Note {
    private id: number;
    private name: string;
    private frequency: number;

    constructor(name: string, frequency: number) {
        this.id = idGenerator++;
        this.name = name;
        this.frequency = frequency;
    }

    get sharp() {
        return this.name.indexOf('#') > -1;
    }
}

export default Note