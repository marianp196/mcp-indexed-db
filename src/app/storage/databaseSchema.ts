export class DatabaseSchema {
    public dbName: string;
    public versions: {version: number, tables: string[]}[]
}