import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCat, faCrow, faDog, faDragon, faDove, faFish, faFrog, faHippo, faHorse, faSpider, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

interface List {
  name: IconDefinition
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  value: string
  count: number = 0
  listImg: List [] = [
    { name: faCat},
    { name: faCrow},
    { name: faDog},
    { name: faDragon},
    { name: faDove},
    { name: faFish},
    { name: faFrog},
    { name: faHippo},
    { name: faHorse},
    { name: faSpider}
  ]
  users
  iconsValid: List [] = []
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]]
  })

  constructor(private userService: UserService, private fb: FormBuilder) {
    
   }


  ngOnInit(): void {
    this.listRandom()
    this.iconsValid = []
    this.userService.getAll().subscribe((resp) => {
      this.users = resp
    })
  }

  listRandom() {
    this.listImg.sort(()=> Math.random() - 0.5);
  }

  selectIcon(ico) {
    if(this.iconsValid.length <= 2){
      this.count = this.count+33
      this.count === 99 ? this.count = this.count+1 : this.count
      this.value = this.count.toString()
      this.iconsValid.push({name: ico.iconName})
    } else {
      this.messages('Seleccion de imagenes', 'Ya se han seleccionado las tres imagenes de acceso', 'warning')
    }
  }

  getLogin() {
    const value = this.users.name === this.userForm.value.name
    const icons = JSON.stringify(this.users.icon) == JSON.stringify(this.iconsValid)
    value && icons ? this.messages('Inicio sesion', 'Ingreso correctamente', 'success') : this.messages('Inicio sesion', 'Usuario incorrecto y/o contraseña incorrecta', 'warning')
    this.iconsValid = []
    this.value = ''
    this.count = 0
    this.userForm.reset()
  }

  messages(title: string, info: string, icons: SweetAlertIcon): void {
    Swal.fire({
      title: title,
      html: info,
      icon: icons,
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    })
  }

}
