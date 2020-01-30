import { FileType } from "./FileType";
import * as uuid from "uuid/v4" ;

export abstract class FileObject {
    protected id: uuid;
    protected filetype;
    constructor() {
        
    }

    public abstract toJSONfile(): Object;
    public abstract fromJSONfile(json: Object): FileObject;
}

export class File extends FileObject {
    
    private location = "";

    constructor(location: string) {
        super();
        this.filetype = FileType.FILE;

        this.location = location;
    }

    public toJSONfile() {
        const obj: any = {}
        obj.filetype = this.filetype;
        obj.location = this.location;
        obj.id = this.id;
        return obj
    }

    public fromJSONfile(json: Object): FileObject {
        throw new Error("Method not implemented.");
    }
}

export class Directory extends FileObject{
    
    private files: Array<FileObject> = [];

    constructor() {
        super();
        this.filetype = FileType.DIRECTORY;
    }

    public fromJSONfile(json: Object): FileObject {
        throw new Error("Method not implemented.");
    }

    public toJSONfile() {
        const obj: any = {}
        obj.id = this.id;
        obj.filetype = this.filetype;
        obj.files = this.files.map(f => f.toJSONfile());
        return obj
    }
}