import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './storage/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'indexed-db';

  constructor(private db: DatabaseService){}

  async ngOnInit() {
    this.db.schema = {
      dbName: 'neueDatenbank',
      currentVersion: 14,
      tables: [{name: 'hurensohn'}, {name: 'spasti'}, {name: 'naja'}]
    };

    await this.db.openDatabaseAndUpdate();
    const store = this.db.getStore('hurensohn');

    const id = 'och jo';
    console.log(await store.create(id, {hallo: 'otto'}));
    console.log(await store.getById(id));
    console.log(await store.update(id, {hallo: 'manni'}));
    console.log(await store.exists(id));
    console.log(await store.remove(id));
    console.log(await store.exists(id));
    
  }
}
