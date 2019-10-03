import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private db, private storeName: string) {}

  public async getAll(): Promise<any[]> {
    return await this.db.getAll(this.storeName);
  }

  public async getById(id: string): Promise<any> {
    
    return await this.db.getByKey(this.storeName, id);
  }

  public async create(id: string, obj: any) {
    /*return new Promise((r, error) => {
      console.log('hier im promise');
      this.db.openDatabase(1, evt => {
        try {
          const creator = evt.currentTarget.result;
          console.log('creator');
          creator.add(this.storeName, obj, id).then(r, error);
        } catch (e) {
          error(e);
        }
      });
    });*/
    //db.openDatabase(version.version, evt => {
     // const creator = evt.currentTarget.result;
    //console.log(this.db);
    console.log('put');
    await this.db.add(this.storeName, obj, id);
  }

  public async update(id: string, obj: any) {
    await this.db.update(this.storeName, obj, id);
  }

  public async remove(id: string) {
    await this.db.delete(this.storeName, id);
  }

  public async exists(id: string): Promise<boolean> {
    return false;
  }
}
