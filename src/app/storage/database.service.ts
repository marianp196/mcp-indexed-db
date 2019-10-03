import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { DatabaseSchema } from './databaseSchema';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  private db;

  public getStore(storeName: string) {
    if (!this.db) {
      throw new Error('db not opened');
    }
    return new DataStoreService(this.db, storeName);
  }

  public async openDatabase(dbSchema: DatabaseSchema) {
    const version = dbSchema.versions[dbSchema.versions.length - 1].version;
    //await this.execute(new NgxIndexedDB(dbSchema.dbName, version), dbSchema);
    const x = new NgxIndexedDB(dbSchema.dbName, version);
    this.db = await x.openDatabase(dbSchema.versions[0].version, evt => {
      const creator = evt.currentTarget.result;
      dbSchema.versions[0].tables.forEach(table => {
        creator.createObjectStore(table, { keyPath: 'id' });
      });
    });
    console.log(this.db);
  }

  /*private async execute(dbService, dbSchema: DatabaseSchema) {
    for (const version of dbSchema.versions) {
      await this.createVersion(dbService, version);
    }
  }*/

  /*private async createVersion(dbService, version: {version: number, tables: string[]}): Promise<any> {
    return new Promise((resolve, error) => {
      try {
        this.db = dbService.openDatabase(version.version, evt => {
          const creator = evt.currentTarget.result;
          version.tables.forEach(table => {
            creator.createObjectStore(table, { keyPath: 'id' });
          });
        });
        console.log(this.db);
        resolve();
      } catch (err) {
        error(err);
      }
    });
  }*/


}
