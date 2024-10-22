// это порождающий паттерн проектирования, который позволяет создавать сложные объекты пошагово.
//  * Строитель даёт возможность использовать один и тот же код строительства для получения разных представлений объектов.
//  * Применение: Паттерн Строитель нужен, если объект может существовать в разных вариациях или процесс
//  * инстанцирования состоит из нескольких шагов.


class House {
  private _rooms: number;
  private _windows: number;
  private _swimmingPool: boolean;
  private _trees: boolean;

  constructor(rooms: number, windows: number, swimmingPool: boolean, trees: boolean) {
    this._rooms = rooms;
    this._windows = windows;
    this._swimmingPool = swimmingPool || false;
    this._trees = trees || false;
  }
}

class HouseBuilder {
  private _rooms: number;
  private _windows: number;
  private _swimmingPool: boolean;
  private _trees: boolean;

  constructor(rooms: number, windows: number) {
    this._rooms = rooms;
    this._windows = windows;
  }

  setSwimmingPool(swimmingPool: boolean) {
    this._swimmingPool = swimmingPool;
    return this;
  }

  setTrees(trees: boolean) {
    this._trees = trees;
    return this;
  }

  build() {
    return new House(this._rooms, this._windows, this._swimmingPool, this._trees);
  }

}

const myHouse = new HouseBuilder(6, 1).setSwimmingPool(true).build();
console.log(myHouse);
