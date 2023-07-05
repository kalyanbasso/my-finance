import { Cards } from "./Cards";
import { getTotalCards } from "./service/get/getTotalCards";

export class FactoryCards {
  execute() {
    const cards = new Cards(getTotalCards);
    return cards;
  }
}
