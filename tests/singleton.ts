// Singleton используется в случае когда нужно иметь максимум один экземпляр определенного объекта в системе.

class Singleton {
  private static instance: Singleton;

  private constructor() {
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2);
