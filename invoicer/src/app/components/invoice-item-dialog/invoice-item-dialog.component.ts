import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InvoiceItem } from 'src/app/models/invoice-item';
import { Rights } from 'src/app/models/rights';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-invoice-item-dialog',
  templateUrl: './invoice-item-dialog.component.html',
  styleUrls: ['./invoice-item-dialog.component.css'],
})
export class InvoiceItemDialogComponent implements OnInit {
  filteredCategories: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<InvoiceItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: InvoiceItem
  ) {
  }

  async ngOnInit(): Promise<void> {
    let role = await Auth();

    switch(role){
      case Rights.gen1:
        this.cars = this.cars_gen1;
        break;
      default:
        this.cars = this.cars_demo;
    }
    
    this.data.discountPercents = ((Number(this.data.discount) || 0) / (this.data.quantity*this.data.price)) * 100;
    this.filteredCategories = [
      ...new Set(
        this.cars
          .map(c => c.category)
          .filter((cat): cat is string => typeof cat === 'string')
      )
    ];
  }
  
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

  onSelectedCategoryChanged(value: string) {
    this.filteredCategories = [
        ...new Set(
          this.cars
            .map(c => c.category)
            .filter((cat): cat is string => typeof cat === 'string')
        )
      ].filter(option => option?.toLowerCase().includes(value.toLowerCase()) ?? true);
  }
  
  onDiscountPercentsChanged(newValue: number) {
    this.data.discount = this.data.quantity*(this.data.price * ((Number(newValue) || 0)/100)); 
  }

  filteredItems() {
    if (!this.data.category) {
      return this.cars;
    }
    return this.cars.filter(car =>
      car.category?.toLowerCase().includes(this.data.category?.toLowerCase() ?? '') ?? true
    );
  }

  cars_demo: InvoiceItem[] = [
    {
      "value": "1",
      "title": "Електрогенератор",
      "manufacturer": "Honda",
      "quantity": 1,
      "discount": 0,
      "price": 500,
      "category": "Енергетика"
    },
    {
      "value": "2",
      "title": "Лед лампа",
      "manufacturer": "COB",
      "quantity": 1,
      "discount": 0,
      "price": 200,
      "category": "Прилади"
    },
  ];

  cars_gen1: InvoiceItem[] = [
    {
      "value": "1",
      "title": "Електрогенератор",
      "manufacturer": "Al-Ko 3500 C",
      "quantity": 1,
      "discount": 0,
      "price": 1100,
      "category": "Енергетика"
    },
    {
      "value": "2",
      "title": "Електрична підстанція розгалужуюча 3-х фазна",
      "manufacturer": "PCE - 32 А",
      "quantity": 1,
      "discount": 0,
      "price": 1000,
      "category": "Енергетика"
    },
    {
      "value": "3",
      "title": "Кабель прорезинений силовий",
      "manufacturer": "Titanex",
      "quantity": 1,
      "discount": 0,
      "price": 15,
      "category": "Енергетика"
    },
    {
      "value": "4",
      "title": "Продовжувач вилка-розетка 2м",
      "manufacturer": "Кабель силовий",
      "quantity": 1,
      "discount": 0,
      "price": 15,
      "category": "Енергетика"
    },
    {
      "value": "5",
      "title": "Продовжувач вилка-розетка 5м",
      "manufacturer": "Кабель силовий",
      "quantity": 1,
      "discount": 0,
      "price": 25,
      "category": "Енергетика"
    },
    {
      "value": "6",
      "title": "Продовжувач вилка-розетка 10м",
      "manufacturer": "Кабель силовий",
      "quantity": 1,
      "discount": 0,
      "price": 40,
      "category": "Енергетика"
    },
    {
      "value": "7",
      "title": "Продовжувач вилка-розетка 15м",
      "manufacturer": "Кабель силовий",
      "quantity": 1,
      "discount": 0,
      "price": 55,
      "category": "Енергетика"
    },
    {
      "value": "8",
      "title": "Продовжувач вилка-розетка 30м",
      "manufacturer": "Кабель силовий",
      "quantity": 1,
      "discount": 0,
      "price": 250,
      "category": "Енергетика"
    },
    {
      "value": "9",
      "title": "Продовжувач вилка-розетка 50м",
      "manufacturer": "Кабель силовий",
      "quantity": 1,
      "discount": 0,
      "price": 400,
      "category": "Енергетика"
    },
    {
      "value": "10",
      "title": "Кабель-канал для захисту кабеля",
      "manufacturer": "Кабель кросс",
      "quantity": 1,
      "discount": 0,
      "price": 80,
      "category": "Енергетика"
    },
    {
      "value": "11",
      "title": "Кабель-канал для захисту кабеля",
      "manufacturer": "ProLux Cross 2",
      "quantity": 1,
      "discount": 0,
      "price": 100,
      "category": "Енергетика"
    },
    {
      "value": "12",
      "title": "Хейзер на водній основі",
      "manufacturer": "Pro Lux Tour Haze",
      "quantity": 1,
      "discount": 0,
      "price": 900,
      "category": "Ефекти"
    },
    {
      "value": "13",
      "title": "Генератор легкого диму",
      "manufacturer": "Dj Power CS-1500DMX",
      "quantity": 1,
      "discount": 0,
      "price": 600,
      "category": "Ефекти"
    },
    {
      "value": "14",
      "title": "Генератор легкого диму",
      "manufacturer": "DJ Power DF-V9A",
      "quantity": 1,
      "discount": 0,
      "price": 450,
      "category": "Ефекти"
    },
    {
      "value": "15",
      "title": "Генератор важкого диму (оренда)",
      "manufacturer": "DJ Pwer X-1",
      "quantity": 1,
      "discount": 0,
      "price": 650,
      "category": "Ефекти"
    },
    {
      "value": "16",
      "title": "Генератор важкого диму (послуга)",
      "manufacturer": "DJ Pwer X-1",
      "quantity": 1,
      "discount": 0,
      "price": 3000,
      "category": "Ефекти"
    },
    {
      "value": "17",
      "title": "Генератор конфетті (оренда)",
      "manufacturer": "DMH BIG LUX100780",
      "quantity": 1,
      "discount": 0,
      "price": 700,
      "category": "Ефекти"
    },
    {
      "value": "18",
      "title": "Генератор конфетті (послуга)",
      "manufacturer": "DMH BIG LUX100780",
      "quantity": 1,
      "discount": 0,
      "price": 1500,
      "category": "Ефекти"
    },
    {
      "value": "19",
      "title": "Пірофонтани 2м",
      "manufacturer": "MAXSEM",
      "quantity": 1,
      "discount": 0,
      "price": 300,
      "category": "Ефекти"
    },
    {
      "value": "20",
      "title": "Пірофонтани 3м",
      "manufacturer": "MAXSEM",
      "quantity": 1,
      "discount": 0,
      "price": 450,
      "category": "Ефекти"
    },
    {
      "value": "21",
      "title": "Комплект дистанційних запалів",
      "manufacturer": "8 блоків запалу",
      "quantity": 1,
      "discount": 0,
      "price": 300,
      "category": "Ефекти"
    },
    {
      "value": "22",
      "title": "Активный сабвуфер",
      "manufacturer": "DB Technologies DVA S1518N",
      "quantity": 1,
      "discount": 0,
      "price": 1300,
      "category": "Звук"
    },
    {
      "value": "23",
      "title": "Активна акустична система",
      "manufacturer": "DB Technologies DVX D15 HP",
      "quantity": 1,
      "discount": 0,
      "price": 1000,
      "category": "Звук"
    },
    {
      "value": "24",
      "title": "Активна акустична система",
      "manufacturer": "DB Technologies Opera Unica 15",
      "quantity": 1,
      "discount": 0,
      "price": 800,
      "category": "Звук"
    },
    {
      "value": "25",
      "title": "Стійка для акустичної системи",
      "manufacturer": "K&M 21435",
      "quantity": 1,
      "discount": 0,
      "price": 250,
      "category": "Звук"
    },
    {
      "value": "26",
      "title": "Стійка-труба для акустичної системи",
      "manufacturer": "K&M 26736",
      "quantity": 1,
      "discount": 0,
      "price": 250,
      "category": "Звук"
    },
    {
      "value": "27",
      "title": "Стійка для клавішних інструментів",
      "manufacturer": "K&M 18976",
      "quantity": 1,
      "discount": 0,
      "price": 300,
      "category": "Звук"
    },
    {
      "value": "28",
      "title": "Мікрофонна стійка",
      "manufacturer": "K&M 210/2 Black",
      "quantity": 1,
      "discount": 0,
      "price": 150,
      "category": "Звук"
    },
    {
      "value": "29",
      "title": "Мікрофонна стійка",
      "manufacturer": "Gravity MS 231 HB",
      "quantity": 1,
      "discount": 0,
      "price": 150,
      "category": "Звук"
    },
    {
      "value": "30",
      "title": "Мікрофонна стійка (коротка)",
      "manufacturer": "K&M 2510Black",
      "quantity": 1,
      "discount": 0,
      "price": 150,
      "category": "Звук"
    },
    {
      "value": "31",
      "title": "Стійка для гітари",
      "manufacturer": "«Memphis 10» K&M 17670 Guitarstand Memphis Pro",
      "quantity": 1,
      "discount": 0,
      "price": 150,
      "category": "Звук"
    },
    {
      "value": "32",
      "title": "Дірект–бокс",
      "manufacturer": "Klark Teknik DN100 V2",
      "quantity": 1,
      "discount": 0,
      "price": 200,
      "category": "Звук"
    },
    {
      "value": "33",
      "title": "Дірект–бокс",
      "manufacturer": "Klark Teknik DN200 V2",
      "quantity": 1,
      "discount": 0,
      "price": 300,
      "category": "Звук"
    },
    {
      "value": "33",
      "title": "Мультикор",
      "manufacturer": "Soundking AH105/30",
      "quantity": 1,
      "discount": 0,
      "price": 700,
      "category": "Звук"
    },
    {
      "value": "34",
      "title": "Цифрова мікшерна консоль",
      "manufacturer": "Allen Heath SQ-6",
      "quantity": 1,
      "discount": 0,
      "price": 5000,
      "category": "Звук"
    },
    {
      "value": "35",
      "title": "Цифрова мікшерна консоль",
      "manufacturer": "Behringer X32 Compact",
      "quantity": 1,
      "discount": 0,
      "price": 4000,
      "category": "Звук"
    },
    {
      "value": "36",
      "title": "Аналоговий мікшерний пульт",
      "manufacturer": "Allen&Heath ZET 60-14FX",
      "quantity": 1,
      "discount": 0,
      "price": 700,
      "category": "Звук"
    },
    {
      "value": "37",
      "title": "Аналоговий мікшерний пульт",
      "manufacturer": "Allen&Heath ZET 60-10FX",
      "quantity": 1,
      "discount": 0,
      "price": 500,
      "category": "Звук"
    },
    {
      "value": "38",
      "title": "Ширма для DJ",
      "manufacturer": "",
      "quantity": 1,
      "discount": 0,
      "price": 250,
      "category": "Звук"
    },
    {
      "value": "39",
      "title": "Радіосистема з ручним мікрофоном",
      "manufacturer": "Shure SLX 24 Beta58",
      "quantity": 1,
      "discount": 0,
      "price": 800,
      "category": "Звук"
    },
    {
      "value": "40",
      "title": "Радіосистема(бодіпак)",
      "manufacturer": "Shure SLX 24 + Shure SLX 1",
      "quantity": 1,
      "discount": 0,
      "price": 900,
      "category": "Звук"
    },
    {
      "value": "41",
      "title": "Мікрофон",
      "manufacturer": "Shure SM 58",
      "quantity": 1,
      "discount": 0,
      "price": 220,
      "category": "Звук"
    },
    {
      "value": "42",
      "title": "Мікрофон",
      "manufacturer": "Shure Beta 58A",
      "quantity": 1,
      "discount": 0,
      "price": 270,
      "category": "Звук"
    },
    {
      "value": "43",
      "title": "Мікрофон",
      "manufacturer": "Shure SM 57",
      "quantity": 1,
      "discount": 0,
      "price": 220,
      "category": "Звук"
    },
    {
      "value": "44",
      "title": "Мікрофон",
      "manufacturer": "Shure SM 81-LC",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Звук"
    },
    {
      "value": "45",
      "title": "Мікрофон",
      "manufacturer": "Shure Beta 52A",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Звук"
    },
    {
      "value": "46",
      "title": "LED Телевізор 55\"",
      "manufacturer": "Samsung UE55DU7100",
      "quantity": 1,
      "discount": 0,
      "price": 1700,
      "category": "Мультимедіа"
    },
    {
      "value": "47",
      "title": "LED Телевізор 65\"",
      "manufacturer": "Hisense 65A6N 65\" 4K UHD",
      "quantity": 1,
      "discount": 0,
      "price": 2300,
      "category": "Мультимедіа"
    },
    {
      "value": "48",
      "title": "Стійка мобільна презентаійна для кріплення ТВ",
      "manufacturer": "iTech T1028TE",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Мультимедіа"
    },
    {
      "value": "49",
      "title": "Ноутбук",
      "manufacturer": "HP EliteBook 665 G11",
      "quantity": 1,
      "discount": 0,
      "price": 700,
      "category": "Мультимедіа"
    },
    {
      "value": "50",
      "title": "Комутатор",
      "manufacturer": "EW–S 1605",
      "quantity": 1,
      "discount": 0,
      "price": 250,
      "category": "Мультимедіа"
    },
    {
      "value": "51",
      "title": "Трансмітер (до 120 метрів)",
      "manufacturer": "TX HDMI to LAN LENKENG LKV373 v2.0",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Мультимедіа"
    },
    {
      "value": "52",
      "title": "Ресівер (до 120 метрів)",
      "manufacturer": "RX HDMI to LAN LENKENG LKV373 v2.0",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Мультимедіа"
    },
    {
      "value": "53",
      "title": "Кабель HDMI - HDMI",
      "manufacturer": "0.3м, 3м, 5м, 10м, 20м",
      "quantity": 1,
      "discount": 0,
      "price": 1,
      "category": "Мультимедіа"
    },
    {
      "value": "54",
      "title": "Кабель FTP Cat6 Shielded Network Cable",
      "manufacturer": "0.3м, 3м, 5м, 10м, 20м",
      "quantity": 1,
      "discount": 0,
      "price": 1,
      "category": "Мультимедіа"
    },
    {
      "value": "55",
      "title": "Рухома голова 3в1 R17",
      "manufacturer": "PowerLight HotBeam BS 360",
      "quantity": 1,
      "discount": 0,
      "price": 1250,
      "category": "Світло"
    },
    {
      "value": "56",
      "title": "Рухома голова 3в1 R10",
      "manufacturer": "ProLux LUX HOTBEAM 280",
      "quantity": 1,
      "discount": 0,
      "price": 1100,
      "category": "Світло"
    },
    {
      "value": "57",
      "title": "Світлодіодна матрична панель",
      "manufacturer": "Pro Lux MATRIX BAR 6 RGBWA",
      "quantity": 1,
      "price": 500,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "58",
      "title": "Світлодіодний LED прожектор",
      "manufacturer": "ProLux LUX LED PAR 1818",
      "quantity": 1,
      "price": 350,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "59",
      "title": "Світлодіодний прожектор",
      "manufacturer": "Free Color COB200 White",
      "quantity": 1,
      "discount": 0,
      "price": 600,
      "category": "Світло"
    },
    {
      "value": "60",
      "title": "Світловий ефект",
      "manufacturer": "Free Color FLASH 2",
      "quantity": 1,
      "discount": 0,
      "price": 450,
      "category": "Світло"
    },
    {
      "value": "61",
      "title": "DMX Спліттер",
      "manufacturer": "Eurolite DMX Split 4 Mini",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Світло"
    },
    {
      "value": "62",
      "title": "Дзеркальна куля 50 см.",
      "manufacturer": "Розмір дзеркал 15х15 см",
      "quantity": 1,
      "price": 1200,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "63",
      "title": "Мотор для дзеркальної кулі",
      "manufacturer": "Stairville MBM40D Mirror",
      "quantity": 1,
      "discount": 0,
      "price": 350,
      "category": "Світло"
    },
    {
      "value": "64",
      "title": "Стійка для світлового обладнання",
      "manufacturer": "GRAVITY LS 431 B",
      "quantity": 1,
      "price": 250,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "65",
      "title": "Стійка для світлового обладнання",
      "manufacturer": "K&M 24630",
      "quantity": 1,
      "price": 250,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "66",
      "title": "Стійка для світлового обладнання",
      "manufacturer": "ATHLETIC NLS 4 Kit",
      "quantity": 1,
      "price": 250,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "67",
      "title": "Стійка для світлового обладнання (4м)",
      "manufacturer": "Athletic LS-8",
      "quantity": 1,
      "price": 700,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "68",
      "title": "Інтерфейс управління освітленням",
      "manufacturer": "SUNLITE SUITE2-FC",
      "quantity": 1,
      "price": 550,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "69",
      "title": "Інтерфейс управління освітленням",
      "manufacturer": "DASLIGHT DVC4 GZM",
      "quantity": 1,
      "price": 550,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "70",
      "title": "Світловий пульт",
      "manufacturer": "ChamSys MagicQ PC Wing Compact",
      "quantity": 1,
      "price": 5000,
      "discount": 0,
      "category": "Світло"
    },
    {
      "value": "71",
      "title": "Ферма алюмінієва Квадролайт 4L",
      "manufacturer": "MTK Truss 2м",
      "quantity": 1,
      "price": 700,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "72",
      "title": "Ферма алюмінієва Квадролайт 4L",
      "manufacturer": "MTK Truss 1.5м",
      "quantity": 1,
      "price": 550,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "73",
      "title": "Ферма алюмінієва Квадролайт 4L",
      "manufacturer": "MTK Truss 1м",
      "quantity": 1,
      "price": 400,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "74",
      "title": "Ферма алюмінієва Квадролайт 4L",
      "manufacturer": "MTK Truss 0.5м",
      "quantity": 1,
      "price": 250,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "75",
      "title": "Ферма алюмінієва Квадролайт 4L",
      "manufacturer": "MTK Truss 0.25м",
      "quantity": 1,
      "price": 200,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "76",
      "title": "Спейсер/адаптер з'єднувач",
      "manufacturer": "MTK Truss 0.10м",
      "quantity": 1,
      "price": 50,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "77",
      "title": "Куб Квадролайт 4L",
      "manufacturer": "MTK Truss 0.25м",
      "quantity": 1,
      "price": 350,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "78",
      "title": "Нижня основа під ферму",
      "manufacturer": "Gravity",
      "quantity": 1,
      "price": 250,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "79",
      "title": "Хрест-основа квадролайт",
      "manufacturer": "MTK Truss Black",
      "quantity": 1,
      "price": 700,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "80",
      "title": "Домкрат гвинтова опора",
      "manufacturer": "",
      "quantity": 1,
      "price": 50,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "81",
      "title": "Замок поворотний",
      "manufacturer": "MTK Truss",
      "quantity": 1,
      "price": 30,
      "discount": 0,
      "category": "Сценічні конструкції"
    },
    {
      "value": "82",
      "title": "Ефект вогняне коло",
      "manufacturer": "",
      "quantity": 1,
      "discount": 0,
      "price": 13500,
      "category": "Ефекти"
    },
    {
      "value": "83",
      "title": "Ефект попелюшки",
      "manufacturer": "",
      "quantity": 1,
      "discount": 0,
      "price": 21000,
      "category": "Ефекти"
    },
    {
      "value": "84",
      "title": "Активна акустична система (монітор)",
      "manufacturer": "DB Technologies DVX DM 12",
      "quantity": 1,
      "discount": 0,
      "price": 1000,
      "category": "Звук"
    }
  ];

  cars: InvoiceItem[] = this.cars_demo;
}
