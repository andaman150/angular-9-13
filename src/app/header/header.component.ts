import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('media_query') mobileQueryMax = true;
  @Output('toggle') navToggle = new EventEmitter();
  @Output() sayHi = new EventEmitter<String>();

  demoMailNoti = 10;
  demoNoti = 15;


  constructor() { }

  ngOnInit(): void {
  }

  onClickNavToggle() {
    this.navToggle.emit();
    // this.sayHi.emit('hi');
  }

}
