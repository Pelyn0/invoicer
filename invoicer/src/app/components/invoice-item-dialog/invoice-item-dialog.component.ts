import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InvoiceItem } from 'src/app/models/invoice-item';

@Component({
  selector: 'app-invoice-item-dialog',
  templateUrl: './invoice-item-dialog.component.html',
  styleUrls: ['./invoice-item-dialog.component.css'],
})
export class InvoiceItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InvoiceItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: InvoiceItem
  ) {
  }
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSelectedCarChanged(newValue: string) {
    let selected = this.cars.find(c=>c.value==newValue);

    if(selected){
      this.data.title = selected?.title;
      this.data.price = selected?.price;
      this.data.manufacturer = selected?.manufacturer;
      this.data.quantity = selected?.quantity;
      this.data.category = selected?.category;
    }
  }

  cars: InvoiceItem[] = [
    {
      "value": "1",
      "title": "Рухома голова 3 в 1",
      "manufacturer": "PowerLight HotBeam BS 360",
      "quantity": 12,
      "discount": 0,
      "price": 1600,
      "category": "Динамічні світлові прилади"
    },
    {
      "value": "6",
      "title": "DMX Спліттер",
      "manufacturer": "Eurolite DMX Split 4 Mini",
      "quantity": 1,
      "discount": 0,
      "price": 280,
      "category": "Прилади управління світловим обладнанням"
    },
    {
      "value": "10",
      "title": "Інтерфейс управління освітленням",
      "manufacturer": "SUNLITE SUITE2-FC",
      "quantity": 1,
      "price": 800,
      "discount": 0,
      "category": "Прилади управління світловим обладнанням"
    },
    {
      "value": "11",
      "title": "Ферма алюмінієва Квадролайт 4L",
      "manufacturer": "MTK Truss 2 м",
      "quantity": 12,
      "price": 750,
      "discount": 0,
      "category": "Сценічне обладнання"
    },
    {
      "value": "7",
      "title": "Дзеркальна куля 50 см.",
      "manufacturer": "",
      "quantity": 1,
      "price": 1500,
      "discount": 0,
      "category": "Сценічне обладнання"
    },
    {
      "value": "8",
      "title": "Мотор для дзеркальної кулі",
      "manufacturer": "Stairville MBM40D Mirror",
      "quantity": 1,
      "discount": 0,
      "price": 370,
      "category": "Сценічне обладнання"
    },
    {
      "value": "12",
      "title": "Нижня основа під ферму",
      "manufacturer": "Gravity",
      "quantity": 12,
      "price": 350,
      "discount": 0,
      "category": "Сценічне обладнання"
    },
    {
      "value": "16",
      "title": "Генератор туману",
      "manufacturer": "Pro Lux Tour Haze",
      "quantity": 1,
      "discount": 0,
      "price": 1200,
      "category": "Сценічне обладнання"
    },
    {
      "value": "13",
      "title": "Електрична підстанція розгалужуюча 3-х фазна",
      "manufacturer": "PCE - 32 А",
      "quantity": 1,
      "price": 1250,
      "discount": 0,
      "category": "Силова та сигнальна комутація"
    },
    {
      "value": "14",
      "title": "Кабель прорезинений силовий",
      "manufacturer": "Titanex",
      "quantity": 10,
      "discount": 0,
      "price": 20,
      "category": "Силова та сигнальна комутація"
    },
    {
      "value": "15",
      "title": "Кабель-канал для захисту кабеля",
      "manufacturer": "ProLux Cross 2",
      "quantity": 10,
      "price": 140,
      "discount": 0,
      "category": "Силова та сигнальна комутація"
    },
    {
      "value": "9",
      "title": "Стійка для світлового обладнання",
      "manufacturer": "GRAVITY LS 431 B",
      "quantity": 2,
      "price": 320,
      "discount": 0,
      "category": "Стійки світлові"
    },
    {
      "value": "2",
      "title": "Світлодіодна матрична панель",
      "manufacturer": "Pro Lux MATRIX BAR 6 RGBWA",
      "quantity": 8,
      "price": 650,
      "discount": 0,
      "category": "Статичні прилади"
    },
    {
      "value": "3",
      "title": "Світлодіодний LED прожектор",
      "manufacturer": "ProLux LUX LED PAR 1818",
      "quantity": 19,
      "price": 350,
      "discount": 0,
      "category": "Статичні прилади"
    },
    {
      "value": "4",
      "title": "Світлодіодний прожектор",
      "manufacturer": "Free Color COB200 White",
      "quantity": 2,
      "discount": 0,
      "price": 600,
      "category": "Статичні прилади"
    },
    {
      "value": "5",
      "title": "Світловий ефект",
      "manufacturer": "Free Color FLASH 2",
      "quantity": 10,
      "discount": 0,
      "price": 550,
      "category": "Статичні прилади"
    },
  ];
}
