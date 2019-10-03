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
    console.log(await store.create('zwei', {hallo: 'otto'}));
    console.log(await store.getById('zwei'));
    console.log(await store.update('zwei', {hallo: 'manni'}));
    console.log(await store.exists('zwei'));
    console.log(await store.remove('zwei'));
    console.log(await store.exists('zwei'));
    
  }
}
