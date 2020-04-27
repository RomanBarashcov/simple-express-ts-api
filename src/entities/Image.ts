export interface IImage {

    id: number;
    source: string;
    title: string;
    description: string;
    
}

class Image implements IImage {

    id: number;
    source: string;
    title: string;
    description: string;

    constructor(image: IImage) {

            this.id = image.id | -1;
            this.source = image.source || '';
            this.title = image.title || '';
            this.description = image.description || '';
        
    }
}

export default Image;