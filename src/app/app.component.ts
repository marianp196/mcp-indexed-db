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
    console.log('init');
    await this.db.openDatabase({
      dbName: 'laueft',
      versions: [
        {version: 1, tables: ['eins', 'zwei', 'drei']},
        //{version: 2, tables: ['drei']}
      ]
    });
    console.log('after open db');

    //const store = this.db.getStore('eins');
    /*await store.create('id', {hi: 'huhu'});
    console.log('after create');
    console.log(await store.getById('id'));
    console.log(await store.getAll());*/
  }
}
