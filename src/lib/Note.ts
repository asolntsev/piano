let idGenerator = 1;

export class Note {
    private readonly id: number;
    private readonly name: string;
    private readonly frequency: number | undefined;

    constructor(name: string, frequency: number | undefined = undefined) {
        this.id = idGenerator++;
        this.name = name;
        this.frequency = frequency;
    }

    get sharp() {
        return this.name.indexOf('#') > -1;
    }
    get disabled() {
        return !this.name || this.name === '#' || !this.frequency
    }
}

export default Note